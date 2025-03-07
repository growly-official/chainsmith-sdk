// Staking Sonic Market
export interface TBeetsStakedSonicResponse {
  data: {
    stsGetGqlStakedSonicData: TBeetsStakedSonicMarket;
  };
}

export interface TBeetsStakedSonicMarket {
  delegatedValidators: DelegatedValidator[];
  exchangeRate: string;
  stakingApr: string;
  totalAssets: string;
  totalAssetsDelegated: string;
  totalAssetsPool: string;
  rewardsClaimed24h: string;
  __typename: string;
}

export interface DelegatedValidator {
  assetsDelegated: string;
  validatorId: string;
  __typename: string;
}

// Liquidity Pools
export interface TBeetsPoolsResponse {
  data: {
    count: number;
    pools: TBeetsPool[];
  };
}

export interface TBeetsPool {
  address: string;
  chain: string; // camelcase "Sonic"
  createTime: number;
  decimals: number;
  protocolVersion: number;
  tags: string[];
  hasErc4626: boolean;
  hasNestedErc4626: boolean;
  hasAnyAllowedBuffer: boolean;
  hook: null;
  poolTokens: TBeetsPoolToken[];
  dynamicData: DynamicData;
  staking: Staking;
  factory: string;
  id: string;
  name: string;
  owner: null;
  swapFeeManager: string;
  pauseManager: string | null;
  poolCreator: string | null;
  symbol: string;
  type: PoolType;
  userBalance: UserBalance;
  __typename: string;
}

export interface DynamicData {
  totalLiquidity: string;
  lifetimeVolume: string;
  lifetimeSwapFees: string;
  volume24h: string;
  fees24h: string;
  holdersCount: string;
  swapFee: string;
  swapsCount: string;
  totalShares: string;
  aprItems: APRItem[];
  __typename: string;
}

export interface APRItem {
  id: string;
  title: string;
  apr: number;
  type: APRItemType;
  rewardTokenSymbol: null | string;
  rewardTokenAddress: null | string;
  __typename: string;
}

export enum APRItemType {
  IbYield = 'IB_YIELD',
  MabeetsEmissions = 'MABEETS_EMISSIONS',
  Merkl = 'MERKL',
  Staking = 'STAKING',
  StakingBoost = 'STAKING_BOOST',
  SwapFee = 'SWAP_FEE',
  SwapFee24H = 'SWAP_FEE_24H',
  SwapFee30D = 'SWAP_FEE_30D',
  SwapFee7D = 'SWAP_FEE_7D',
  Voting = 'VOTING',
}

export interface Staking {
  id: string;
  type: StakingType;
  chain: string;
  address: string;
  gauge: Gauge | null;
  aura: null;
  __typename: string;
}
export interface Gauge {
  id: string;
  gaugeAddress: string;
  version: number;
  status: Status;
  workingSupply?: string;
  otherGauges?: Gauge[];
  rewards: Reward[];
  __typename: string;
}

export interface Reward {
  id: string;
  rewardPerSecond: string;
  tokenAddress: string;
  __typename: string;
}

export interface TBeetsPoolToken {
  id: string;
  address: string;
  symbol: string;
  weight: null | string;
  name: string;
  canUseBufferForSwaps: boolean | null;
  useWrappedForAddRemove: boolean | null;
  useUnderlyingForAddRemove: boolean | null;
  nestedPool: null;
  __typename: string;
  chain: string; // camelcase "Sonic"
  chainId: number;
  decimals: number;
  priority: number;
  tradable: boolean;
  index: number;
  balance: string;
  balanceUSD: string;
  priceRate: string;
  hasNestedPool: boolean;
  isAllowed: boolean;
  priceRateProvider: null | string;
  logoURI: null | string;
  priceRateProviderData: PriceRateProviderData | null;
  isErc4626: boolean;
  isBufferAllowed: boolean;
  underlyingToken: UnderlyingToken | null;
  erc4626ReviewData: Erc4626ReviewData | null;
}

export interface UnderlyingToken {
  chain: string; // camelcase "Sonic"
  chainId: number;
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  priority: number;
  tradable: boolean;
  isErc4626: boolean;
  logoURI: string;
  __typename: string;
}

export interface PriceRateProviderData {
  address: string;
  name: string;
  summary: Summary;
  reviewed: boolean;
  warnings: string[];
  upgradeableComponents: UpgradeableComponent[];
  reviewFile: string;
  factory: null;
  __typename: string;
}

export interface UpgradeableComponent {
  entryPoint: string;
  implementationReviewed: string;
  __typename: string;
}

export enum Status {
  Active = 'ACTIVE',
  Preferred = 'PREFERRED',
}

export enum StakingType {
  Gauge = 'GAUGE',
  Reliquary = 'RELIQUARY',
}

export enum PoolType {
  ComposableStable = 'COMPOSABLE_STABLE',
  Gyroe = 'GYROE',
  Stable = 'STABLE',
  Weighted = 'WEIGHTED',
}

export interface UserBalance {
  totalBalance: string;
  totalBalanceUsd: number;
  walletBalance: string;
  walletBalanceUsd: number;
  stakedBalances: StakedBalance[];
  __typename: string;
}

export interface StakedBalance {
  balance: string;
  balanceUsd: number;
  stakingType: string;
  stakingId: string;
  __typename: string;
}
