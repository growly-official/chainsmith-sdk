import 'reflect-metadata';
import { EvmChainList } from './data/index.ts';
import type { IEcosystemRegistry, TChainEcosystem, TChainName } from './types/index.d.ts';
// Exports.
export * as adapters from './adapters/index.ts';
export * as plugins from './plugins/index.ts';
export { default as ChainsmithSdk } from './sdk.ts';
export * as rpc from './rpc/index.ts';
export * as wrapper from './wrapper.ts';

export const EcosystemRegistry: IEcosystemRegistry = {
  evm: {
    name: 'Ethereum Virtual Machine (EVM)',
    chains: Object.keys(EvmChainList) as TChainName[],
  },
  svm: {
    name: 'Solana Virtual Machine (SVM)',
    chains: [],
  },
  other: {
    name: 'Other Ecosystem',
    chains: [],
  },
};

export const Ecosystems: TChainEcosystem[] = Object.keys(EcosystemRegistry) as any;
