import axios from 'axios';
import { Logger } from 'tslog';
import { autoInjectable } from 'tsyringe';
import type { IYieldAdapter } from '../../../types/adapter.d.ts';
import type { TOriginSonicDailyStat, TOriginSonicResponse } from './types.js';
import { TChainName } from 'types/chains.js';
import { TToken } from 'types/tokens.js';

const ORIGIN_BASE_URL = 'https://origin.squids.live/origin-squid:prod/api/graphql';

@autoInjectable()
export class OriginApiAdapter implements IYieldAdapter {
  name = 'sonic.OriginApiAdapter';
  logger = new Logger({ name: this.name });

  osMarket?: TOriginSonicDailyStat;

  // TODO
  fetchTokensWithYield(chain: TChainName, tokens: TToken[]) {
    console.log(chain, tokens);
  }

  // Markets
  async getStakedSonicMarket(): Promise<TOriginSonicDailyStat> {
    try {
      if (!this.osMarket) {
        const params = {
          variables: {
            chainId: 146, // Sonic
            token: '0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', // Sonic
            limit: 1,
            orderBy: ['timestamp_DESC'],
          },
          query: `
          query oTokenStats(
            $token: String!
            $chainId: Int!
            $limit: Int = 5000
            $orderBy: [OTokenDailyStatOrderByInput!] = [timestamp_DESC]
            $from: DateTime
            $offset: Int = 1
          ) {
            oTokenDailyStats(
              limit: $limit
              offset: $offset
              orderBy: $orderBy
              where: { otoken_eq: $token, chainId_eq: $chainId, timestamp_gte: $from }
            ) {
              ...DailyStat
            }
          }
          fragment DailyStat on OTokenDailyStat {
            id
            blockNumber
            timestamp
            date
            totalSupply
            apy
            apy7
            apy14
            apy30
            rateETH
            rateUSD
            rebasingSupply
            nonRebasingSupply
            wrappedSupply
            amoSupply
            yield
            fees
            dripperWETH
          }
          `,
        };
        const res = await axios.post<TOriginSonicResponse>(`${ORIGIN_BASE_URL}`, params, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          },
        });
        return res.data.data.oTokenDailyStats[0];
      }
      return this.osMarket;
    } catch (error) {
      throw new Error('Failed to get Sonic LST from Origin');
    }
  }
}
