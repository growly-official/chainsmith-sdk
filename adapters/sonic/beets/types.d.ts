export interface TBeetsStakedSonicResponse {
  data: {
    stsGetGqlStakedSonicData: TBeetsStakedSonicMarket;
  };
}

export interface TBeetsStakedSonicMarket {
  delegatedValidators: DelegatedValidator[];
  exchangeRate: string;
  stakingApr: string;
  totalAssets: string;
  totalAssetsDelegated: string;
  totalAssetsPool: string;
  rewardsClaimed24h: string;
  __typename: string;
}

export interface DelegatedValidator {
  assetsDelegated: string;
  validatorId: string;
  __typename: string;
}
