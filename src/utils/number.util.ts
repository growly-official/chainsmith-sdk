/**
 * Conver string to number
 *
 * @param str String convertible value
 */
export function stoi(str: string | number | bigint): number {
  return Number.parseInt(str.toString())
}

export function formatNumberUSD(num: number): string {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export function formatNumberSI(num: number): string {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(num)
}
