export interface TMetropolisClassicV2Pool {
  chainId: number
  address: string
  name: string
  tokenX: TMetropolisToken
  tokenY: TMetropolisToken
  tokenXPrice: number
  tokenYPrice: number
  tokenXPriceUSD: number
  tokenYPriceUSD: number
  volumeUSD: number
  volumeUSDChange: number
  volumeUSDWeek: number
  volumeUSDChangeWeek: number
  totalFees24h: number
  totalFees7d: number
  lpFees24h: number
  lpFees7d: number
  feeApr7d: number
  feeApr24: number
  liquidityUSD: number
  liquidityUSDChange: number
  liquidityTokenX: number
  liquidityTokenY: number
  lbVersion: LBVersion
  tags: Tag[]
  rewardTokens: string[]
}

export interface TMetropolisV21Pool {
  chainId: number
  address: string
  name: string
  baseFeePct: number
  binStep: number
  tokenX: TMetropolisToken
  tokenY: TMetropolisToken
  tokenXPrice: number
  tokenYPrice: number
  tokenXPriceUSD: number
  tokenYPriceUSD: number
  volumeUSD: number
  volumeUSDChange: number
  volumeUSDWeek: number
  volumeUSDChangeWeek: number
  totalFees24h: number
  totalFees7d: number
  feeApr24: number
  feeApr7d: number
  depthFeeApr24h: number
  depthFeeApr7d: number
  liquidityUSD: number
  liquidityUSDChange: number
  liquidityTokenX: number
  liquidityTokenY: number
  depthTokenX: number
  depthTokenY: number
  depthPlusTokenUsd: number
  depthMinusTokenUsd: number
  lbVersion: LBVersion
  tags: Tag[]
  rewardTokens: string[]
}

export enum LBVersion {
  V21 = 'v21',
  ClassicV2 = 'classic-v2',
}

export enum MetropolisTag {
  Airdrop = 'airdrop',
  Classic = 'classic',
  MemeMania = 'meme-mania',
  Volatile = 'volatile',
}

export interface TMetropolisToken {
  chainId?: number
  address: string
  symbol: string
  name?: string
  decimals: number
}

export interface TMetropolisTokenImputed extends TMetropolisToken {
  priceUSD: number
}

export interface TMetropolisAggregatedInfo {
  volumeUSD: number
  volumeUSDChange: number
  liquidityUSD: number
  liquidityUSDChange: number
  txCount: number
  txCountChange: number
  totalVolumeUSD: number
}

// Vaults
export interface TMetropolisVault {
  chainId: number
  name: string
  decimals: number
  vaultAddress: string
  pairAddress: string
  strategyAddress: string
  depositX: number
  depositY: number
  liquidityUSD: number
  aumAnnualFee: number
  isEmergencyMode: boolean
  operator: string
  depositXUSD: number
  depositYUSD: number
  isShutdown: boolean
  isDepositsPaused: boolean
  accruedFeesX24HUSD: number
  accruedFeesY24HUSD: number
  accruedFeesX7dUSD: number
  accruedFeesY7dUSD: number
  accruedFeesX30dUSD: number
  accruedFeesY30dUSD: number
  accruedFees24h: number
  accruedFees7d: number
  accruedFees30d: number
  feeApr24: number
  feeApr7d: number
  aumFeesX24H: number
  aumFeesY24H: number
  aumFeesX24HUSD: number
  aumFeesY24HUSD: number
  aumFeesX7d: number
  aumFeesY7d: number
  aumFeesX7dUSD: number
  aumFeesY7dUSD: number
  aumFeesX30d: number
  aumFeesY30d: number
  aumFeesX30dUSD: number
  aumFeesY30dUSD: number
  rewardApr: number | null
  extraRewardApr: number | null
  rewardToken: TMetropolisToken
  extraRewardToken?: TMetropolisToken
  rewardUsdPerDay: number
  extraRewardUsdPerDay: number | null
}

export interface TMetropolisVaultPosition {
  chainId: number
  vaultAddress: string
  pairAddress: string
  depositX: number
  depositY: number
  initialDepositX: number
  initialDepositY: number
  queuedWithdrawals: TMetropolisQueuedWithdrawal[]
  shares: number
  depositXUSD: number
  depositYUSD: number
}

export interface TMetropolisQueuedWithdrawal {
  round: number
  shares: string
  isClaimable: boolean
}
