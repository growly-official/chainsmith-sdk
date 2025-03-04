import { TAddress, TChainId } from './chains.d.ts';
import { TTokenSymbol } from './tokens.d.ts';

export type TNftBalance = TNftCollectionMetadata & {
  balance: number;
};

export type TNftCollectionMetadata = {
  chainId: TChainId;
  address: string;
  name: string;
  image: string;
  floorPrice: number;
  currency: string;
};

export type TNftTransferActivity = {
  chainId: TChainId;

  blockHash: string;
  from: TAddress;
  to: TAddress;
  timestamp: string;
  hash: string;

  tokenID: string;
  tokenName: string;
  tokenSymbol: TTokenSymbol;
};
