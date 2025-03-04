import axios from 'axios';
import { Logger } from 'tslog';
import { autoInjectable } from 'tsyringe';
import type { IYieldAdapter } from '../../../types/adapter.d.ts';
import type { TSiloMarket, TSiloMetrics, TSiloToken } from './types.js';
import { TChainName } from 'types/chains.js';
import { TToken } from 'types/tokens.js';

const SILO_V2_BASE_URL = 'https://v2.silo.finance/api/';

@autoInjectable()
export class SiloV2ApiAdapter implements IYieldAdapter {
  name = 'sonic.SiloV2ApiAdapter';
  logger = new Logger({ name: this.name });

  tokenMap?: Record<string, TSiloToken>;
  markets?: TSiloMarket[];

  // TODO
  fetchTokensWithYield(chain: TChainName, tokens: TToken[]) {
    console.log(chain, tokens);
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
      throw new Error('Failed to get Silo markets');
    }
  }

  // Metrics
  async getSiloMetrics(): Promise<TSiloMetrics> {
    const res = await axios.get(`${SILO_V2_BASE_URL}/metrics`);
    return res.data;
  }
}
