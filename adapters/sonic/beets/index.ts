import axios from 'axios';
import { Logger } from 'tslog';
import { autoInjectable } from 'tsyringe';
import type { IYieldAdapter } from '../../../types/adapter.d.ts';
import type { TBeetsStakedSonicMarket, TBeetsStakedSonicResponse } from './types.js';
import { TChainName } from 'types/chains.js';
import { TToken } from 'types/tokens.js';

const BEETS_BASE_URL = 'https://backend-v3.beets-ftm-node.com/';

@autoInjectable()
export class BeetsApiAdapter implements IYieldAdapter {
  name = 'sonic.BeetsApiAdapter';
  logger = new Logger({ name: this.name });

  stsMarket?: TBeetsStakedSonicMarket;

  // TODO
  fetchTokensWithYield(chain: TChainName, tokens: TToken[]) {
    console.log(chain, tokens);
  }

  // Markets
  async getStakedSonicMarket(): Promise<TBeetsStakedSonicMarket> {
    try {
      if (!this.stsMarket) {
        const params = {
          operationName: 'GetStakedSonicData',
          variables: {},
          query: `
          query GetStakedSonicData {
            stsGetGqlStakedSonicData {
              delegatedValidators {
                assetsDelegated
                validatorId
                __typename
              }
              exchangeRate
              stakingApr
              totalAssets
              totalAssetsDelegated
              totalAssetsPool
              rewardsClaimed24h
              __typename
            }
          }
          `,
        };
        const res = await axios.post<TBeetsStakedSonicResponse>(`${BEETS_BASE_URL}`, params, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          },
        });
        return res.data.data.stsGetGqlStakedSonicData;
      }
      return this.stsMarket;
    } catch (error) {
      throw new Error('Failed to get StakedSonic from Beets');
    }
  }
}
