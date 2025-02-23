import type { TContractTokenMetadata } from '../../../types/tokens.d.ts';

export type TShadowQuoteConfig = {
  tokenIn: TContractTokenMetadata;
  tokenOut: TContractTokenMetadata;
  amountIn: number;
  tickSpacing: number;
  sqrtPriceLimitX96: number;
};

export type TShadowGetPoolConfig = {
  tokenIn: TContractTokenMetadata;
  tokenOut: TContractTokenMetadata;
  tickSpacing: number;
};
