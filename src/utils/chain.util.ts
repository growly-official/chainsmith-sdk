import { EvmChainList } from '../data/chains';
import type { GetChainRpcEndpoint } from '../rpc';
import type {
  TBaseChain,
  TChain,
  TChainEcosystem,
  TChainName,
  TClient,
  TMultichain,
} from '../types';
import { ChainTypeBuilder } from '../wrapper';

export function getChainEcosystem(name: TChainName): TChainEcosystem {
  if ((EvmChainList as any)[name]) return 'evm';
  return 'other';
}

export function getChainByName(name: TChainName): TChain {
  const chain = (EvmChainList as any)[name];
  if (!chain) throw new Error('No chain found');
  const ecosystem = getChainEcosystem(name);
  return new ChainTypeBuilder(chain).withChainName(name).withEcosystem(ecosystem).build();
}

export function getChainIdByName(name: TChainName): number {
  return getChainByName(name).id;
}

export function getClientChain(client: TClient): TBaseChain {
  const chain = client.chain;
  if (!chain) throw new Error('No chain initialized.');
  return chain;
}

export const getChainDefaultRpcUrl = (chain: TBaseChain) => chain.rpcUrls.default.http[0];

export function buildEvmChains(chains: TChainName[], chainRpcUrl: GetChainRpcEndpoint): TChain[] {
  return buildChains(chains, 'evm', chainRpcUrl);
}

export function buildChainsWithCustomRpcUrls(
  chainsWithRpc: TMultichain<string>,
  ecosystem: TChainEcosystem
): TChain[] {
  return Object.keys(chainsWithRpc).map(c => {
    const chainName = c as TChainName;
    const chain = getChainByName(chainName);
    if (!chain) throw new Error('No chain found');

    const builder = new ChainTypeBuilder(chain).withEcosystem(ecosystem);
    builder.withRpcUrl(chainsWithRpc[chainName] || '').build();
    return builder.build();
  });
}

export function buildChains(
  chains: TChainName[],
  ecosystem: TChainEcosystem,
  getRpcUrl?: GetChainRpcEndpoint
): TChain[] {
  return chains.map(c => {
    const chain = getChainByName(c);
    if (!chain) throw new Error('No chain found');
    const builder = new ChainTypeBuilder(chain).withEcosystem(ecosystem);
    if (getRpcUrl && getRpcUrl(chain)) builder.withRpcUrl(getRpcUrl(chain)).build();
    return builder.build();
  });
}
