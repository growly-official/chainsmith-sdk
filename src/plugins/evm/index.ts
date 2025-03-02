import { formatUnits, getContract } from 'viem';
import { stoi } from '../../utils/index.ts';
import { Abis, Files } from '../../data/index.ts';
import type {
  TAddress,
  TBlockNumber,
  TChainId,
  TChainMetadataListResponse,
  TClient,
  TContractToken,
  TContractTokenMetadata,
  TTokenAddress,
  TMultichain,
  TTokenListResponse,
  TTokenSymbol,
} from '../../types/index.d.ts';
import { autoInjectable } from 'tsyringe';
import { Logger } from 'tslog';
import axios from 'axios';

const TOKEN_LIST_URLS = {
  // Multi-EVM (popular tokens only)
  uniswap: 'https://ipfs.io/ipns/tokens.uniswap.org',
  superchain: 'https://static.optimism.io/optimism.tokenlist.json',
};

const CHAIN_LIST_URLS = {
  // Multi-EVM networks
  chainlist: 'https://chainid.network/chains.json',
};

@autoInjectable()
export class EvmChainPlugin {
  name = 'EvmChainPlugin';
  logger = new Logger({ name: this.name });

  getChainMetadata = async (chainId: TChainId): Promise<TChainMetadataListResponse | undefined> => {
    const metadata = Files.ChainList.ChainMetadataMap[chainId];
    const res = await axios.get(
      `https://raw.githubusercontent.com/ethereum-lists/chains/refs/heads/master/_data/icons/${metadata.icon}.json`
    );
    const data = res.data as [{ url: string }];
    return {
      ...metadata,
      icon: data[0],
      logoUrl: `https://ipfs.io/${data[0].url?.replace('://', '/')}`,
    };
  };

  getAllChainMetadata = async (): Promise<TMultichain<TChainMetadataListResponse>> => {
    try {
      // Extracting all EVM chain list URLs from the constants
      const evmChainListURLs = Object.values(CHAIN_LIST_URLS);
      // Fetching all chain lists simultaneously
      const promises = evmChainListURLs.map(url => fetch(url));
      // Waiting for all fetch promises to resolve
      const responses = await Promise.all(promises);
      // Extracting JSON data from the responses
      const data: TChainMetadataListResponse[] = await Promise.all(
        responses.map(response => response.json())
      );
      const multichainMetadata: TMultichain<TChainMetadataListResponse> = {};
      const chainMetadataList = data.flat();
      for (const chainMetadata of chainMetadataList) {
        multichainMetadata[chainMetadata.chainId] = chainMetadata;
      }
      return multichainMetadata;
    } catch (error: any) {
      this.logger.error(`Failed to get chain metadata list: ${error.message}`);
      return {};
    }
  };
}

@autoInjectable()
export class EvmTokenPlugin {
  logger = new Logger({ name: 'EvmTokenPlugin' });

  getTokenMetadataList = async (chainId: TChainId): Promise<TContractTokenMetadata[]> => {
    try {
      // Extracting all EVM token list URLs from the constants
      const evmTokenListURLs = Object.values(TOKEN_LIST_URLS);
      // Fetching all token lists simultaneously
      const promises = evmTokenListURLs.map(url => fetch(url));
      // Waiting for all fetch promises to resolve
      const responses = await Promise.all(promises);
      // Extracting JSON data from the responses
      const data: TTokenListResponse[] = await Promise.all(
        responses.map(response => response.json())
      );
      // Flattening the tokens arrays from all responses into a single array
      const allTokens = data.flatMap((item: TTokenListResponse) => item.tokens);
      // Filtering tokens by the specified chainId and removing duplicates by address
      const distinctTokens = Array.from(
        new Map(
          allTokens.filter(t => t.chainId === chainId).map(token => [token.address, token])
        ).values()
      );
      return distinctTokens;
    } catch (error: any) {
      this.logger.error(`Failed to get token metadata list: ${error.message}`);
      return [];
    }
  };

