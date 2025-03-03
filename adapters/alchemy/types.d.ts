export type TAlchemyRequest = {
  id: number;
  jsonrpc: string;
  method: string;
  params: string[];
};

export type TAlchemyResponse = {
  id: number;
  jsonrpc: string;
  result: {
    address: string;
    tokenBalances: TAlchemyTokenBalance[];
    pageKey?: string;
  };
};

export type TAlchemyTokenBalance = {
  contractAddress: string;
  tokenBalance: string;
};

export type TAlchemyTokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
};
