export interface TSiloMarket {
  protocolKey: SiloProtocolKey
  id: string
  isVerified: boolean
  configAddress: string
  boostedContentKey: null | string
  silo0: TSiloToken
  silo1: TSiloToken
}

export interface TSiloMetrics {
  tvlUsd: string
}

export enum SiloProtocolKey {
  Babylon = 'babylon',
  Rings = 'rings',
  Silo = 'silo',
  Solv = 'solv',
  Sonic = 'sonic',
}

export interface TSiloToken {
  tokenAddress: string
  symbol: string
  name: string
  logos: Logos
  decimals: number
  priceUsd: string
  maxLtv: string
  lt: string
  solvencyOracle: Oracle
  maxLtvOracle: Oracle
  collateralBaseApr: string
  collateralPrograms: CollateralProgram[]
  protectedPrograms: any[]
  debtBaseApr: string
  debtPrograms: any[]
  liquidity: string
  tvl: string
  isNonBorrowable: boolean
  collateralPoints: TSiloPoint[]
  protectedPoints: TSiloPoint[]
  debtPoints: TSiloPoint[]
  oracleLabel: OracleLabel | null
  oracleContentKey: string
}

export interface TSiloPoint {
  _tag: SiloProtocolKey
  multiplier: number
  basePoints?: number
}

export interface CollateralProgram {
  rewardTokenSymbol: string
  apr: string
}

export interface Logos {
  trustWallet: null
  coinMarketCap: null
  coinGecko: CoinGeckoImage | null
}

export interface CoinGeckoImage {
  small: string
  large: string
}

export interface Oracle {
  address: string
  oracleKey: string
  baseToken: null
  quoteToken: null
  name: null
}

export enum OracleLabel {
  Chainlink = 'Chainlink',
  CustomOracle = 'Custom oracle',
  Pyth = 'Pyth',
  PythRedStone = 'Pyth + RedStone',
  RedStone = 'RedStone',
}
