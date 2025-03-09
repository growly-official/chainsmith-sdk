import type { TAddress, TChainId } from './chains';
import type { TTokenSymbol } from './tokens';

export type TMarketNft = TNftBalance & {
  usdValue: number;
};

export type TNftBalance = TNftCollectionMetadata & {
  balance: number;
};

export interface TNftCollectionMetadata {
  chainId: TChainId;
  address: string;
  name: string;
  image: string;
  floorPrice: number;
  currency: string;
}

export interface TNftTransferActivity {
  chainId: TChainId;

  blockHash: string;
  from: TAddress;
  to: TAddress;
  timestamp: string;
  hash: string;

  tokenID: string;
  tokenName: string;
  tokenSymbol: TTokenSymbol;
}
