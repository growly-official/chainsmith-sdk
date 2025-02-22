import { Logger } from 'tslog';
import { autoInjectable } from 'tsyringe';
import type {
  IMarketDataAdapter,
  IOnchainTokenAdapter,
  WithAdapter,
  WithManyAdapters,
} from '../../types/adapter.d.ts';
import type { TAddress, TChain, TMarketTokenList, TMultichain } from '../../types/index.d.ts';
import { createClient } from '../../wrapper.ts';
import { StoragePlugin } from '../storage/index.ts';
import { MultichainTokenPlugin } from '../token/index.ts';
import { aggregateMultichainTokenBalance } from '../../utils/portfolio.util.ts';
import type {
  IGetMultichainTokenPortfolio,
  TGetChainTokenList,
  TGetMultichainTokenList,
} from './types.d.ts';

@autoInjectable()
export class MultichainPortfolioPlugin {
  logger = new Logger({ name: 'MultichainPortfolioPlugin' });

  constructor(
    private tokenPlugin: MultichainTokenPlugin,
    private storage: StoragePlugin
  ) {}

  getMultichainTokenPortfolio: WithAdapter<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    IGetMultichainTokenPortfolio
  > = adapters => async (walletAddress?: TAddress, chains?: TChain[]) => {
    try {
      const _walletAddress = this.storage.readRamOrReturn({ walletAddress });
      const _chains = this.storage.readDiskOrReturn({ chains });
      const multichainTokenList = await this.getMultichainTokenList(adapters)(
        _walletAddress,
        _chains
      );
      return aggregateMultichainTokenBalance(multichainTokenList);
    } catch (error: any) {
      this.logger.error(`Failed to get multichain token portfolio: ${error}`);
      throw new Error(error);
    }
  };

  getMultichainTokenList: WithManyAdapters<
    [IMarketDataAdapter, IOnchainTokenAdapter],
    TGetMultichainTokenList
  > = adapters => async (walletAddress?: TAddress, chains?: TChain[]) => {
    try {
      const tokenList: TMultichain<TMarketTokenList> = {};
      const _walletAddress = this.storage.readRamOrReturn({ walletAddress });
      const _chains = this.storage.readDiskOrReturn({ chains });
      for (const chain of _chains) {
        tokenList[chain.chainName] = await this.getMarketTokenList(adapters)(chain, _walletAddress);
      }
      return tokenList;
    } catch (error: any) {
      this.logger.error(`Failed to get multichain token portfolio: ${error}`);
      throw new Error(error);
    }
  };

  getMarketTokenList: WithAdapter<[IMarketDataAdapter, IOnchainTokenAdapter], TGetChainTokenList> =
    ([marketDataAdapter, onchainTokenAdapter]) =>
    async (chain: TChain, walletAddress?: TAddress): Promise<TMarketTokenList> => {
      try {
        const client = createClient({
          chain,
        });
        if (!marketDataAdapter || !onchainTokenAdapter) throw new Error('No adapter found');
        const _walletAddress = this.storage.readRamOrReturn({ walletAddress });
        const nativeToken = await this.tokenPlugin.getNativeToken(client, _walletAddress);
        const contractTokens = await this.tokenPlugin.getContractTokens(onchainTokenAdapter)(
          chain.chainName,
          _walletAddress
        );
        const tokens = [nativeToken, ...contractTokens];
        const marketData = await marketDataAdapter.fetchTokensWithPrice(chain.chainName, tokens);
        return {
          tokens: marketData.tokens,
          totalUsdValue: marketData.totalUsdValue,
        };
      } catch (error: any) {
        this.logger.error(`Failed to get chain token portfolio: ${error}`);
        throw new Error(error);
      }
    };
}
