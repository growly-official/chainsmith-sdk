/** Conver string to number
 *
 * @param str String convertible value
 */
export const stoi = (str: string | number | bigint): number => {
  return parseInt(str.toString());
};

export const formatNumberUSD = (num: number) => {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatNumberSI = (num: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
};
