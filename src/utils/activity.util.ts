import type { TAddress, TChainName } from '../types/chains.d.ts';
import type {
  TLongestHoldingToken,
  TMarketToken,
  TTokenActivityStats,
  TTokenTransferActivity,
} from '../types/tokens.d.ts';

type Holding = {
  amount: number;
  timestamp: number;
};

export const calculateTokenActivityStats = (
  tokenActivities: TTokenTransferActivity[],
  marketData: TMarketToken[]
) => {
  const sumCount = tokenActivities.length;

  // Recent token = date_added on CMC less than recent 12 months
  const recentTokenActivities = tokenActivities.filter(act => {
    const token = marketData.find(data => data.symbol === act.symbol);
    if (token) {
      const dateAdded = new Date(token.date_added);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 12);
      return dateAdded > threeMonthsAgo;
    }
    return false;
  });

  const newCount = recentTokenActivities.length;

  return { sumCount, newCount } as TTokenActivityStats;
};

/**
 * Function to find the asset with the longest holding duration.
 * @param chain - The blockchain network (e.g., Ethereum, Binance Smart Chain).
 * @param transactions - Array of buy/sell transactions.
 * @param address - The address of the user.
 * @returns The asset with the longest holding duration and the duration in milliseconds.
 */
export const findLongestHoldingToken = (
  chain: TChainName,
  transactions: TTokenTransferActivity[],
  address: TAddress
): TLongestHoldingToken => {
  const holdings: Record<string, Holding[]> = {}; // Updated to include chain
  let longestDuration = 0;
  let longestAsset = '';

  // Sort timestamp asc
  const sortedTransactions = transactions.sort((a, b) =>
    Number.parseInt(a.timestamp) > Number.parseInt(b.timestamp) ? 1 : -1
  );

  // If it's a buy transaction, add to holdings
  for (const { symbol, from, to, value, timestamp } of sortedTransactions) {
    if (to.toLowerCase() === address.toLowerCase()) {
      if (!holdings[symbol]) {
        holdings[symbol] = [];
      }

      holdings[symbol].push({
        amount: Number.parseInt((value || '0') as any),
        timestamp: Number.parseInt(timestamp),
      });
    }

    // If it's a sell transaction, calculate holding duration
    if (from.toLowerCase() === address.toLowerCase()) {
      let remainingSellAmount = Number.parseInt((value || '0') as any);

      // Process each holding for this asset
      while (remainingSellAmount > 0 && holdings[symbol] && holdings[symbol].length > 0) {
        const holding = holdings[symbol][0]; // Get the earliest buy
        const holdingDuration = Number.parseInt(timestamp) - holding.timestamp; // Holding duration

        // If selling the full amount of this holding
        if (remainingSellAmount >= holding.amount) {
          remainingSellAmount -= holding.amount;
          holdings[symbol].shift(); // Remove this holding since it's fully sold
        } else {
          // If partially selling this holding
          holding.amount -= remainingSellAmount;
          remainingSellAmount = 0; // All sold
        }

        // Check if this holding has the longest duration
        if (holdingDuration > longestDuration) {
          longestDuration = holdingDuration;
          longestAsset = symbol;
        }
      }
    }
  }

  return {
    chain,
    symbol: longestAsset,
    duration: longestDuration,
  };
};

/**
 * Converts seconds into a human-readable time duration (days, hours, minutes, seconds).
 * @param seconds - The duration in seconds.
 * @returns A string representing the time duration.
 */
export const formatDuration = (seconds: number): string => {
  const years = Math.floor(seconds / (3600 * 24 * 365));
  const months = Math.floor((seconds % (3600 * 24 * 365)) / (3600 * 24 * 30));
  const days = Math.floor((seconds % (3600 * 24 * 30)) / (3600 * 24));

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`);
  }
  if (months > 0) {
    parts.push(`${months} month${months > 1 ? 's' : ''}`);
  }
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }

  return parts.join(', ');
};
