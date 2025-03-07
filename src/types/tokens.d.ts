import type { TAddress, TChainId, TChainName } from './chains';

export type TTokenAddress = TAddress;
export type TTokenId = number;
export type TTokenSymbol = string;

export interface TTokenMetadata {
  chainId: TChainId;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

export interface TExtraField<T> {
  extra?: T;
}

export interface TTokenTransferActivity {
  chainId: number;
  symbol: TTokenSymbol;
  from: TAddress;
  to: TAddress;
  value: string | number;
  timestamp: string;
  blockNumber: string;
  blockHash: string;
  timeStamp: string;
  gas: string;
  gasPrice: string;
  gasPriceBid?: string;
  cumulativeGasUsed: string;
  gasUsed: string;
}

export type TContractTokenMetadata = TTokenMetadata & {
  address: TTokenAddress;
  type: undefined;
};

export type TNativeTokenMetadata = TTokenMetadata & {
  type: 'native';
};
export interface TTokenListResponse {
  name: string;
  timestamp?: string;
  tokens: TContractTokenMetadata[];
}

export type TNativeToken = TNativeTokenMetadata & {
  balance: number;
};

export type TContractToken = TContractTokenMetadata & {
  balance: number;
};

export type TToken<T = any> = (TNativeToken | TContractToken) & TExtraField<T>;

export interface TPriceData {
  usdValue: number;
  marketPrice: number;
  marketRank?: number;
}

export type TMarketToken<T = any> = TToken<T> &
  TPriceData & { tags: string[]; date_added?: string };

export type TTokenMetadataPrice<T = any> = TTokenMetadata &
  TExtraField<T> &
  Pick<TPriceData, 'marketPrice' | 'marketRank'> & { tags: string[] };

export interface TTokenActivityStats {
  sumCount: number;
  newCount: number;
}

export interface TLongestHoldingToken {
  chain: TChainName;
  symbol: TTokenSymbol;
  duration: number;
}
