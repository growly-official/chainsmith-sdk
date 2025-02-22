import { BigNumberish, ethers } from 'ethers';

const READABLE_FORM_LEN = 4;

export function fromReadableAmount(amount: number, decimals: number): BigNumberish {
  return ethers.parseUnits(amount.toString(), decimals);
}

export function toReadableAmount(rawAmount: string, decimals: number): string {
  return ethers.parseUnits(rawAmount, decimals).toString().slice(0, READABLE_FORM_LEN);
}
