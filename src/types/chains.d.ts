import type { Address as EvmAddress, BlockNumber as EvmBlockNumber } from 'viem'
import type * as EvmChainList from 'viem/chains'

export type TAddress = EvmAddress | THexString
export type TBaseChain = TBaseChainType & Partial<TChainMetadata>
export type TBaseChainType = EvmChainList.Chain
export type TBlockNumber = EvmBlockNumber | bigint
export type TChain = TBaseChainType & TChainMetadata
export type TChainEcosystem = 'evm' | 'svm' | 'other'
export type TChainId = number
export interface TChainMetadata {
  chainName: TChainName
  ecosystem: TChainEcosystem
}
export type TChainName = keyof typeof EvmChainList
export interface TChainMetadataListResponse {
  icon: string
  logoUrl?: string
  name: string
  chain: string
  rpc: string[]
  faucets: string[]
  infoURL: string
  shortName: string
  chainId: TChainId
  networkId: number
}
export type IEcosystemChainRegistry = TMultiEcosystem<{ chains: TChainName[] }>
export type IEcosystemRegistry = TMultiEcosystem<{
  name: string
  chains: TChainName[]
}>
export type THexString = `0x${string}`
export type TMultichain<T> = Partial<Record<TChainName, T>>
export type TMultiEcosystem<T> = Partial<Record<TChainEcosystem, T>>
export interface TPortfolio {
  address: TAddress
  chainList: TChain[]
}
