import { Logger } from 'tslog';
import { autoInjectable } from 'tsyringe';
import type {
  IMarketDataAdapter,
  IOnchainTokenAdapter,
  WithManyAdapters,
} from '../../types/adapter.d.ts';
import type {
  TAddress,
  TChain,
  TMarketTokenList,
  TMultichain,
  TMarketToken,
} from '../../types/index.d.ts';
import { StoragePlugin } from '../storage/index.ts';
import { MultichainTokenPlugin } from '../token/index.ts';
import { aggregateMultichainTokenBalance } from '../../utils/portfolio.util.ts';
import type {
  IGetMultichainTokenPortfolio,
  IGetTokenPortfolio,
  TGetMarketTokens,
  TGetMultichainMarketTokens,
} from './types.d.ts';

@autoInjectable()
export class MultichainPortfolioPlugin {
  logger = new Logger({ name: 'MultichainPortfolioPlugin' });

  constructor(
    private tokenPlugin: MultichainTokenPlugin,
    private storage: StoragePlugin
  ) {}

  getMultichainTokenPortfolio: WithManyAdapters<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    IGetMultichainTokenPortfolio
  > = adapters => async (walletAddress?: TAddress, chains?: TChain[]) => {
    try {
      const _walletAddress = this.storage.readRamOrReturn({ walletAddress });
      const _chains = this.storage.readDiskOrReturn({ chains });
      const multichainTokenList = await this.getMultichainMarketTokenList(adapters)(
        _walletAddress,
        _chains
      );
      return aggregateMultichainTokenBalance(multichainTokenList);
    } catch (error: any) {
      this.logger.error(`Failed to get multichain token portfolio: ${error}`);
      throw new Error(error);
    }
  };

  getTokenPortfolio: WithManyAdapters<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    IGetTokenPortfolio
  > = adapters => async (walletAddress?: TAddress, chain?: TChain) => {
    try {
      const _walletAddress = this.storage.readRamOrReturn({ walletAddress });
      const _chain = chain || this.storage.readDisk('chains')[0];
      if (!_chain) throw new Error('No chain provided');
      const chainTokenList = await this.getMarketTokenList(adapters)(_walletAddress, _chain);
      return aggregateMultichainTokenBalance({
        [_chain.chainName]: chainTokenList,
      });
    } catch (error: any) {
      this.logger.error(`Failed to get token portfolio: ${error}`);
      throw new Error(error);
    }
  };

  getMultichainMarketTokenList: WithManyAdapters<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    TGetMultichainMarketTokens
  > = adapters => async (walletAddress?: TAddress, chains?: TChain[]) => {
    try {
      const tokenList: TMultichain<TMarketTokenList> = {};
      const _walletAddress = this.storage.readRamOrReturn({ walletAddress });
      const _chains = this.storage.readDiskOrReturn({ chains });
      for (const chain of _chains) {
        tokenList[chain.chainName] = await this.getMarketTokenList(adapters)(_walletAddress, chain);
      }
      return tokenList;
    } catch (error: any) {
      this.logger.error(`Failed to get multichain token portfolio: ${error}`);
      throw new Error(error);
    }
  };

  /** The method is optimized for fetching token list one by one using multiple adapters. */
  getMarketTokenList: WithManyAdapters<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    TGetMarketTokens
  > =
    ([marketDataAdapter, onchainTokenAdapter]) =>
    async (walletAddress?: TAddress, chain?: TChain): Promise<TMarketTokenList> => {
      try {
        const _chain = chain || this.storage.readDisk('chains')[0];
        if (!_chain) throw new Error('No chain provided');
        if (!marketDataAdapter || !onchainTokenAdapter) throw new Error('No adapter found');
        const tokens = await this.tokenPlugin.getTokens(onchainTokenAdapter)(chain, walletAddress);
        let totalUsdValue = 0;
        const marketTokens: TMarketToken[] = [];
        for (const token of tokens) {
          try {
            const marketToken = await marketDataAdapter.fetchTokenWithPrice(chain.chainName, token);
            totalUsdValue += marketToken.usdValue;
            marketTokens.push(marketToken);
          } catch (e) {
            this.logger.error(`Fails to get market token ${token.symbol}: ${e.message}`);
          }
        }
        return {
          tokens: marketTokens,
          totalUsdValue: totalUsdValue,
        };
      } catch (error: any) {
        this.logger.error(`Failed to get market token list: ${error}`);
        throw new Error(error);
      }
    };

  /** The method is optimized for fetching token list in batch using one single adapters. */
  getBatchMarketTokenList: WithManyAdapters<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    TGetMarketTokens
  > =
    ([marketDataAdapter, onchainTokenAdapter]) =>
    async (walletAddress?: TAddress, chain?: TChain): Promise<TMarketTokenList> => {
      try {
        const _chain = chain || this.storage.readDisk('chains')[0];
        if (!_chain) throw new Error('No chain provided');
        if (!marketDataAdapter || !onchainTokenAdapter) throw new Error('No adapter found');
        const tokens = await this.tokenPlugin.getTokens(onchainTokenAdapter)(chain, walletAddress);
        const marketData = await marketDataAdapter.fetchTokensWithPrice(chain.chainName, tokens);
        return {
          tokens: marketData.tokens,
          totalUsdValue: marketData.totalUsdValue,
        };
      } catch (error: any) {
        this.logger.error(`Failed to get batch market token list: ${error}`);
        throw new Error(error);
      }
    };
}
