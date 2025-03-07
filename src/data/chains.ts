import type { IEcosystemRegistry, TChainEcosystem, TChainName } from '../types'
import { EvmChainList } from '../data'

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
}

export const Ecosystems: TChainEcosystem[] = Object.keys(EcosystemRegistry) as any
