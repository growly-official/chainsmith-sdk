import axios from 'axios';
import { Files } from '../../data/index.ts';
import { Logger } from 'tslog';
import { autoInjectable } from 'tsyringe';
import { intoChainTokenAddressMap } from '../../utils/token.util.ts';
import type {
  TChainId,
  TChainName,
  TContractTokenMetadata,
  TMarketToken,
  TToken,
  TTokenId,
  TTokenSymbol,
} from '../../types/index.d.ts';
import type {
  TCMCDetailMap,
  TCMCStaticMap,
  TCMCTokenDetail,
  TCMCTokenIDDetail,
  TCMCUSDPrice,
} from './types.d.ts';
import type { IMarketDataAdapter } from '../../types/adapter.d.ts';
import { getChainByName } from '../../utils/chain.util.ts';

// Some tokens have a conflict symbol with others, like Ethereum and The Inifinite Garden.
const NATIVE_TOKEN_MAP = {
  ETH: {
    id: 1027,
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    slug: 'ethereum',
    is_active: 1,
    first_historical_data: '2015-08-07T14:45:00.000Z',
    last_historical_data: '2024-10-16T13:35:00.000Z',
    platform: null,
  },
};

@autoInjectable()
export class CoinMarketcapAdapter implements IMarketDataAdapter {
  name = 'CoinMarketcapAdapter';
  logger = new Logger({ name: this.name });

  apiUrl: string;
  apiKey: string;
  tokenSymbolMap: Record<TTokenSymbol, TCMCTokenIDDetail>;
  chainTokenMap: Record<TChainId, Record<TTokenSymbol, TContractTokenMetadata>>;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.tokenSymbolMap = this.intoTokenSymbolMap(Files.TokenList.CoinMarketcapTokenList as any);
    this.chainTokenMap = intoChainTokenAddressMap([
      Files.TokenList.UniswapTokenList as any,
      Files.TokenList.SuperchainTokenList as any,
    ]);
  }

  async fetchTokenWithPrice(
    chainName: TChainName,
    token: TToken
  ): Promise<TMarketToken<TCMCUSDPrice> | undefined> {
    this.logger.info(`fetchTokenWithPrice: ${chainName}, ${token}`);
    const chain = getChainByName(chainName);
    const tokenSymbolMap = this.getTokenSymbolMap([token]);
    const prices = await this.getTokenPriceMap(
      Object.values(tokenSymbolMap).map(value => value.id)
    );
    const cmcTokenDetail = tokenSymbolMap[token.symbol];
    if (!cmcTokenDetail) return undefined;

    const tokenPriceData = prices[cmcTokenDetail.id];
    const price = tokenPriceData.quote.USD.price;
    const usdValue = price * token.balance;
    const tokenData: TMarketToken<TCMCUSDPrice> = {
      ...token,
      usdValue,
      marketPrice: price,
      extra: tokenPriceData.quote.USD,
      tags: tokenPriceData.tags,
      date_added: tokenPriceData.date_added,
      marketRank: tokenPriceData.cmc_rank,
    };

    if ('address' in token) {
      tokenData.logoURI = this.chainTokenMap[chain.id]?.[token.address]?.logoURI;
    }

    return tokenData;
  }

  // Get token USD values from CoinMarketcap adapter.
  fetchTokensWithPrice = async (
    chainName: TChainName,
    tokens: TToken[]
  ): Promise<{ tokens: TMarketToken<TCMCUSDPrice>[]; totalUsdValue: number }> => {
    this.logger.info(
      `fetchTokensWithPrice: ${chainName}, ${tokens.map(token => token.symbol).join(',')}`
    );
    const chain = getChainByName(chainName);
    const tokenSymbolMap = this.getTokenSymbolMap(tokens);
    const prices = await this.getTokenPriceMap(
      Object.values(tokenSymbolMap).map(value => value.id)
    );

    // Map token with its USD value.
    let totalUsdValue = 0;
    const marketTokens: TMarketToken[] = [];
    for (const token of tokens) {
      const cmcTokenDetail = tokenSymbolMap[token.symbol];
      if (!cmcTokenDetail) {
        continue;
      }

      const tokenPriceData = prices[cmcTokenDetail.id];
      const usd = tokenPriceData.quote.USD;
      const usdValue = usd.price * token.balance;
      totalUsdValue += usdValue;

      const tokenData: TMarketToken<TCMCUSDPrice> = {
        ...token,
        usdValue,
        marketPrice: usd.price,
        extra: tokenPriceData.quote.USD,
        tags: tokenPriceData.tags,
        date_added: tokenPriceData.date_added,
        marketRank: tokenPriceData.cmc_rank,
      };

      if ('address' in token) {
        const logo = this.chainTokenMap[chain.id]?.[token.address]?.logoURI;
        if (logo) tokenData.logoURI = logo;
      }

      marketTokens.push(tokenData);
    }
    return {
      tokens: marketTokens,
      totalUsdValue,
    };
  };

  // Map symbol to CoinMarketCap coin details.
  intoTokenSymbolMap = (m: TCMCStaticMap) => {
    const cmcTokenIdList = m.data;
    const result: Record<TTokenSymbol, TCMCTokenIDDetail> = {};
    for (const token of cmcTokenIdList) {
      result[token.symbol] = token;
    }
    return result;
  };

  getTokenSymbolMap = (tokens: TToken[]): Record<TTokenSymbol, TCMCTokenIDDetail> => {
    try {
      const tokenIdMap: Record<string, TCMCTokenIDDetail> = {};
      for (const token of tokens) {
        const tokenSymbol = token.symbol;
        const nativeToken = (NATIVE_TOKEN_MAP as any)[token.symbol];
        if (token.type === 'native' && nativeToken) {
          tokenIdMap[tokenSymbol] = nativeToken;
        } else {
          const cmcToken = this.tokenSymbolMap[tokenSymbol];
          if (!cmcToken) continue;
          tokenIdMap[tokenSymbol] = this.tokenSymbolMap[tokenSymbol];
        }
      }
      return tokenIdMap;
    } catch (error: any) {
      this.logger.error(`Failed to get token symbol map: ${error.message}`);
      throw new Error(error);
    }
  };

  getTokenPriceMap = async (tokenIds: TTokenId[]): Promise<Record<TTokenId, TCMCTokenDetail>> => {
    this.logger.info(`getTokenPriceMap: ${tokenIds.join(',')}`);
    try {
      if (tokenIds.length == 0) return {};
      const query = `id=${tokenIds.join(',')}&aux=tags,date_added,cmc_rank`;
      const res = await axios.get<TCMCDetailMap>(
        `${this.apiUrl}/v1/cryptocurrency/quotes/latest?${query}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'PostmanRuntime/7.40.0',
            'X-CMC_PRO_API_KEY': this.apiKey,
          },
        }
      );
      return res.data.data;
    } catch (error: any) {
      this.logger.error(`Failed to get price map: ${error.message}`);
      throw new Error(error);
    }
  };
}
