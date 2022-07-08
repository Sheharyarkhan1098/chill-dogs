
import { PublicKey } from '@solana/web3.js';
import { RaffleMetaData } from '../lib/types';
import { TESTING } from './misc';
import axios from "axios";

// const base_url = "http://localhost:8000";
  // const base_url = "http://138.197.73.202:8000";
  const base_url = "https://raffles.chilldogsclub.com";
  // const base_url = "https://house.mellowmen.io";
  // const base_url = "https://defi-games.io/";


  async function getRaffles() {
    const data = await axios.get(`${base_url}/get-Raffles`);
    console.log(data.data);

    return data.data;
  }
  



const testWhitelist = new Map<string, RaffleMetaData>([
  // ['CU7ZkyUfKnxYjUY1Lo71sez2D1AJLqGoTbWtuUAst1qq', { name: 'Simple Raffle' }],
  // ['Aq5cZhbR28TYqt9SVAopGQVq5Q64BLmZE3kURxCHuv3U', { name: 'Second Raffle' }],
  // ['C8MksYdZq3jasJoLkuZN6frT9TuZ2STzCkCCDqnrmKhv', { name: 'Third Raffle' }],
  // ['3kTRXdm2xKejFkNfKxw88GV2cGZaASfkjysJ48fwNsYJ', { name: 'SOL Raffle' }],
  // ['HhppMJ3x9cdNnXPZKJTR8zCzWEmNx5RGLRgx94nt8AKQ', { name: 'SOL Raffle 2' }],
  // ['5Po1nyZ9UAQzjS2KdV8b6Lwk3y9hwxrL1po2dvfn6dr9', { name: 'MEME Raffle' }],
  // [
  //   '9FoUjfUpWwhHYaGKM9G5eYab7qow3oWqdo2G5Ehj3h5L',
  //   {
  //     name: 'Oh my dRaffle',
  //     overviewImageUri: '/resources/001-mainnet-launch.gif',
  //     alternatePurchaseMints: [
  //       new PublicKey('So11111111111111111111111111111111111111112'),
  //     ],
  //   },
  // ],
]);

// const prodWhitelist = new Map<string, RaffleMetaData>(getRaffles())
const prodWhitelist = new Map<string, RaffleMetaData>([
  // [
  //   '5iKKXb2VF1cx2Sn3C5NZfFRLReU3dKDXEHmBUAjv8w9v',
  //   {
  //     name: 'api raffle',
  //     // overviewImageUri: '/resources/quack.png',
  //   },
  // ],
  // [
  //   '88U3fKxy1HN3pXqzHjNwqkqP52gwgcRB9douDWDPfcRB',
  //   {
  //     name: 'ended Raffle',
  //     // overviewImageUri: '/resources/stoned.png',
  //   },
  // ],
  // [
  //   'Csm2H9E3vGzkXxPeMWQUTPe3TsHm546upWxhxdCUQnZ',
  //   {
  //     name: 'Raffle for Anwaar',
  //     // overviewImageUri: '/resources/stoned.png',
  //   },
  // ],
  // [
  //   'CVHzEXM8EVsHhijgQ61kjm5vAAYJo61r8vuEiCe5qbxT',
  //   {
  //     name: 'spl-token raffle',
  //     // overviewImageUri: '/resources/stoned.png',
  //   },
  // ],
  // [
  //   'D9q2C98jD8KnUoaxZsjp9SsgUm54huhezsrqRQjbXTcP',
  //   {
  //     name: 'multi-spl-token',
  //     // overviewImageUri: '/resources/stoned.png',
  //   },
  // ],
  // [
  //   'DJRGTisSXS4GNySdJL9nyTWwCqHArCNYaJmq1ZS6AemE',
  //   {
  //     name: 'mutli-winner',
  //     // overviewImageUri: '/resources/stoned.png',
  //   },
  // ],
  // [
  //   '3K6rkL5YCj9eLVk4eWZuySNn4vwc4y9USKuU4BUQkNbS',
  //   {
  //     name: 'Test Raffle 1june',
  //     // overviewImageUri: '/resources/stoned.png',
  //   },
  // ],
]);

export const RAFFLES_WHITELIST = TESTING ? testWhitelist : prodWhitelist;
