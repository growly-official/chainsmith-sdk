import { getChainByName, getChainIdByName } from '../../../utils/chain.util.ts';
import { EvmTokenPlugin } from '../../../plugins/index.ts';
import type { IMarketDataAdapter, IOnchainTokenAdapter } from '../../../types/adapter.d.ts';
import type { TAddress, TChain, TChainName } from '../../../types/chains.d.ts';
import type {
  TContractToken,
  TContractTokenMetadata,
  TMarketToken,
} from '../../../types/tokens.d.ts';
import type { TShadowGetPoolConfig } from './types.d.ts';
import { Files } from '../../../data/index.ts';
import { createClient } from '../../../wrapper.ts';
import { autoInjectable } from 'tsyringe';
import { Logger } from 'tslog';
import { getContract } from 'viem';
import { ShadowV3Factory } from '../../../data/constants/sonic/shadow.ts';
import { shadowPoolFactoryV3Abi, shadowPoolV3Abi } from '../../../data/abis/index.ts';
import {
  BRIDGED_USDC,
  BRIDGED_USDT,
  WRAPPED_S,
  SONIC_USDC,
  WETH_S,
} from '../../../data/constants/sonic/tokens.ts';
import { isZeroAddress } from '../../../utils/token.util.ts';

const STABLE_COINS = [BRIDGED_USDC, BRIDGED_USDT, SONIC_USDC];

const isStablecoin = (token: TContractTokenMetadata) =>
  !!STABLE_COINS.find(t => t === token.address);

const wrapTokenAddressType = (token: TContractTokenMetadata): TContractTokenMetadata => {
  if (token.type === 'native') return findTokenByAddress(WRAPPED_S);
  // TODO: Dynamic fetching
  if (token.symbol === 'stS') return findTokenByAddress(WRAPPED_S);
  if (token.symbol.includes('ETH')) return findTokenByAddress(WETH_S);
  return token;
};

const findTokenByAddress = (address: string): TContractTokenMetadata => {
  const token = Files.TokenList.SonicShadowExchangeTokenList.tokens.find(t => {
    return t.address.toUpperCase() == address.toUpperCase();
  });
  if (!token) throw new Error('No token found');
  return {
    ...token,
    type: undefined,
    address: token.address as any,
    chainId: getChainIdByName('sonic'),
  };
};

@autoInjectable()
export class ShadowExchangeAdapter implements IOnchainTokenAdapter, IMarketDataAdapter {
  name = 'sonic.ShadowExchangeAdapter';
  logger = new Logger({ name: this.name });

  rpcUrl: string;
  contractTokenMetadatas: TContractTokenMetadata[];

  constructor(private evmPlugin: EvmTokenPlugin) {
    const tokenList = Files.TokenList.SonicShadowExchangeTokenList;
    const chain = getChainByName('sonic');
    this.contractTokenMetadatas = tokenList.tokens.map(token => ({
      ...token,
      address: token.address as any,
      chainId: chain.id,
      type: undefined,
    }));
  }

  listAllOwnedTokens(chain: TChain, address: TAddress): Promise<TContractToken[]> {
    const client = createClient({
      chain,
    });
    return this.evmPlugin.getBatchLatestTokens(client, this.contractTokenMetadatas, address);
  }

  async fetchTokenWithPrice(
    chainName: TChainName,
    token: TContractToken
  ): Promise<TMarketToken | undefined> {
    this.logger.info(`Fetch a token ${token.symbol} price...`);
    const chain = getChainByName(chainName);
    let marketPrice = 0;
    for (const stablecoin of STABLE_COINS) {
      // Try with both directions.
      const stablecoinDetails = findTokenByAddress(stablecoin);
      const tokenDetails = wrapTokenAddressType(token);
      if (isStablecoin(tokenDetails)) {
        marketPrice = 1;
        break;
      }
      try {
        const tokenPairs = [
          {
            tokenIn: stablecoinDetails,
            tokenOut: tokenDetails,
            key: 'priceOfTokenAinB',
          },
          {
            tokenIn: tokenDetails,
            tokenOut: stablecoinDetails,
            key: 'priceOfTokenBinA',
          },
        ];
        for (const { tokenIn, tokenOut, key } of tokenPairs) {
          this.logger.info(
            `Fetch pair ${tokenIn.symbol} (${tokenIn.address}) <> ${tokenOut.symbol} (${tokenOut.address})`
          );
          try {
            const priceResponse = await this.getPriceFromSqrtPriceX96(chain, tokenIn, tokenOut);
            if (priceResponse[key] > 0) {
              marketPrice = priceResponse[key];
              break;
            }
          } catch (error) {
            this.logger.error(`Fails to fetch price from pair: ${error}`);
          }
        }
        if (marketPrice > 0) break;
      } catch (e) {
        continue;
      }
    }
    return {
      ...token,
      usdValue: marketPrice * token.balance,
      marketPrice,
      tags: [],
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

  async getPriceFromSqrtPriceX96(
    chain: TChain,
    tokenIn: TContractTokenMetadata,
    tokenOut: TContractTokenMetadata
  ): Promise<{
    priceOfTokenAinB: number;
    priceofTokenBinA: number;
  }> {
    const client = createClient({
      chain,
    });
    const poolInfo = await this.getPoolInfo(chain, {
      tokenIn,
      tokenOut,
      tickSpacing: 50, // TODO: Investigate the correct ticks
    });
    if (isZeroAddress(poolInfo)) throw new Error('No pool found');
    const poolContract: any = getContract({
      client: client as any,
      address: poolInfo as any,
      abi: shadowPoolV3Abi,
    });
    const slot0 = await poolContract.read.slot0();
    const sqrtPriceX96 = slot0[0];
    return this.sqrtPriceX96ToNumber(sqrtPriceX96, tokenIn.decimals, tokenOut.decimals);
  }

  async getPoolInfo(chain: TChain, config: TShadowGetPoolConfig): Promise<string> {
    this.logger.info(`Get pool info...`);
    try {
      const client = createClient({
        chain,
      });
      const quoterContract: any = getContract({
        client: client as any,
        address: ShadowV3Factory,
        abi: shadowPoolFactoryV3Abi,
      });
      return quoterContract.read.getPool([
        config.tokenIn.address,
        config.tokenOut.address,
        config.tickSpacing,
      ]);
    } catch (error: any) {
      this.logger.error(`Failed to quote token price: ${error.message}`);
      throw new Error(error);
    }
  }

  sqrtPriceX96ToNumber(sqrtPriceX96: bigint, tokenADecimal: number, tokenBDecimal: number) {
    const buyOneOfToken0 =
      (Number(sqrtPriceX96) / 2 ** 96) ** 2 / 10 ** (tokenADecimal - tokenBDecimal);
    const buyOneOfToken1 = 1 / buyOneOfToken0;
    return {
      // Price of token A in value of token B
      priceOfTokenAinB: buyOneOfToken0,
      // Price of token B in value of token A
      priceofTokenBinA: buyOneOfToken1,
    };
  }
}
