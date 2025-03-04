import { EvmChainList } from '../data/index.ts';
import { IEcosystemRegistry, TChainEcosystem, TChainName } from '../types';

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
