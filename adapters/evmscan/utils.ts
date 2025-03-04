import type { TTokenTransferActivity } from '../../types/tokens.d.ts';
import type { TActivityStats } from '../../types/stats.d.ts';

export const calculateEVMStreaksAndMetrics = (
  transactions: TTokenTransferActivity[],
  address: string
): TActivityStats => {
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
      i === 0 ||
      (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24) === 1
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
};
