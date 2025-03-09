import type { TEVMScanTransaction } from '../adapters';
import type {
  TActivityStats,
  TAddress,
  TChainName,
  TDeFiActivityStats,
  TLongestHoldingToken,
  TNFTActivityStats,
  TNftTransferActivity,
  TTokenTransferActivity,
} from '../types';

import { Constants } from '../data';

interface Holding {
  amount: number;
  timestamp: number;
}

export function calculateGasInETH(gasPrice: number, gasUsed: number): number {
  const gwei = 10 ** 9;
  return (gasPrice / gwei) * (gasUsed / gwei);
}

export function calculateEVMStreaksAndMetrics(
  transactions: TEVMScanTransaction[],
  address: string
): TActivityStats {
  const filteredTransactions = transactions.filter(
    tx => tx.from.toLowerCase() === address.toLowerCase() // Filter from Txs only
  );

  const timestamps = transactions.map(tx => Number.parseInt(tx.timeStamp, 10));
  const firstTransactionDate = new Date(Math.min(...timestamps) * 1000);

  // TODO: Enhance filter logic to distinguish between from and to txs for activeDay
  if (filteredTransactions.length === 0) {
    return {
      totalTxs: 0,
      firstActiveDay: firstTransactionDate,
      uniqueActiveDays: 0,
      longestStreakDays: 0,
      currentStreakDays: 0,
      activityPeriod: 0,
    };
  }
  const lastTransactionDate = new Date(Math.max(...timestamps) * 1000);

  const uniqueActiveDaysSet = new Set(
    filteredTransactions.map(tx =>
      new Date(Number.parseInt(tx.timeStamp, 10) * 1000).toDateString()
    )
  );

  const sortedDates = Array.from(uniqueActiveDaysSet)
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());

  let longestStreakDays = 0;
  let streak = 0;
  for (let i = 0; i < sortedDates.length; i++) {
    if (
      i === 0
      || (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24) === 1
    ) {
      streak++;
    } else {
      longestStreakDays = Math.max(longestStreakDays, streak);
      streak = 1;
    }
  }
  longestStreakDays = Math.max(longestStreakDays, streak);

  return {
    totalTxs: transactions.length, // Revert to get all transaction
    firstActiveDay: firstTransactionDate,
    uniqueActiveDays: uniqueActiveDaysSet.size,
    longestStreakDays,
    currentStreakDays:
      sortedDates[sortedDates.length - 1].toDateString() === new Date().toDateString() ? streak : 0,
    activityPeriod: Math.max(
      Math.ceil(
        (lastTransactionDate.getTime() - firstTransactionDate.getTime()) / (1000 * 60 * 60 * 24)
      ),
      1
    ),
  };
}

export function calculateDeFiActivityStats(
  transactions: TEVMScanTransaction[]
): TDeFiActivityStats {
  // All defi transactions (swap, lend, stake, borrow)
  const sumCount = transactions.filter(
    tx =>
      Constants.ALL_DEFI_INTERACTION.has(tx.to.toLowerCase())
      || Constants.ALL_DEFI_INTERACTION.has(tx.from.toLowerCase())
  ).length;

  const swapCount = transactions.filter(tx =>
    Constants.DEX_INTERACTION.has(tx.to.toLowerCase())
  ).length;

  const dexCount = transactions.filter(
    tx =>
      Constants.DEX_INTERACTION.has(tx.to.toLowerCase())
      || Constants.DEX_INTERACTION.has(tx.from.toLowerCase())
  ).length;

  const lendCount = transactions.filter(
    tx =>
      Constants.LEND_BORROW_STAKE_INTERACTION.has(tx.to.toLowerCase())
      || Constants.LEND_BORROW_STAKE_INTERACTION.has(tx.from.toLowerCase())
  ).length;

  return { sumCount, swapCount, dexCount, lendCount } as TDeFiActivityStats;
}

export function calculateNFTActivityStats(
  nftActivities: TNftTransferActivity[],
  address: string
): TNFTActivityStats {
  // All NFT actions
  const sumCount = nftActivities.length;

  // Filter out VIC Scan - since it's didn't have duplicated data

  const dedupKeys = [
    'chain',
    'blockHash',
    'hash',
    'from',
    'to',
    'timestamp',
    'tokenId',
    'tokenName',
    'tokenSymbol',
  ];
  // 1 buy/sale action with have additional transfer transaction
  // -> First filter all the duplicated records (~= trading activity)
  // having the same blockHash, tokenId, tokenName, tokenSymbol, from, to
  // -> Dedup on records with the same blockHash, tokenId, tokenName, tokenSymbol, from, to
  const seen = new Set();
  const evmDedupNFTActivities = nftActivities.filter(item => {
    // Create a unique key based on the specified fields
    const key = dedupKeys.map(field => item[field as keyof TNftTransferActivity]).join('|');
    if (seen.has(key)) {
      return true; // Duplicate found
    }
    seen.add(key); // Mark this combination as seen
    return false; // Do not keep this item yet
  });

  // Concat all
  const cleanedNFTActivity = evmDedupNFTActivities;

  // Activity type:
  // Mint: from === 0x00000...
  // Sale: from !== 0x00000... && to === address: Ignore mint
  // Buy: from === address && to !== 0x00000... : Ignore burn
  const mintCount = cleanedNFTActivity.filter(act =>
    act.from.toLowerCase().includes('0x00000000000')
  ).length;

  const buyCount = cleanedNFTActivity.filter(
    act =>
      !act.from.toLowerCase().includes('0x00000000000')
      && act.to.toLowerCase() === address.toLowerCase()
    // TODO: It still contains transferActivities -.-
  ).length;

  const saleCount = cleanedNFTActivity.filter(
    act =>
      act.from.toLowerCase() === address.toLowerCase()
      && !act.to.toLowerCase().includes('0x00000000000')
    // TODO: It still contains transferActivities -.-
  ).length;

  const tradeCount = buyCount + saleCount;

  return {
    sumCount,
    tradeCount,
    saleCount,
    buyCount,
    mintCount,
  } as TNFTActivityStats;
}

/**
 * Function to find the asset with the longest holding duration.
 * @param chain - The blockchain network (e.g., Ethereum, Binance Smart Chain).
 * @param transactions - Array of buy/sell transactions.
 * @param address - The address of the user.
 * @returns The asset with the longest holding duration and the duration in milliseconds.
 */
export function findLongestHoldingToken(
  chain: TChainName,
  transactions: TTokenTransferActivity[],
  address: TAddress
): TLongestHoldingToken {
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
}

/**
 * Converts seconds into a human-readable time duration (days, hours, minutes, seconds).
 * @param seconds - The duration in seconds.
 * @returns A string representing the time duration.
 */
export function formatDuration(seconds: number): string {
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
}
