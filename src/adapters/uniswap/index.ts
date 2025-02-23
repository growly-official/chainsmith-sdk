import { Logger } from 'tslog';
import type { TUniswapGetPoolConfig, TUniswapQuoteConfig } from './types.d.ts';
import type {
  TContractToken,
  TMarketToken,
  TChainId,
  TChainName,
  TChain,
  TTokenAddress,
  TTokenSymbol,
  TContractTokenMetadata,
} from '../../types/index.d.ts';
import { Files } from '../../data/index.ts';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json' with { type: 'json' };
import type { IMarketDataAdapter } from '../../types/adapter.d.ts';
import { CHAIN_TO_ADDRESSES_MAP, Token, WETH9 } from '@uniswap/sdk-core';
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk';
import { type GetChainRpcEndpoint } from '../../rpc/index.ts';
import { getChainByName, getChainIdByName } from '../../utils/chain.util.ts';
import { createClient, formatUnits, getContract, http } from 'viem';
import { UniswapV3PoolAbi } from '../../data/abis/index.ts';
import { autoInjectable } from 'tsyringe';
import {
  intoChainTokenAddressMap,
  intoChainTokenSymbolMap,
  fromReadableAmount,
} from '../../utils/token.util.ts';

const wrapUniswapTokenType = (token: TContractTokenMetadata) => {
  if (token.symbol === 'ETH') return WETH9[token.chainId];
  return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
};

@autoInjectable()
export class UniswapSdkAdapter implements IMarketDataAdapter {
  name = 'UniswapSdkAdapater';
  logger = new Logger({ name: this.name });

  getRpcUrl: GetChainRpcEndpoint;
  chainTokenAddressMap: Record<TChainId, Record<TTokenAddress, TContractTokenMetadata>>;
  chainTokenSymbolMap: Record<TChainId, Record<TTokenSymbol, TContractTokenMetadata>>;

  constructor(getRpcUrl: GetChainRpcEndpoint) {
    // TODO: Call API EVMPlugin/getTokenMetadataList instead of using static list
    const tokenList = [
      Files.TokenList.UniswapTokenList as any,
      Files.TokenList.SuperchainTokenList as any,
    ];
    this.chainTokenAddressMap = intoChainTokenAddressMap(tokenList);
    this.chainTokenSymbolMap = intoChainTokenSymbolMap(tokenList);
    this.getRpcUrl = getRpcUrl;
  }

  async fetchTokenWithPrice(
    chainName: TChainName,
    token: TContractToken
  ): Promise<TMarketToken | undefined> {
    const chain = getChainByName(chainName);
    if (!chain) throw new Error('No chain found');
    const rpc = this.getRpcUrl(chain);

    const USDC = this.chainTokenSymbolMap[chain.id]['USDC'];
    if (!USDC) return undefined;

    const price = await this.quote(chain, rpc, {
      amountIn: 1,
      in: wrapUniswapTokenType(USDC),
      out: wrapUniswapTokenType(token),
      poolFee: FeeAmount.MEDIUM,
    });
    return {
      ...token,
      usdValue: token.balance * price,
      marketPrice: price,
      tags: [],
      date_added: '',
    };
  }

  async fetchTokensWithPrice(
    chainName: TChainName,
    tokens: TContractToken[]
  ): Promise<{ tokens: TMarketToken[]; totalUsdValue: number }> {
    this.logger.info('Fetch token prices...');

    let totalUsdValue = 0;
    const marketTokens: TMarketToken[] = [];
    for (const token of tokens) {
      const marketToken = await this.fetchTokenWithPrice(chainName, token);
      const usdValue = marketToken.usdValue;
      totalUsdValue += usdValue;
      marketTokens.push(marketToken);
    }
    return {
      tokens: marketTokens,
      totalUsdValue,
    };
  }

  getTokenAddressMap = (
    chainName: TChainName,
    tokens: TContractToken[]
  ): Record<TTokenAddress, TContractTokenMetadata> => {
    try {
      const tokenAddresses = tokens.map(token => token.address);
      const chainId = getChainIdByName(chainName);

      const result: Record<TTokenAddress, TContractTokenMetadata> = {};
      for (const tokenAddress of tokenAddresses) {
        const tokenDetail = this.chainTokenAddressMap[chainId][tokenAddress];
        if (!tokenDetail) continue;
        result[tokenAddress] = tokenDetail;
      }
      return result;
    } catch (error: any) {
      this.logger.error(`Failed to get token address map: ${error.message}`);
      throw new Error(error);
    }
  };

  async getPool(
    chain: TChain,
    rpcUrl: string,
    params: TUniswapGetPoolConfig
  ): Promise<{
    token0: string;
    token1: string;
    fee: number;
  }> {
    try {
      const client = createClient({
        chain,
        transport: http(rpcUrl),
        batch: {
          multicall: true,
        },
      });
      const currentPoolAddress = computePoolAddress({
        factoryAddress: (CHAIN_TO_ADDRESSES_MAP as any)[chain.id]?.v3CoreFactoryAddress,
        tokenA: params.in,
        tokenB: params.out,
        fee: params.poolFee,
      });

      const poolContract: any = getContract({
        client,
        address: currentPoolAddress as any,
        abi: UniswapV3PoolAbi,
      });

      const [token0, token1, fee]: any[] = await Promise.all([
        poolContract.read.token0(),
        poolContract.read.token1(),
        poolContract.read.fee(),
      ]);

      return {
        token0,
        token1,
        fee,
      };
    } catch (error: any) {
      throw new Error(`Failed to get pool constants: ${error.message}`);
    }
  }

  async quote(chain: TChain, rpcUrl: string, config: TUniswapQuoteConfig): Promise<number> {
    try {
      if (config.out.symbol === 'USDC') return 1;
      const client = createClient({
        chain,
        transport: http(rpcUrl),
        batch: {
          multicall: true,
        },
      });
      const quoterContract: any = getContract({
        client,
        address: (CHAIN_TO_ADDRESSES_MAP as any)[chain.id]?.quoterAddress as any,
        abi: Quoter.abi,
      });
      const poolConstants = await this.getPool(chain, rpcUrl, config);
      const quotedAmountOut: any = await quoterContract.read.quoteExactInputSingle([
        poolConstants.token0,
        poolConstants.token1,
        poolConstants.fee,
        fromReadableAmount(config.amountIn, config.in.decimals).toString(),
        0,
      ]);
      const result = formatUnits(quotedAmountOut, config.out.decimals);
      const parsedResult = parseFloat(result as any);
      return parsedResult > 0 ? 1 / parsedResult : parsedResult;
    } catch (error: any) {
      this.logger.error(`Failed to quote token price: ${error.message}`);
      throw new Error(error);
    }
  }
}
