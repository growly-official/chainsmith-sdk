import { EvmChainList } from '../data/chains';
import type { TBaseChain } from '../types';
import { getChainDefaultRpcUrl } from '../utils/chain.util';

const ALCHEMY_CHAIN_ENDPOINT = {
  [EvmChainList.mainnet.id]: alchemyRpcUrl('eth-mainnet'),
  [EvmChainList.base.id]: alchemyRpcUrl('base-mainnet'),
  [EvmChainList.polygon.id]: alchemyRpcUrl('polygon-mainnet'),
  [EvmChainList.optimism.id]: alchemyRpcUrl('opt-mainnet'),
  [EvmChainList.baseSepolia.id]: alchemyRpcUrl('base-sepolia'),
  [EvmChainList.arbitrum.id]: alchemyRpcUrl('arb-mainnet'),
  [EvmChainList.sonic.id]: alchemyRpcUrl('sonic-mainnet'),
  [EvmChainList.gnosis.id]: alchemyRpcUrl('gnosis-mainnet'),
  [EvmChainList.berachain.id]: alchemyRpcUrl('berachain-mainnet'),
  [EvmChainList.zksync.id]: alchemyRpcUrl('zksync-mainnet'),
  [EvmChainList.abstract.id]: alchemyRpcUrl('abstract-mainnet'),
  [EvmChainList.avalanche.id]: alchemyRpcUrl('avax-mainnet'),
};

export type GetChainRpcEndpoint = (chain: TBaseChain) => string;

export const alchemy: (apiKey: string) => GetChainRpcEndpoint = (apiKey: string) => chain => {
  const endpoint = (ALCHEMY_CHAIN_ENDPOINT as any)[chain.id];
  if (!endpoint) return getChainDefaultRpcUrl(chain) || '';
  return `${endpoint}/v2/${apiKey}`;
};

export function alchemyRpcUrl(chainId: string) {
  return `https://${chainId}.g.alchemy.com`;
}
