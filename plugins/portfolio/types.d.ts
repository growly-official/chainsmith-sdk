import { TTokenPortfolio, TMarketTokenList } from '@chaintypes';

export type TGetMultichainMarketTokens = (
  walletAddress?: TAddress,
  chains?: TChain[]
) => Promise<TMultichain<TMarketTokenList>>;

export type TGetMarketTokens = (
  walletAddress?: TAddress,
  chain?: TChain
) => Promise<TMarketTokenList>;

export type IGetMultichainTokenPortfolio = (
  walletAddress?: TAddress,
  chains?: TChain[]
) => Promise<TTokenPortfolio>;

export type IGetTokenPortfolio = (
  walletAddress?: TAddress,
  chain?: TChain
) => Promise<TTokenPortfolio>;
