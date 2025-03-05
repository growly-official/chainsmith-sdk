export type TReservoirNFTCollectionResponse = {
  collections: TReservoirNFTCollectionEntity[];
};

export type TReservoirNFTCollectionEntity = {
  collection: TReservoirNFTCollection;
  ownership: TReservoirNFTOwnership;
};

export type TReservoirNFTCollection = {
  id: string;
  slug?: string;
  name: string;
  image: string;
  isSpam: boolean;
  banner?: string;
  twitterUrl: any;
  discordUrl?: string;
  externalUrl?: string;
  twitterUsername?: string;
  openseaVerificationStatus?: string;
  description?: string;
  metadataDisabled: boolean;
  sampleImages: string | undefined[];
  tokenCount: string;
  primaryContract: string;
  tokenSetId: string;
  floorAskPrice?: TReservoirPrice;
  rank: TReservoirTimeStats;
  volume: TReservoirTimeStats;
  volumeChange: TReservoirTimeStats;
  floorSale: FloorSale;
  contractKind: string;
};
export type TReservoirNFTOwnership = {
  tokenCount: string;
  totalValue: number;
};
export type TReservoirTimeStats = {
  '1day'?: number;
  '7day'?: number;
  '30day'?: number;
  allTime?: number;
};

export type TReservoirNFTActivityResponse = {
  activities: TReservoirNFTActivity[];
  continuation: string;
};

export type TReservoirNFTActivity = {
  type: string;
  fromAddress: string;
  toAddress?: string;
  amount: number;
  timestamp: number;
  createdAt: string;
  contract: string;
  token: TReservoirToken;
  collection: TReservoirNFTActivityCollection;
  txHash?: string;
  logIndex?: number;
  batchIndex?: number;
  isAirdrop?: boolean;
  price?: TReservoirPrice;
  order?: Order;
  fillSource?: any;
  comment: any;
};

export type TReservoirToken = {
  tokenId: string;
  tokenName: string;
  tokenImage?: string;
  tokenMedia: any;
  tokenRarityRank?: number;
  tokenRarityScore?: number;
  isSpam: boolean;
  isNsfw: boolean;
};

export type TReservoirNFTActivityCollection = {
  collectionId: string;
  collectionName: string;
  collectionImage?: string;
  isSpam: boolean;
  isNsfw: boolean;
};

export type TReservoirPrice = {
  currency: TReservoirCurrency;
  amount: TReservoirAmount;
};

export type TReservoirCurrency = {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type TReservoirAmount = {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
};
