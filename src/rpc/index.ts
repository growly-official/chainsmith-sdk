import { getChainDefultRpcUrl } from '../utils/chain.util.ts';
import { EvmChainList } from '../data/index.ts';
import type { TBaseChain } from '../types/index.d.ts';

const ALCHEMY_CHAIN_ENDPOINT = {
  [EvmChainList.mainnet.id]: alchemyRpcUrl('eth-mainnet'),
  [EvmChainList.base.id]: alchemyRpcUrl('base-mainnet'),
  [EvmChainList.polygon.id]: alchemyRpcUrl('polygon-mainnet'),
  [EvmChainList.optimism.id]: alchemyRpcUrl('opt-mainnet'),
  [EvmChainList.baseSepolia.id]: alchemyRpcUrl('base-sepolia'),
  [EvmChainList.arbitrum.id]: alchemyRpcUrl('arb-mainnet'),
  [EvmChainList.sonic.id]: alchemyRpcUrl('sonic-mainnet'),
  [EvmChainList.gnosis.id]: alchemyRpcUrl('gnosis-mainnet'),
};

export type GetChainRpcEndpoint = (chain: TBaseChain) => string;

export const alchemy: (apiKey: string) => GetChainRpcEndpoint = (apiKey: string) => chain => {
  const endpoint = (ALCHEMY_CHAIN_ENDPOINT as any)[chain.id];
  if (!endpoint) return getChainDefultRpcUrl(chain) || '';
  return `${endpoint}/v2/${apiKey}`;
};

function alchemyRpcUrl(chainId: string) {
  return `https://${chainId}.g.alchemy.com`;
}
