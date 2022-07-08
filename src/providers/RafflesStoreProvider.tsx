import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ProgramAccount } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';

import {
  DraffleProgram,
  EntrantsDataRaw,
  RaffleDataRaw,
} from './ProgramApisProvider';
import { useProgramApis } from '../hooks/useProgramApis';
import { Entrant, Raffle, RaffleMetaData } from '../lib/types';
import {
  fetchPrizes,
  fetchProceedsAccount,
  getRaffleProgramAccounts,
  toEntrantsProcessed,
} from '../lib/store';
import { cloneDeep } from 'lodash';
import { areEqualObjects } from '../lib/utils';
import { useConnection } from '@solana/wallet-adapter-react';
// import { RAFFLES_WHITELIST } from '../config/raffleWhitelist';
import axios from 'axios';

export interface RafflesStore {
  raffles: Map<string, Raffle>;
  fetchAllRaffles: (showAll?: boolean) => void;
  updateRaffleById: (raffleId: string) => void;
  fetching: boolean;
}

// @ts-ignore
export const RafflesStoreContext = createContext<RafflesStore>();

const RafflesStoreProvider: FC = ({ children = null as any }) => {
  const { connection } = useConnection();
  const { draffleClient } = useProgramApis();

  const [fetching, setFetching] = useState<boolean>(true); // prevents messy first render, but probably not optimal
  const [raffles, setRaffles] = useState<Map<string, Raffle>>(
    new Map<string, Raffle>()
  );
  const [myRaffles, setMyRaffles] = useState<any>();
  const [whiteRaffles, setWhiteRaffles] = useState<Map<string, RaffleMetaData>>();

  // const base_url = "http://localhost:8000";
  // const base_url = "http://138.197.73.202:8000";
  const base_url = "https://raffles.chilldogsclub.com";
  // const base_url = "https://house.mellowmen.io";
  // const base_url = "https://defi-games.io/";


  useEffect(() => {
    const getRaffles = async () =>  {
      const data = await axios.get(`${base_url}/get-Raffles`);
      console.log(data.data);
      setMyRaffles(data.data);
    }
    getRaffles();

  },[])
  function addWR() {
    console.log(myRaffles, "opopop")
    const newRaffles = new Map<string, RaffleMetaData>(myRaffles);
    console.log(newRaffles, "asdasd")
    setWhiteRaffles(newRaffles)
  }
  useEffect(() => {
    addWR();
  },[myRaffles])

  const getAssociatedRaffleData = async (
    raffleRaw: ProgramAccount<RaffleDataRaw>,
    raffleMetaData: RaffleMetaData,
    draffleClient: DraffleProgram,
    connection: Connection,
    entrantsDataRaw?: EntrantsDataRaw
  ): Promise<Raffle> => {
    const proceedsAccount = await fetchProceedsAccount(
      raffleRaw.publicKey,
      draffleClient,
      connection
    );
    let entrants = new Map<string, Entrant>();
    if (!entrantsDataRaw) {
      try {
        entrantsDataRaw = await draffleClient.account.entrants.fetch(
          raffleRaw.account.entrants
        );
      } catch {
        // TODO: Merge ended raffle data stored off-chain here
        console.log(`Raffle ${raffleRaw.publicKey} entrants account is closed`);

        entrantsDataRaw = {
          entrants: [],
          max: 0,
          total: 0,
        };
      }
    }

    entrants = toEntrantsProcessed(entrantsDataRaw);

    const prizes = await fetchPrizes(
      raffleRaw.publicKey,
      draffleClient,
      raffleRaw.account.totalPrizes
    );

    const endTimestamp = new Date(
      raffleRaw.account.endTimestamp.toNumber() * 1000
    );

    return {
      publicKey: raffleRaw.publicKey,
      metadata: raffleMetaData,
      endTimestamp,
      entrantsCap: entrantsDataRaw.max,
      entrants,
      entrantsRaw: entrantsDataRaw.entrants,
      totalTickets: entrantsDataRaw.total,
      entrantsAccountAddress: raffleRaw.account.entrants,
      randomness: raffleRaw.account.randomness as number[],
      prizes,
      proceeds: {
        address: proceedsAccount.address,
        ticketPrice: raffleRaw.account.ticketPrice,
        mint: proceedsAccount.mintInfo,
      },
      isEnded: endTimestamp < new Date(),
    };
  };

  const fetchAllRaffles = useCallback(
    async (showAll: boolean = false) => {
      const data = await axios.get(`${base_url}/get-Raffles`);
      const myR = new Map<string, RaffleMetaData>(data.data);
      // LOOK HERE
      setFetching(true);
      let raffleDataRawProgramAccounts: ProgramAccount<RaffleDataRaw>[] = [];
      let entrantsDataRawProgramAccounts: ProgramAccount<EntrantsDataRaw>[] =
        [];
      try {
        [raffleDataRawProgramAccounts, entrantsDataRawProgramAccounts] =
          await getRaffleProgramAccounts(draffleClient);
      } catch (e) {
        console.log(e);
      }

      raffleDataRawProgramAccounts = raffleDataRawProgramAccounts.filter(
        ({ publicKey }) => {
          console.log({ showAll }, "showAll");
          console.log(myR?.has(publicKey.toBase58()), "jyst ba58");
          return myR?.has(publicKey.toBase58());
        }
      );
      console.log({ raffleDataRawProgramAccounts }, "rawwData");

      const newRaffles = (
        await Promise.all(
          raffleDataRawProgramAccounts.map(async (raffleRaw) =>
            getAssociatedRaffleData(
              raffleRaw,
              myR?.get(raffleRaw.publicKey.toString()) || {
                name: 'Unnamed Raffle', // LOOOK HERE
                alternatePurchaseMints: [],
              },
              draffleClient,
              connection,
              entrantsDataRawProgramAccounts.find(({ publicKey }) =>
                publicKey.equals(raffleRaw.account.entrants)
              )?.account
            )
          )
        )
      ).reduce<Map<string, Raffle>>((acc, raffle) => {
        acc.set(raffle.publicKey.toString(), raffle);
        return acc;
      }, new Map<string, Raffle>());
      setRaffles(newRaffles);
      setFetching(false);
    },
    [connection, draffleClient]
  );

  const updateRaffleById = useCallback(
    
    async (raffleId: string) => {
      const data = await axios.get(`${base_url}/get-Raffles`);
      const myR = new Map<string, RaffleMetaData>(data.data);
      if (!raffles.has(raffleId.toString()) || !myR?.has(raffleId))
        return;
      setFetching(true);
      const updatedRaffleRaw = await draffleClient.account.raffle.fetch(
        new PublicKey(raffleId)
      );
      const updatedRaffle = await getAssociatedRaffleData(
        { publicKey: new PublicKey(raffleId), account: updatedRaffleRaw },
        myR?.get(raffleId)!,
        draffleClient,
        connection
      );
      if (!areEqualObjects(raffles.get(raffleId.toString()), updatedRaffle)) {
        setRaffles((currentRaffles) => {
          let newRaffles = cloneDeep(currentRaffles);
          newRaffles = newRaffles.set(raffleId, updatedRaffle);
          return newRaffles;
        });
      }
      setFetching(false);
    },
    [connection, draffleClient, raffles, setRaffles]
  );

  useEffect(() => {
    fetchAllRaffles();
  }, [fetchAllRaffles]);

  return (
    <RafflesStoreContext.Provider
      value={{
        raffles,
        fetchAllRaffles,
        updateRaffleById,
        fetching,
      }}
    >
      {children}
    </RafflesStoreContext.Provider>
  );
};

export default RafflesStoreProvider;
