import { Logger } from 'tslog';
import axios from 'axios';
import type { TSonicEcosystemApp, TSonicUserPointsStats } from './types';
import { Constants, Files } from '../../data';

const OPENBLOCK_ENDPOINT = 'https://www.data-openblocklabs.com';

export class SonicPointPlugin {
  logger = new Logger({ name: 'SonicPointPlugin' });

  async fetchUserPointsStats(walletAddress: string): Promise<TSonicUserPointsStats> {
    this.logger.info('Fetch Sonic user points stats:', walletAddress);
    const url = `${OPENBLOCK_ENDPOINT}/sonic/user-points-stats?wallet_address=${walletAddress}`;
    try {
      const res = await axios.get<TSonicUserPointsStats>(url);

      if (res.data) return res.data;

      return {
        user_activity_last_detected: '',
        wallet_address: walletAddress,
        sonic_points: 0,
        loyalty_multiplier: 0,
        ecosystem_points: 0,
        passive_liquidity_points: 0,
        active_liquidity_points: 0,
        rank: 0,
      };
    } catch (error: any) {
      throw new Error('Error getting Sonic points', error);
    }
  }

  getSonicActivePointApps(): TSonicEcosystemApp[] {
    return Files.EcosystemList.SonicEcosystemList.data.filter(app => {
      return Constants.Sonic.SONIC_ACTIVE_POINTS_APPS.includes(app._id);
    });
  }
}
