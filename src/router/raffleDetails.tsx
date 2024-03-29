import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import RaffleEndedScreen from '../pages/RaffleEndedScreen';
import RaffleOngoingScreen from '../pages/RaffleOngoingScreen';
import { useRafflesStore } from '../hooks/useRafflesStore';
import { Raffle } from '../lib/types';
import Footer from '../components/layout/Footer/index';
const RaffleDetails: FC = () => {
  const { id: raffleId } = useParams<{ id: string }>();
  const { raffles, updateRaffleById } = useRafflesStore();
  const [currentRaffle, setCurrentRaffle] = useState<Raffle>();

  const updateCurrentRaffle = useCallback(() => {
    if (updateRaffleById) updateRaffleById(raffleId);
  }, [raffleId, updateRaffleById]);

  useEffect(() => {
    updateCurrentRaffle();
    const timerId = setInterval(updateCurrentRaffle, 5000);
    return () => clearInterval(timerId);
  }, [updateCurrentRaffle]);

  useEffect(() => {
    console.log(raffles);
    console.log(raffles.has(raffleId));
    console.log("Raffle ID:");
    console.log(raffleId);
    if (raffles.has(raffleId)) {
      setCurrentRaffle(raffles.get(raffleId));
    } 

  }, [raffles, raffleId]);

  const isRaffleEnded = useMemo(
    () => currentRaffle && new Date() > currentRaffle.endTimestamp,
    [currentRaffle]
  );
  
  if (!currentRaffle) console.log("Current raffle is null")
  if (!currentRaffle) return null;

  return isRaffleEnded ? (
    <>
    <RaffleEndedScreen
      raffle={currentRaffle}
      updateRaffle={updateCurrentRaffle}
    />
    </>
  ) : (
    <RaffleOngoingScreen
      raffle={currentRaffle}
      updateRaffle={updateCurrentRaffle}
    />
    
    
  );
};

export default RaffleDetails;
