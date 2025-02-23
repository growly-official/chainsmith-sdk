import type { TAddress, TChainId, TChainName } from './chains.d.ts';

export type TTokenAddress = TAddress;
export type TTokenId = number;
export type TTokenSymbol = string;

export type TTokenMetadata = {
  chainId: TChainId;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
};

export type TExtraField<T> = { extra?: T };

export type TTokenTransferActivity = {
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
};

export type TContractTokenMetadata = TTokenMetadata & {
  address: TTokenAddress;
  type: undefined;
};

export type TNativeTokenMetadata = TTokenMetadata & {
  type: 'native';
};
export type TTokenListResponse = {
  name: string;
  timestamp?: string;
  tokens: TContractTokenMetadata[];
};

export type TNativeToken = TNativeTokenMetadata & {
  balance: number;
};

export type TContractToken = TContractTokenMetadata & {
  balance: number;
};

export type TToken<T = any> = (TNativeToken | TContractToken) & TExtraField<T>;

export type TPriceData = {
  usdValue: number;
  marketPrice: number;
  marketRank?: number;
};

export type TMarketToken<T = any> = TToken<T> &
  TPriceData & { tags: string[]; date_added?: string };

export type TTokenMetadataPrice<T = any> = TTokenMetadata &
  TExtraField<T> &
  Pick<TPriceData, 'marketPrice', 'marketRank'> & { tags: string[] };

export type TTokenActivityStats = {
  sumCount: number;
  newCount: number;
};

export type TLongestHoldingToken = {
  chain: TChainName;
  symbol: TTokenSymbol;
  duration: number;
};
