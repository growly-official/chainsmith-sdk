import _ from 'lodash';
import { POPULAR_MEMES } from '../data/constants/tokens';
import type {
  TChainAggregationBalance,
  TChainName,
  TMarketTokenList,
  TMultichain,
  TTokenAggregationBalance,
  TTokenChainData,
  TTokenPortfolio,
  TTokenPortfolioStats,
} from '../types';
import { getChainIdByName } from './chain.util';

export function aggregateMultichainTokenBalance(
  multichainTokenList: TMultichain<TMarketTokenList>
): TTokenPortfolio {
  let totalPortfolioValue = 0;

  const tokenAggregation: TTokenAggregationBalance = {};
  const chainAggregation: TChainAggregationBalance = {};

  for (const chainName in multichainTokenList) {
    chainAggregation[chainName as TChainName] = {
      chainId: getChainIdByName(chainName as TChainName),
      totalUsdValue: multichainTokenList[chainName as TChainName]!.totalUsdValue,
    };
  }

  // Iterate through each chain in the multiChainData
  for (const chainName in multichainTokenList) {
    const chainData = multichainTokenList[chainName as TChainName];
    if (!chainData) continue;

    // Iterate through each token in the chain
    for (const token of chainData.tokens) {
      const symbol = token.symbol;

      // Drop fields to avoid confusion
      const tokenMarketData = _.omit(token, ['balance', 'usdValue']);

      // Initialize the token in the aggregation if it doesn't exist
      if (!tokenAggregation[symbol]) {
        tokenAggregation[symbol] = {
          totalUsdValue: 0,
          totalBalance: 0,
          marketData: tokenMarketData,
          allocations: {},
        };
      }

      // Update the total USD & balance value for the token
      tokenAggregation[symbol].totalUsdValue += token.usdValue;
      tokenAggregation[symbol].totalBalance += token.balance;

      // Update the allocation for the current chain
      tokenAggregation[symbol].allocations[chainName as TChainName] = {
        chainId: getChainIdByName(chainName as TChainName),
        balance: token.balance,
        totalUsdValue: token.usdValue,
      };

      // Global: Update totalPortfolioValue
      totalPortfolioValue += token.usdValue;
    }
  }

  return {
    totalUsdValue: totalPortfolioValue,
    aggregatedBalanceByToken: tokenAggregation,
    aggregatedBalanceByChain: chainAggregation,
    chainRecordsWithTokens: multichainTokenList,
  } as TTokenPortfolio;
}

export function calculateMultichainTokenPortfolio(
  multichainTokenPortfolio: TTokenPortfolio
): TTokenPortfolioStats {
  let sumMemeUSDValue = 0;
  let mostValuableToken: TTokenChainData | undefined;
  Object.entries(multichainTokenPortfolio.aggregatedBalanceByToken).forEach(
    ([tokenSymbol, tokenDetail]) => {
      const { marketData, totalUsdValue } = tokenDetail;
      if (!mostValuableToken || tokenDetail.totalUsdValue > mostValuableToken?.totalUsdValue)
        mostValuableToken = tokenDetail;
      if (marketData.tags.includes('memes') || POPULAR_MEMES.includes(tokenSymbol))
        sumMemeUSDValue += totalUsdValue;
    }
  );

  return {
    sumPortfolioUSDValue: multichainTokenPortfolio.totalUsdValue,
    sumMemeUSDValue,
    mostValuableToken: mostValuableToken as any,
    ...multichainTokenPortfolio,
  };
}
