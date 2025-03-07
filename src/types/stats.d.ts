import type { TMultichain } from './chains';
import type { TMarketToken, TTokenMetadataPrice, TTokenSymbol } from './tokens';

export interface TChainStats {
  totalChains: string[];
  noActivityChains: string[];
  mostActiveChainName: string;
  countUniqueDaysActiveChain: number;
  countActiveChainTxs: number;
}

export interface TActivityStats {
  totalTxs: number;
  firstActiveDay: Date | null;
  uniqueActiveDays: number;
  longestStreakDays: number;
  currentStreakDays: number;
  activityPeriod: number;
}

export interface TMarketTokenList {
  totalUsdValue: number;
  tokens: TMarketToken[];
}

export interface TTokenChainData {
  totalUsdValue: number;
  totalBalance: number;
  marketData: TTokenMetadataPrice;
  allocations: TMultichain<TTokenValueByChain>;
}

export interface TValueByChain {
  chainId: number;
  totalUsdValue: number;
}

export type TTokenValueByChain = TValueByChain & {
  balance: number;
};

export type TTokenAggregationBalance = Record<TTokenSymbol, TTokenChainData>;

export type TChainAggregationBalance = TMultichain<TValueByChain>;

export interface TTokenPortfolio {
  totalUsdValue: number;
  chainRecordsWithTokens: TMultichain<TMarketTokenList>;
  aggregatedBalanceByToken: TTokenAggregationBalance;
  aggregatedBalanceByChain: TChainAggregationBalance;
}

export type TTokenPortfolioStats = TTokenPortfolio & {
  sumPortfolioUSDValue: number;
  sumMemeUSDValue: number;
  mostValuableToken: TTokenChainData;
};

export type TNumberInPercentage = number;

export type TNumberInMillisecond = number;
