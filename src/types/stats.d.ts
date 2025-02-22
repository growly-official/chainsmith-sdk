import type { TMultichain } from './chains.d.ts';
import type { TMarketToken, TTokenSymbol, TTokenMetadataPrice } from './tokens.d.ts';

export type TChainStats = {
  totalChains: string[];
  noActivityChains: string[];
  mostActiveChainName: string;
  countUniqueDaysActiveChain: number;
  countActiveChainTxs: number;
};

export type TActivityStats = {
  totalTxs: number;
  firstActiveDay: Date | null;
  uniqueActiveDays: number;
  longestStreakDays: number;
  currentStreakDays: number;
  activityPeriod: number;
};

export type TMarketTokenList = {
  totalUsdValue: number;
  tokens: TMarketToken[];
};

export type TTokenChainData = {
  totalUsdValue: number;
  totalBalance: number;
  marketData: TTokenMetadataPrice;
  allocations: TMultichain<TTokenValueByChain>;
};

export type TValueByChain = {
  chainId: number;
  totalUsdValue: number;
};

export type TTokenValueByChain = TValueByChain & {
  balance: number;
};

export type TTokenAggregationBalance = Record<TTokenSymbol, TTokenChainData>;

export type TChainAggregationBalance = TMultichain<TValueByChain>;

export type TTokenPortfolio = {
  totalUsdValue: number;
  chainRecordsWithTokens: TMultichain<TMarketTokenList>;
  aggregatedBalanceByToken: TTokenAggregationBalance;
  aggregatedBalanceByChain: TChainAggregationBalance;
};

export type TTokenPortfolioStats = TTokenPortfolio & {
  sumPortfolioUSDValue: number;
  sumMemeUSDValue: number;
  mostValuableToken: TTokenChainData;
};

export type TNumberInPercentage = number;

export type TNumberInMillisecond = number;