  getMultichainTokenMetadataList = async (): Promise<TContractTokenMetadata[]> => {
    try {
      // Extracting all EVM token list URLs from the constants
      const evmTokenListURLs = Object.values(TOKEN_LIST_URLS);
      // Fetching all token lists simultaneously
      const promises = evmTokenListURLs.map(url => fetch(url));
      // Waiting for all fetch promises to resolve
      const responses = await Promise.all(promises);
      // Extracting JSON data from the responses
      const data: TTokenListResponse[] = await Promise.all(
        responses.map(response => response.json())
      );
      // Flattening the tokens arrays from all responses into a single array
      const allTokens = data.flatMap((item: TTokenListResponse) => item.tokens);
      const distinctTokens = Array.from(
        new Map(allTokens.map(token => [token.address, token])).values()
      );
      return distinctTokens;
    } catch (error: any) {
      this.logger.error(`Failed to get token metadata list: ${error.message}`);
      return [];
    }
  };

  async getTokenMetadataBySymbol(
    tokenSymbol: TTokenSymbol
  ): Promise<TContractTokenMetadata | undefined> {
    const tokenMetadatas = await this.getMultichainTokenMetadataList();
    const metadata = tokenMetadatas.find(
      metadata => metadata.symbol.toLowerCase() === tokenSymbol.toLowerCase()
    );
    return metadata;
  }

  async getTokenMetadataByAddress(
    tokenAddress: TTokenAddress
  ): Promise<TContractTokenMetadata | undefined> {
    const tokenMetadatas = await this.getMultichainTokenMetadataList();
    const metadata = tokenMetadatas.find(
      metadata => metadata.address.toLowerCase() === tokenAddress.toLowerCase()
    );
    return metadata;
  }

  /// The batch size defines the payload size for `Multicall3` contract's `aggregate3` method.
  /// Increasing the batch size reduces the number of RPC calls.
  getBatchLatestTokens = async (
    client: TClient,
    tokenList: TContractTokenMetadata[],
    walletAddress: TAddress,
    config?: Partial<{
      blockNumber: TBlockNumber;
      batchSize: number;
    }>
  ): Promise<TContractToken[]> => {
    try {
      const results = await client.multicall({
        ...config,
        // @ts-ignore
        contracts: tokenList.map(token => ({
          abi: Abis.erc20ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
          address: token.address as TAddress,
        })),
      });

      let tokenIndx = 0;
      const tokenBalanceList: TContractToken[] = [];
      for (const callResult of results) {
        const token = tokenList[tokenIndx];
        if (callResult.status === 'success' && stoi(callResult.result) > 0) {
          const formattedBalance = formatUnits(BigInt(callResult.result || 0), token.decimals);
          tokenBalanceList.push({
            ...token,
            balance: parseFloat(formattedBalance),
          });
        }
        tokenIndx++;
      }
      return tokenBalanceList;
    } catch (error: any) {
      this.logger.error(`Failed to get batch tokens: ${error.message}`);
      return [];
    }
  };

  getTokenBalance = async (
    client: TClient,
    tokenAddress: TAddress,
    walletAddress: TAddress,
    blockNumber?: bigint
  ): Promise<bigint> => {
    try {
      const data = await client.readContract({
        address: tokenAddress,
        abi: Abis.erc20ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
        blockNumber,
      });
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to get token balance: ${error.message}`);
      throw new Error(error);
    }
  };

  getTokenMetadataFromContract = async (
    client: TClient,
    tokenAddress: TAddress
  ): Promise<TContractTokenMetadata> => {
    try {
      const chainId = await client.getChainId();
      const contract: any = getContract({
        address: tokenAddress as TAddress,
        abi: Abis.erc20ABI,
        client: client as any,
      });

      const [name, decimals, symbol] = await Promise.all([
        contract.read.name(),
        contract.read.decimals(),
        contract.read.symbol(),
      ]);

      return {
        chainId,
        address: tokenAddress,
        name,
        symbol,
        decimals,
        type: undefined,
      };
    } catch (error: any) {
      this.logger.error(`Failed to get token contract metadata: ${error.message}`);
      throw new Error(error);
    }
  };
}
