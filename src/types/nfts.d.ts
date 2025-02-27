type TNFTBalance = {
  chainId: number;
  collectionAddress: string;
  collectionName: string;
  collectionImage: string;
  floorPrice: number;
  totalCount: number;
  totalValue: number; // USD
};

type TNFTActivityV2 = {
  // Remove collectionName and action (since we're reading directly from explorer)
  chainId: number;

  blockHash: string;
  from: TAddress;
  to: TAddress;
  timestamp: string;
  hash: string;

  tokenId: string;
  tokenName: string;
  tokenSymbol: TTokenSymbol;
};
