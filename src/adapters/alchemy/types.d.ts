export interface TAlchemyRequest {
  id: number;
  jsonrpc: string;
  method: string;
  params: string[];
}

export interface TAlchemyResponse {
  id: number;
  jsonrpc: string;
  result: {
    address: string;
    tokenBalances: TAlchemyTokenBalance[];
    pageKey?: string;
  };
}

export interface TAlchemyTokenBalance {
  contractAddress: string;
  tokenBalance: string;
}

export interface TAlchemyTokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
}
