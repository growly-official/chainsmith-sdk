import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const CoinMarketcapTokenList = require('./cmcTokenList.json');
const UniswapTokenList = require('./uniswapTokenList.json');
const SuperchainTokenList = require('./superchainTokenList.json');
const SonicShadowExchangeTokenList = require('./sonic/shadowTokenList.json');

export {
  CoinMarketcapTokenList,
  UniswapTokenList,
  SuperchainTokenList,
  SonicShadowExchangeTokenList,
};
