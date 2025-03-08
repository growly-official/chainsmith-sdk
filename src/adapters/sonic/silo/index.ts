import axios from 'axios';
import { Logger } from 'tslog';
import type { IYieldAdapter } from '../../../types/adapter.d';
import type { TAddress, TChainName } from '../../../types/chains.d';
import type { TToken } from '../../../types/tokens.d';
import type { TSiloMarket, TSiloMetrics, TSiloToken, TSiloUserPositions } from './types';

export type * from './types.d.ts';

const SILO_V2_BASE_URL = 'https://v2.silo.finance/api/';

export class SiloV2ApiAdapter implements IYieldAdapter {
  name = 'sonic.SiloV2ApiAdapter';
  logger = new Logger({ name: this.name });

  tokenMap?: Record<string, TSiloToken>;
  markets?: TSiloMarket[];
  userPoolsPositions?: TSiloUserPositions;

  // TODO
  fetchTokensWithYield(_chain: TChainName, _tokens: TToken[]) {
    throw new Error('not implemented');
  }

  // Markets
  async getSiloMarkets(): Promise<TSiloMarket[]> {
    try {
      if (!this.markets) {
        const params = {
          sort: null,
          protocolKey: null,
          isApeMode: false,
          search: null,
          isCurated: true,
        };
        const res = await axios.post(`${SILO_V2_BASE_URL}/display-markets-v2`, params, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          },
        });
        return res.data;
      }
      return this.markets;
    } catch (error) {
      throw new Error(`Failed to get Silo markets: ${error}`);
    }
  }

  async getUserPositions(walletAddress: TAddress): Promise<TSiloUserPositions> {
    try {
      if (!this.userPoolsPositions) {
        const res = await axios.get<TSiloUserPositions>(`${SILO_V2_BASE_URL}/dashboard-v2/${walletAddress}`)
        return res.data;
      }
      return this.userPoolsPositions;
    } catch (error) {
      throw new Error(`Failed to get Silo markets: ${error}`);
    }
  }

  // Metrics
  async getSiloMetrics(): Promise<TSiloMetrics> {
    const res = await axios.get(`${SILO_V2_BASE_URL}/metrics`);
    return res.data;
  }
}
