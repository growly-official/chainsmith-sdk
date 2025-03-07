export interface TPaintSwapUserNFTResp {
  nfts: TPaintSwapUserNFT[]
}

export interface TPaintSwapUserOwnedResp {
  owned: TPaintSwapUserOwnedCollection[]
}

export interface TPaintSwapUserNFT {
  id: string
  address: string
  tokenId: string
  user: string
  amount: string
  locked: string
  numOnSaleNonCustodial: string
  numOnSaleAuction: string
  numOnSaleCustodial: string
  isNSFW: boolean
  isTracked: boolean
  lastTransferTimestamp: string
  isERC721: boolean
  isTransferable: boolean
  creator: string
  price: string
  saleId: string
  custom1: any
  custom2: any
  custom3: any
  custom4: any
  custom5: any
  custom6: any
  custom7: any
  custom8: any
  nft: any // Observed to be duplicated to parent attributes
  subgraphIndex: number
  approvalState: string
  contentVerified: boolean
  isFNFT: boolean
  lastSellPrice: any
  lastSellId: any
  mintOrder: string
  createdTimestamp: string
  owner: string
  num: string
  onSale: boolean
}

export interface TPaintSwapUserOwnedCollection {
  id: string
  user: string
  address: string
  amount: string
  total: string
  collection: TPaintSwapCollection
}

export interface TPaintSwapCollection {
  id: string
  createdAt: string
  updatedAt: string
  address: string
  owner: string
  name: string
  description: string
  nsfw: boolean
  mintPriceLow: number
  mintPriceHigh: number
  verified: boolean
  startBlock: number
  path: string
  website: string
  twitter: string
  discord: string
  medium: string
  telegram: string
  reddit: string
  poster: string
  banner: string
  thumbnail: string
  marketing: string
  standard: string
  featured: boolean
  displayed: boolean
  imageStyle: string
  customMetadata: any
  isFnft: boolean
  isInFnftMarketplace: boolean
  isReveal: boolean
  isSkipRank: boolean
  isDynamicMetadata: boolean
  isDynamicMedia: boolean
  chainId: number
  stats: TPaintSwapCollectionStats
  tracked: boolean
  meta: boolean
  isWhitelisted: boolean
}

export interface TPaintSwapCollectionStats {
  id: string
  name: string
  symbol: string
  collectionCreationOrder: number
  startBlock: string
  isWhitelisted: boolean
  numTradesLast7Days: string
  numTradesLast24Hours: string
  createdTimestamp: string
  totalMinted: string
  floor: string
  floorCap: string
  lowestPrice: string
  highestPrice: string
  numOwners: string
  totalTrades: string
  lastSellPrice: string
  totalNFTs: string
  highestSale: string
  totalVolumeTraded: string
  volumeLast24Hours: string
  volumeLast7Days: string
  activeSales: string
  activeSalesNonAuction: string
  timestampLastSale: string
  timestampLastTrim: string
}
