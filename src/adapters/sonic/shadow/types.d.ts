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

export type TShadowEpochData = {
  currentEpochEmissions: number;
  currentEpochEmissionsUSD: number;
  nextEpochEmissions: number;
  nextEpochEmissionsUSD: number;
  pctVoted: number;
  pendingRebase: number;
  pendingRebaseAPR: number;
  pendingRebaseUSD: number;
  shadowCirculating: number;
  shadowCirculatingUSD: number;
  shadowPriceUSD: number;
  shadowTotalSupply: number;
  shadowTotalSupplyUSD: number;
  totalVotes: number;
  totalVotesUSD: number;
  x33Ratio: number;
  xShadowStaked: number;
  xShadowStakedUSD: number;
  xshadowSupply: number;
  xshadowSupplyUSD: number;
};

export interface TShadowMixedPairs {
  pairs: Pair[];
  tokens: TShadowToken[];
}

export interface TShadowPair {
  fee: number;
  feeDistributor: TShadowFeeDistributor | null;
  feeDistributorV2: TShadowFeeDistributor | null;
  gauge: Gauge | null;
  id: string;
  lp_price?: number;
  projectedFees: TShadowProjectedFees;
  reserve0: number;
  reserve1: number;
  stable?: boolean;
  stats?: TShadowStats;
  symbol: string;
  token0: string;
  token1: string;
  totalSupply: number;
  totalValueLockedToken0: string;
  totalValueLockedToken1: string;
  totalVeShareByPeriod: number;
  tvl: number;
  voteApr?: number;
  voteBribes?: { [key: string]: number };
  feesPerDay?: number;
  feesPerDayVoters?: number;
  lpApr?: number;
  poolDayData?: PoolDayDatum[];
  poolHourData?: PoolHourDatum[];
  averageUsdInRange?: number;
  dynamicFees?: boolean;
  feeApr?: number;
  feeTier?: string;
  feesUSD?: number;
  gaugeV2?: GaugeV2 | null;
  isStable?: boolean;
  liquidity?: number;
  oneTickFeeApr?: number;
  pctActiveTvl?: number;
  price?: number;
  recommendedRangesNew?: TShadowRecommendedRangesNew[];
  sqrtPrice?: string;
  tick?: string;
  tickSpacing?: string;
  totalValueLockedUSD?: string;
  fee_split?: FeeSplit;
  oneTickEmissionApr?: number;
  recommendedRanges?: RecommendedRange[];
  type?: string;
}

export interface TShadowFeeDistributor {
  id: string;
  rewardTokens: string[];
}

export interface FeeSplit {
  LPERS: number;
  PROTOCOL: number;
  VOTERS: number;
}

export interface Gauge {
  id: string;
  isAlive: boolean;
  periodFinish?: { [key: string]: number };
  poolTokensStaked?: number;
  rewardRate: { [key: string]: number };
  rewardTokens: string[];
  xRamRatio?: string;
}

export interface GaugeV2 {
  id: string;
  isAlive: boolean;
  rewardRate: { [key: string]: number };
  rewardTokens: RewardToken[];
}

export enum RewardToken {
  The0X3333B97138D4B086720B5Ae8A7844B1345A33333 = '0x3333b97138d4b086720b5ae8a7844b1345a33333',
  The0X5050Bc082Ff4A74Fb6B0B04385Defddb114B2424 = '0x5050bc082ff4a74fb6b0b04385defddb114b2424',
}

export interface PoolDayDatum {
  feesUSD: string;
  startOfDay: number;
  tvlUSD: string;
  volumeToken0: string;
  volumeToken1: string;
  volumeUSD: string;
  high?: string;
  liquidity?: string;
  low?: string;
}

export interface PoolHourDatum {
  feesUSD: string;
  startOfHour: number;
  tvlUSD?: string;
  volumeToken0?: string;
  volumeToken1?: string;
  volumeUSD: string;
}

export interface TShadowProjectedFees {
  tokens: { [key: string]: number };
  days?: number;
}

export interface RecommendedRange {
  inRangeLiquidityUSD: number;
  lpApr: number;
  name: TShadowName;
  rangeDelta: number;
  unit: TShadowUnit;
  value: number;
  default?: boolean;
}

export enum TShadowName {
  Aggressive = 'Aggressive',
  Insane = 'Insane',
  Narrow = 'Narrow',
  Passive = 'Passive',
  Wide = 'Wide',
}

export enum TShadowUnit {
  Pct = 'pct',
  Tick = 'tick',
}

export interface TShadowRecommendedRangesNew {
  feeApr: number;
  inRangeLiquidityUSD: number;
  lpApr: number;
  name: TShadowName;
  oneTickTvl: number;
  rangeDelta: number;
  rewardApr: number;
  unit: TShadowUnit;
  value: number;
  default?: boolean;
}

export interface TShadowStats {
  last_24h_fees: number;
  last_24h_vol: number;
  last_7d_fees?: number;
  last_7d_vol?: number;
}

export interface TShadowToken {
  decimals: number;
  id: string;
  name: string;
  price: number;
  priceUSD: string;
  symbol: string;
}
