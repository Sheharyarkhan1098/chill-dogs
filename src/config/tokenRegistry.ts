export const wrappedSOL = 'So11111111111111111111111111111111111111112';

const tokenRegistry = {
  So11111111111111111111111111111111111111112: {
    chainId: 101,
    address: wrappedSOL,
    symbol: 'SOL',
    name: 'SOL',
    decimals: 9,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: [],
    extensions: {
      website: 'https://solana.com/',
      serumV3Usdc: '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT',
      serumV3Usdt: 'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1',
      coingeckoId: 'solana',
      imageURI: '/resources/solana-logo.gif',
    },
  },
  '29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao': {
    chainId: 101,
    address: '29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao',
    symbol: '$A',
    name: 'A TOKEN',
    decimals: 9,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  '72UgZ7avdJZBbv3wR7hbWcFy6dyHHNAoJw7CimGA55Zh': {
    chainId: 101,
    address: '72UgZ7avdJZBbv3wR7hbWcFy6dyHHNAoJw7CimGA55Zh',
    symbol: '$PM1',
    name: 'USDT',
    decimals: 2,
    logoURI: `${process.env.REACT_APP_URL}/tether-usdt-logo.png`,
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  H32RbcbAoskfMVyPSTNQucEkYP2qvYLkmDg5ij4cPBhH: {
    chainId: 101,
    address: 'H32RbcbAoskfMVyPSTNQucEkYP2qvYLkmDg5ij4cPBhH',
    symbol: 'PM2',
    name: 'Prize Mint 2',
    decimals: 0,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  DCTo8EdRrycGpjRDntmdAMoaHdq77mQwdEchtoXAtje3: {
    chainId: 101,
    address: 'DCTo8EdRrycGpjRDntmdAMoaHdq77mQwdEchtoXAtje3',
    symbol: 'DCT',
    name: 'dRaffle Community Token',
    decimals: 6,
    logoURI: '/dRaffle-logo.png',
    tags: [],
  },
  'TYPSYLNf84cqtv4uCHtMBnXkYWPCMdhE9BAgCvLEu5m': {
    chainId: 101,
    address: 'TYPSYLNf84cqtv4uCHtMBnXkYWPCMdhE9BAgCvLEu5m',
    symbol: 'TIPSY',
    name: 'TIPSY',
    decimals: 9,
    logoURI: '/resources/chill_logo.png',
    tags: [],
  },
  'LUVumGBdVkaPYbGyjjRJtsbYoVtZ1h7AaX1Hh2bcaqn': {
    chainId: 101,
    address: 'LUVumGBdVkaPYbGyjjRJtsbYoVtZ1h7AaX1Hh2bcaqn',
    symbol: '$LUV',
    name: 'LUV',
    decimals: 10,
    logoURI: '/resources/luv.png',
    tags: [],
  },
  '6UZsQ5sCGCSJyxHbYrEjZTWvXmYsWEcKbd77AKi3oxxi': {
    chainId: 101,
    address: '6UZsQ5sCGCSJyxHbYrEjZTWvXmYsWEcKbd77AKi3oxxi',
    symbol: '$TRUST',
    name: 'TRUST',
    decimals: 9,
    logoURI: '/resources/trust.png',
    tags: [],
  },
  '3pCLx1uK3PVFGQ3siyxurvXXSLijth2prgBEK4cS33XF': {
    chainId: 101,
    address: '3pCLx1uK3PVFGQ3siyxurvXXSLijth2prgBEK4cS33XF',
    symbol: 'SK',
    name: 'SK-token',
    decimals: 9,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ENNuzbdv7MiT9fjg7ApC2Fyf2F67PWww5Trm6A7W1BSn/logo.png',
    tags: [],
  },
};

export const tokenInfoMap = new Map(Object.entries(tokenRegistry));

export const UNKNOWN_TOKEN_INFO = {
  chainId: 101,
  symbol: '???',
  name: 'Unkown token',
  decimals: 0,
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
  tags: [],
  extensions: {},
};
