import type { IYieldAdapter } from '../../../types/adapter.d'
import type { TChainName } from '../../../types/chains.d'
import type { TToken } from '../../../types/tokens.d'
import type { TBeetsStakedSonicMarket, TBeetsStakedSonicResponse } from './types'
import axios from 'axios'
import { Logger } from 'tslog'

const BEETS_BASE_URL = 'https://backend-v3.beets-ftm-node.com/'

export class BeetsApiAdapter implements IYieldAdapter {
  name = 'sonic.BeetsApiAdapter'
  logger = new Logger({ name: this.name })

  stsMarket?: TBeetsStakedSonicMarket

  // TODO
  fetchTokensWithYield(_chain: TChainName, _tokens: TToken[]) {
    throw new Error('not implemented')
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
        }
        const res = await axios.post<TBeetsStakedSonicResponse>(`${BEETS_BASE_URL}`, params, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          },
        })
        return res.data.data.stsGetGqlStakedSonicData
      }
      return this.stsMarket
    }
    catch (error) {
      throw new Error(`Failed to get StakedSonic from Beets: ${error}`)
    }
  }
}
