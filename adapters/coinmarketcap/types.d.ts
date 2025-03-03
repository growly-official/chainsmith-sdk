export type TCMCTokenDetail = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  date_added: string;
  tags: string[];
  infinite_supply: boolean;
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
  tvl_ratio: any;
  last_updated: string;
  cmc_rank: number;
  quote: { USD: TCMCUSDPrice };
};

export type TCMCUSDPrice = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: any;
  last_updated: string;
};

export type TCMCTokenIDDetail = {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: number;
  first_historical_data: string;
  last_historical_data: string;
  platform: any;
};

export type TCMCDetailMap = { status: any; data: Record<string, TCMCTokenDetail> };
export type TCMCStaticMap = { status: any; data: TCMCTokenIDDetail[] };
