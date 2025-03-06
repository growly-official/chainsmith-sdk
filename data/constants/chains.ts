import * as EvmChainList from 'viem/chains';
import type { TChainEcosystem } from '../../types/index.js';
import { iterateObject } from '../../utils/index.js';

export const EcosystemRegistry: Record<
  TChainEcosystem,
  {
    name: string;
    chains: EvmChainList.Chain[];
  }
> = {
  evm: {
    name: 'Ethereum Virtual Machine (EVM)',
    chains: iterateObject(EvmChainList, (_, chain) => chain) as any,
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
