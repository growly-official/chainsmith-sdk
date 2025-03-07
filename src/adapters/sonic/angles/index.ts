import type { IYieldAdapter } from '../../../types/adapter.d';
import type { TChainName } from '../../../types/chains.d';
import type { TToken } from '../../../types/tokens.d';
import type { TAnglesAPY, TAnglesMarket, TAnglesTVL } from './types';
import axios from 'axios';
import { Logger } from 'tslog';

const ANGLES_BASE_URL = 'https://be.angles.fi/api/v2';

export class AnglesApiAdapter implements IYieldAdapter {
  name = 'sonic.AnglesApiAdapter';
  logger = new Logger({ name: this.name });

  anglesMarket?: TAnglesMarket;

  // TODO
  fetchTokensWithYield(_chain: TChainName, _tokens: TToken[]) {
    throw new Error('not implemented');
  }

  // Market
  async getAnglesMarket(): Promise<TAnglesMarket> {
    const apyRange = [1, 7, 30];
    try {
      if (!this.anglesMarket) {
        const tvlRes = await axios.get<TAnglesTVL>(`${ANGLES_BASE_URL}/angles/tvl`);
        const trailingApy: number[] = [];
        for (const trailingDay of apyRange) {
          const apyRes = await axios.get<TAnglesAPY>(
            `${ANGLES_BASE_URL}/angles/apr/trailing/${trailingDay}`
          );
          trailingApy.push(Number.parseFloat(apyRes.data.apy));
        }

        return {
          s: Number.parseFloat(tvlRes.data.s),
          usd: Number.parseFloat(tvlRes.data.usd),
          apy: trailingApy[0],
          apy7: trailingApy[1],
          apy30: trailingApy[2],
        };
      }
      return this.anglesMarket;
    } catch (error) {
      throw new Error(`Failed to get Sonic LST from Angles: ${error}`);
    }
  }
}
