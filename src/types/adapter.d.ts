import { Logger } from 'tslog';
import type { TAddress, TChainName, TMarketToken, TContractToken } from './index.d.ts';

export type WithAdapter<A, R> = (adapter: A) => R;
export type WithManyAdapters<A extends IAdapter[], R> = (adapters: A) => R;
export interface IAdapter {
  name: string;
  logger?: Logger;
}

export type SingleAdapterPlugin<T> = IAdapter & T;

export interface IMarketDataAdapter extends IAdapter {
  fetchTokenWithPrice(chain: TChainName, token: TToken): Promise<TMarketToken | undefined>;

  fetchTokensWithPrice(
    chain: TChainName,
    tokens: TToken[]
  ): Promise<{ tokens: TMarketToken[]; totalUsdValue: number }>;
}

export interface IOnchainActivityAdapter extends IAdapter {
  listAllTokenActivities(chain: TChainName, address: TAddress, limit: number);
}

export interface IOnchainTokenAdapter extends IAdapter {
  listAllOwnedTokens(chain: TChainName, address: TAddress): Promise<TContractToken[]>;
}

export type ISmartWalletAdapter = IAdapter;
