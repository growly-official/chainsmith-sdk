import { autoInjectable } from 'tsyringe';
import type {
  TMultichain,
  TAddress,
  TChain,
  TClient,
  TContractToken,
  TMarketToken,
  TNativeToken,
  TToken,
  TTokenAddress,
  TTokenTransferActivity,
} from '../../types/index.d.ts';
import { formatReadableToken } from '../../wrapper.ts';
import { Logger } from 'tslog';
import { getClientChain } from '../../utils/index.ts';
import type {
  IMarketDataAdapter,
  IOnchainActivityAdapter,
  IOnchainTokenAdapter,
  WithAdapter,
} from '../../types/adapter.d.ts';
import { StoragePlugin } from '../storage/index.ts';
import { EvmTokenPlugin } from '../evm/index.ts';

type TGetMultichainTokenActivities = (
  address?: TAddress,
  chains?: TChain[]
) => Promise<TMultichain<TTokenTransferActivity[]>>;

type TGetChainTokenActivities = (
  address?: TAddress,
  chain?: TChain
) => Promise<TTokenTransferActivity[]>;

type TGetMultichainOwnedTokens = (
  address?: TAddress,
  chains?: TChain[]
) => Promise<TMultichain<TContractToken[]>>;

type TGetChainOwnedTokens = (address?: TAddress, chain?: TChain) => Promise<TContractToken[]>;

type TGetTokenPrice = (
  client?: TClient,
  tokenAddress?: TTokenAddress
) => Promise<TMarketToken | undefined>;

type TGetOwnedTokens = (chain: TChain, walletAddress?: TAddress) => Promise<TContractToken[]>;

@autoInjectable()
export class MultichainTokenPlugin {
  logger = new Logger({ name: 'MultichainTokenPlugin' });

  constructor(
    private evmPlugin: EvmTokenPlugin,
    private storagePlugin: StoragePlugin<{
      client: TClient;
      walletAddress: TAddress;
      tokenAddress: TAddress;
    }>
  ) {}

  getTokenPrice: WithAdapter<IMarketDataAdapter, TGetTokenPrice> =
    adapter => async (client?: TClient, tokenAddress?: TAddress) => {
      try {
        const chain = getClientChain(this.storagePlugin.readRamOrReturn({ client }));
        return adapter.fetchTokenWithPrice(chain.chainName!, {
          address: this.storagePlugin.readRamOrReturn({ tokenAddress }),
        } as TToken);
      } catch (error: any) {
        this.logger.error(`Failed to get token price: ${error.message}`);
        throw new Error(error);
      }
    };

  listMultichainOwnedTokens: WithAdapter<IOnchainTokenAdapter, TGetMultichainOwnedTokens> =
    adapter => async (walletAddress?: TAddress, chains?: TChain[]) => {
      try {
        const multichainTokens: TMultichain<TContractToken[]> = {};
        for (const chain of this.storagePlugin.readDiskOrReturn({ chains })) {
          multichainTokens[chain.chainName] = await adapter.listAllOwnedTokens(
            chain,
            this.storagePlugin.readRamOrReturn({ walletAddress })
          );
        }
        return multichainTokens;
      } catch (error: any) {
        this.logger.error(`Failed to get multichain tokens: ${error.message}`);
        throw new Error(error);
      }
    };

  listChainOwnedTokens: WithAdapter<IOnchainTokenAdapter, TGetChainOwnedTokens> =
    adapter => async (walletAddress?: TAddress, chain?: TChain) => {
      try {
        const _chain = chain || this.storagePlugin.readDisk('chains')[0];
        if (!_chain) throw new Error('No chain provided');
        return adapter.listAllOwnedTokens(
          _chain,
          this.storagePlugin.readRamOrReturn({ walletAddress })
        );
      } catch (error: any) {
        this.logger.error(`Failed to get multichain tokens: ${error.message}`);
        throw new Error(error);
      }
    };

  listMultichainTokenTransferActivities: WithAdapter<
    IOnchainActivityAdapter,
    TGetMultichainTokenActivities
  > = adapter => async (walletAddress?: TAddress, chains?: TChain[]) => {
    try {
      const chainActivitiesRecord: TMultichain<TTokenTransferActivity[]> = {};
      for (const chain of this.storagePlugin.readDiskOrReturn({ chains })) {
        chainActivitiesRecord[chain.chainName] = await adapter.listAllTokenActivities(
          chain.chainName,
          this.storagePlugin.readRamOrReturn({ walletAddress }),
          100
        );
      }
      return chainActivitiesRecord;
    } catch (error: any) {
      this.logger.error(`Failed to get token activities: ${error.message}`);
      throw new Error(error);
    }
  };

  listChainTokenTransferAcitivities: WithAdapter<
    IOnchainActivityAdapter,
    TGetChainTokenActivities
  > = adapter => async (walletAddress?: TAddress, chain?: TChain) => {
    try {
      const _chain = chain || this.storagePlugin.readDisk('chains')[0];
      if (!_chain) throw new Error('No chain provided');
      return adapter.listAllTokenActivities(
        chain.chainName,
        this.storagePlugin.readRamOrReturn({ walletAddress }),
        100
      );
    } catch (error: any) {
      this.logger.error(`Failed to get token activities: ${error.message}`);
      throw new Error(error);
    }
  };

  getContractTokens: WithAdapter<IOnchainTokenAdapter, TGetOwnedTokens> =
    adapter => async (chain: TChain, walletAddress?: TAddress) => {
      try {
        const contractTokens = await adapter.listAllOwnedTokens(
          chain,
          this.storagePlugin.readRamOrReturn({ walletAddress })
        );
        return contractTokens;
      } catch (error: any) {
        this.logger.error(`Failed to get contract tokens: ${error.message}`);
        throw new Error(error);
      }
    };

  async getNativeToken(client: TClient, walletAddress?: TAddress): Promise<TNativeToken> {
    try {
      const chain = getClientChain(client);
      const metadata = await this.evmPlugin.getTokenMetadataBySymbol(chain.nativeCurrency.symbol);
      const balance = await client.getBalance({
        address: this.storagePlugin.readRamOrReturn({ walletAddress }),
      });
      return {
        ...chain.nativeCurrency,
        logoURI: metadata?.logoURI,
        chainId: chain.id,
        type: 'native',
        balance: formatReadableToken(chain, balance),
      };
    } catch (error: any) {
      this.logger.error(`Failed to get native token: ${error.message}`);
      throw new Error(error);
    }
  }
}
