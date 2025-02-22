import type { TChainId } from '../types/chains.d.ts';
import type {
  TContractTokenMetadata,
  TTokenAddress,
  TTokenListResponse,
  TTokenSymbol,
} from '../types/tokens.d.ts';

// Map token static list data.
export const intoChainTokenAddressMap = (
  m: TTokenListResponse[]
): Record<TChainId, Record<TTokenAddress, TContractTokenMetadata>> => {
  const tokenList = m.flatMap((item: TTokenListResponse) => item.tokens);
  const chainMap: Record<TChainId, Record<TTokenAddress, TContractTokenMetadata>> = {};
  for (const token of tokenList) {
    chainMap[token.chainId] = {
      ...chainMap[token.chainId],
      [token.address]: token,
    };
  }
  return chainMap;
};

export const intoChainTokenSymbolMap = (
  m: TTokenListResponse[]
): Record<TChainId, Record<TTokenSymbol, TContractTokenMetadata>> => {
  const tokenList = m.flatMap((item: TTokenListResponse) => item.tokens);
  const chainMap: Record<TChainId, Record<TTokenSymbol, TContractTokenMetadata>> = {};
  for (const token of tokenList) {
    chainMap[token.chainId] = {
      ...chainMap[token.chainId],
      [token.symbol]: token,
    };
  }
  return chainMap;
};
