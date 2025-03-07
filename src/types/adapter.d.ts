import type { Logger } from 'tslog'
import type {
  TAddress,
  TChain,
  TChainName,
  TContractToken,
  TMarketToken,
  TNftBalance,
  TNftTransferActivity,
  TToken,
  TTokenTransferActivity,
} from '.'

export type WithAdapter<A extends IAdapter, R> = (adapter: A) => R
export type WithManyAdapters<A extends IAdapter[], R> = (adapters: A) => R
export interface IAdapter {
  name: string
  logger?: Logger<any>
}

export type SingleAdapterPlugin<T> = IAdapter & T

export interface IMarketDataAdapter extends IAdapter {
  fetchTokenWithPrice: (chain: TChainName, token: TToken) => Promise<TMarketToken | undefined>

  fetchTokensWithPrice: (
    chain: TChainName,
    tokens: TToken[]
  ) => Promise<{ tokens: TMarketToken[], totalUsdValue: number }>
}

export interface IYieldAdapter extends IAdapter {
  fetchTokensWithYield: (chain: TChainName, tokens: TToken[]) => any
}

export interface IOnchainActivityAdapter extends IAdapter {
  listAllTokenActivities: (
    chain: TChainName,
    address: TAddress,
    limit: number
  ) => Promise<TTokenTransferActivity[]>

  listAllNftActivities: (
    chain: TChainName,
    address: TAddress,
    limit: number
  ) => Promise<TNftTransferActivity[]>

  // TODO: Add raw transaction txList
}

export interface IOnchainNftAdapter extends IAdapter {
  fetchNFTBalance: (chain: TChainName, address: TAddress) => Promise<TNftBalance[]>
}

export interface IOnchainTokenAdapter extends IAdapter {
  listAllOwnedTokens: (chain: TChain, address: TAddress) => Promise<TContractToken[]>
}

export type ISmartWalletAdapter = IAdapter
