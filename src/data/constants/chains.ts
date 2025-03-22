import type { TChainEcosystem } from '../../types';
import * as EvmChainList from 'viem/chains';
import { iterateObject } from '../../utils';

/** Registry of all supported ecosystems */
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
  mvm: {
    name: 'Move Virtual Machine (MVM)',
    chains: [],
  },
  other: {
    name: 'Other Ecosystem',
    chains: [],
  },
};

/** List of all supported ecosystems */
export const Ecosystems: TChainEcosystem[] = Object.keys(EcosystemRegistry) as any;
