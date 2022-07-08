import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { TransactionInstruction, SystemProgram, PublicKey,  LAMPORTS_PER_SOL } from '@solana/web3.js';

import { DraffleProgram } from '../../providers/ProgramApisProvider';
import { createOwnAssociatedTokenAccountInstruction } from '../accounts';
import { Raffle } from '../types';

const FEE_WALLET = new PublicKey('HJ9nxHZtNd1z6SMizegtiXkpsPtKuqLFij9n4TcfDjYV');
// const FEE_WALLET = new PublicKey('HuQcHg87AxUdY78JaiqUeMSuGeiZqmjuMDBJM76nxoWy');
const ONE_PERCENT_WALLET = new PublicKey('HJ9nxHZtNd1z6SMizegtiXkpsPtKuqLFij9n4TcfDjYV');

export const claimPrize = async (
  draffleClient: DraffleProgram,
  raffle: Raffle,
  prizeIndex: number,
  ticketIndex: number
) => {
  if (prizeIndex >= raffle.prizes.length)
    throw Error(
      `Prize index does not match prize list (${raffle.prizes.length})`
    );
  const prize = raffle.prizes[prizeIndex];

  const ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    prize.mint.publicKey,
    draffleClient.provider.wallet.publicKey
  );

  let instructions: TransactionInstruction[] | undefined;
  

  const info = await draffleClient.provider.connection.getAccountInfo(ata);
  
  if (info === null) {
    alert("popopopo")
    instructions = [
      createOwnAssociatedTokenAccountInstruction(
        prize.mint.publicKey,
        ata,
        draffleClient.provider.wallet.publicKey,
      ),
      // SystemProgram.transfer({
      //   fromPubkey: draffleClient.provider.wallet.publicKey,
      //   toPubkey: ONE_PERCENT_WALLET,
      //   lamports: LAMPORTS_PER_SOL * 0.1,
      // }),
    ];
  }else{
  // instructions = [
  //   SystemProgram.transfer({
  //     fromPubkey: draffleClient.provider.wallet.publicKey,
  //     toPubkey: ONE_PERCENT_WALLET,
  //     lamports: LAMPORTS_PER_SOL * 0.1,
  //   }),
  // ];
  }

  return await draffleClient.rpc.claimPrize(prizeIndex, ticketIndex, {
    accounts: {
      raffle: raffle.publicKey,
      entrants: raffle.entrantsAccountAddress,
      prize: prize.address,
      winnerTokenAccount: ata,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      feeAcc: FEE_WALLET,
      payer: draffleClient.provider.wallet.publicKey,
    },
    instructions,
  });
};
