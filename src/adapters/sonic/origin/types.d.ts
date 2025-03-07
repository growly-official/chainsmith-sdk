export interface TOriginSonicResponse {
  data: {
    oTokenDailyStats: TOriginSonicDailyStat[];
  };
}

export interface TOriginSonicDailyStat {
  id: string;
  blockNumber: number;
  timestamp: Date;
  date: Date;
  totalSupply: string;
  apy: number;
  apy7: number;
  apy14: number;
  apy30: number;
  rateETH: string;
  rateUSD: string;
  rebasingSupply: string;
  nonRebasingSupply: string;
  wrappedSupply: string;
  amoSupply: string;
  yield: string;
  fees: string;
  dripperWETH: string;
}
