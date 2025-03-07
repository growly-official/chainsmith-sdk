export interface TReservoirNFTCollectionResponse {
  collections: TReservoirNFTCollectionEntity[]
}

export interface TReservoirNFTCollectionEntity {
  collection: TReservoirNFTCollection
  ownership: TReservoirNFTOwnership
}

export interface TReservoirNFTCollection {
  id: string
  slug?: string
  name: string
  image: string
  isSpam: boolean
  banner?: string
  twitterUrl: any
  discordUrl?: string
  externalUrl?: string
  twitterUsername?: string
  openseaVerificationStatus?: string
  description?: string
  metadataDisabled: boolean
  sampleImages: string | undefined[]
  tokenCount: string
  primaryContract: string
  tokenSetId: string
  floorAskPrice?: TReservoirPrice
  rank: TReservoirTimeStats
  volume: TReservoirTimeStats
  volumeChange: TReservoirTimeStats
  floorSale: FloorSale
  contractKind: string
}
export interface TReservoirNFTOwnership {
  tokenCount: string
  totalValue: number
}
export interface TReservoirTimeStats {
  '1day'?: number
  '7day'?: number
  '30day'?: number
  'allTime'?: number
}

export interface TReservoirNFTActivityResponse {
  activities: TReservoirNFTActivity[]
  continuation: string
}

export interface TReservoirNFTActivity {
  type: string
  fromAddress: string
  toAddress?: string
  amount: number
  timestamp: number
  createdAt: string
  contract: string
  token: TReservoirToken
  collection: TReservoirNFTActivityCollection
  txHash?: string
  logIndex?: number
  batchIndex?: number
  isAirdrop?: boolean
  price?: TReservoirPrice
  order?: Order
  fillSource?: any
  comment: any
}

export interface TReservoirToken {
  tokenId: string
  tokenName: string
  tokenImage?: string
  tokenMedia: any
  tokenRarityRank?: number
  tokenRarityScore?: number
  isSpam: boolean
  isNsfw: boolean
}

export interface TReservoirNFTActivityCollection {
  collectionId: string
  collectionName: string
  collectionImage?: string
  isSpam: boolean
  isNsfw: boolean
}

export interface TReservoirPrice {
  currency: TReservoirCurrency
  amount: TReservoirAmount
}

export interface TReservoirCurrency {
  contract: string
  name: string
  symbol: string
  decimals: number
}

export interface TReservoirAmount {
  raw: string
  decimal: number
  usd: number
  native: number
}
