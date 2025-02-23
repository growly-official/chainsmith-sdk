import type { TChainId } from '../types/chains.d.ts';
import type {
  TContractTokenMetadata,
  TTokenAddress,
  TTokenListResponse,
  TTokenSymbol,
} from '../types/tokens.d.ts';
import { BigNumberish, ethers } from 'ethers';

const READABLE_FORM_LEN = 4;

export function fromReadableAmount(amount: number, decimals: number): BigNumberish {
  return ethers.parseUnits(amount.toString(), decimals);
}

export function toReadableAmount(rawAmount: string, decimals: number): string {
  return ethers.parseUnits(rawAmount, decimals).toString().slice(0, READABLE_FORM_LEN);
}

// Map token static list data.
export function intoChainTokenAddressMap(
  m: TTokenListResponse[],
  chainId?: TChainId
): Record<TChainId, Record<TTokenAddress, TContractTokenMetadata>> {
  const tokenList = m.flatMap((item: TTokenListResponse) => item.tokens);
  const chainMap: Record<TChainId, Record<TTokenAddress, TContractTokenMetadata>> = {};
  for (const token of tokenList) {
    chainMap[token.chainId || chainId] = {
      ...chainMap[token.chainId || chainId],
      [token.address]: token,
    };
  }
  return chainMap;
}

export function intoChainTokenSymbolMap(
  m: TTokenListResponse[]
): Record<TChainId, Record<TTokenSymbol, TContractTokenMetadata>> {
  const tokenList = m.flatMap((item: TTokenListResponse) => item.tokens);
  const chainMap: Record<TChainId, Record<TTokenSymbol, TContractTokenMetadata>> = {};
  for (const token of tokenList) {
    chainMap[token.chainId] = {
      ...chainMap[token.chainId],
      [token.symbol]: token,
    };
  }
  return chainMap;
}

export function isZeroAddress(address?: string): boolean {
  return !address || BigInt(address) === BigInt(0);
}
