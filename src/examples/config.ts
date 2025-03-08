import { rpc } from '..';
import {
  AlchemyAdapter,
  AnglesApiAdapter,
  BeetsApiAdapter,
  CoinMarketcapAdapter,
  DexScreenerAdapter,
  EvmscanAdapter,
  MetropolisApiAdapter,
  OriginApiAdapter,
  PaintSwapAdapter,
  ReservoirAdapter,
  ShadowExchangeAdapter,
  ShadowExchangeApiAdapter,
  SiloV2ApiAdapter,
  UniswapSdkAdapter,
} from '../adapters';
import { EvmTokenPlugin } from '../plugins/evm';
import { alchemy } from '../rpc';
import type { TChainName } from '../types';
import { buildEvmChains } from '../utils';

export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';

export const SIMPLE_HASH_API_BASE_URL = process.env.SIMPLE_HASH_API_BASE_URL;
export const SIMPLE_HASH_API_KEY = process.env.SIMPLE_HASH_API_KEY;

export const COINMARKETCAP_API_BASE_URL = 'https://pro-api.coinmarketcap.com';
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';

export const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/v2/api';
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

export const RESERVOIR_API_KEY = process.env.RESERVOIR_API_KEY || '';

export const AdapterRegistry = {
  Alchemy: new AlchemyAdapter(ALCHEMY_API_KEY, new EvmTokenPlugin()),
  CoinMarketcap: new CoinMarketcapAdapter(COINMARKETCAP_API_BASE_URL, COINMARKETCAP_API_KEY),
  Uniswap: new UniswapSdkAdapter(rpc.alchemy(ALCHEMY_API_KEY)),
  Evmscan: new EvmscanAdapter(ETHERSCAN_BASE_URL, ETHERSCAN_API_KEY),
  DexScreener: new DexScreenerAdapter(),
  ShadowExchangeApi: new ShadowExchangeApiAdapter(),
  ShadowExchange: new ShadowExchangeAdapter(new EvmTokenPlugin()),
  PaintSwap: new PaintSwapAdapter(),
  MetropolisApi: new MetropolisApiAdapter(),
  SiloV2Api: new SiloV2ApiAdapter(),
  BeetsApi: new BeetsApiAdapter(),
  OriginApi: new OriginApiAdapter(),
  AnglesApi: new AnglesApiAdapter(),
  Reservoir: new ReservoirAdapter(RESERVOIR_API_KEY),
};

export function buildDefaultChains(chainNames: TChainName[]) {
  return buildEvmChains(chainNames, alchemy(ALCHEMY_API_KEY));
}
