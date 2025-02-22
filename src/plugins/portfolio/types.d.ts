import { TTokenPortfolio } from '../../types/index.d.ts';

export type TGetMultichainTokenList = (
  walletAddress?: TAddress,
  chains?: TChain[]
) => Promise<TMultichain<TChainTokenList>>;

export type TGetChainTokenList = (
  chain: TChain,
  walletAddress?: TAddress
) => Promise<TChainTokenList>;

export type IGetMultichainTokenPortfolio = (
  walletAddress?: TAddress,
  chains?: TChain[]
) => Promise<TTokenPortfolio>;
