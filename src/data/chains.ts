import * as _EvmChainList from 'viem/chains';
import type { IEcosystemRegistry, TChainEcosystem, TChainName } from '../types';

export const EcosystemRegistry: IEcosystemRegistry = {
  evm: {
    name: 'Ethereum Virtual Machine (EVM)',
    chains: Object.keys(_EvmChainList) as TChainName[],
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
export const EvmChainList = _EvmChainList;
