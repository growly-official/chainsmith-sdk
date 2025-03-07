import type { Token } from '@uniswap/sdk-core';
import type { FeeAmount } from '@uniswap/v3-sdk';

export interface TUniswapQuoteConfig {
  in: Token;
  amountIn: number;
  out: Token;
  poolFee: FeeAmount;
}

export interface TUniswapGetPoolConfig {
  in: Token;
  out: Token;
  poolFee: FeeAmount;
}
