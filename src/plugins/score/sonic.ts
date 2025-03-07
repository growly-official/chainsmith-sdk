import { Logger } from 'tslog';

const OPENBLOCK_ENDPOINT = 'https://www.data-openblocklabs.com';

export interface TSonicUserPointsStats {
  user_activity_last_detected: string;
  wallet_address: string;
  sonic_points: number;
  loyalty_multiplier: number;
  ecosystem_points: number;
  passive_liquidity_points: number;
  active_liquidity_points: number;
  rank: number;
}

export class SonicPointPlugin {
  logger = new Logger({ name: 'SonicPointPlugin' });

  async fetchUserPointsStats(walletAddress: string): Promise<TSonicUserPointsStats> {
    this.logger.info('Fetch Sonic user points stats:', walletAddress);
    const url = `${OPENBLOCK_ENDPOINT}/sonic/user-points-stats?wallet_address=${walletAddress}`;
    try {
      const data: TSonicUserPointsStats = await fetch(url)
        .then(res => res.json() as any)
        .catch(console.error);
      return data;
    } catch (error) {
      console.error(error);
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
    }
  }
}
