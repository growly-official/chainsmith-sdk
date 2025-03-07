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

export interface TSonicEcosystemApp {
  description: string;
  telegram: null | string;
  _id: string;
  website: string;
  image: string;
  x: null | string;
  discord: null | string;
  tags: EcosystemTag[];
  title: string;
}

export interface EcosystemTag {
  _type: string;
  label: string;
  _key: string;
  value: string;
}
