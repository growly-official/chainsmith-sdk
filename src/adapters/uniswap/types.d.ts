import { FeeAmount } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';

export type TUniswapQuoteConfig = {
  in: Token;
  amountIn: number;
  out: Token;
  poolFee: FeeAmount;
};

export type TUniswapGetConstantParameters = {
  in: Token;
  out: Token;
  poolFee: FeeAmount;
};
