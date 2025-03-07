import axios from 'axios';
import { Logger } from 'tslog';
import type { IYieldAdapter } from '../../../types/adapter.d';
import type { TAddress, TChainName } from '../../../types/chains.d';
import type { TToken } from '../../../types/tokens.d';
import type { TBeetsStakedSonicMarket, TBeetsStakedSonicResponse } from './types';
import type { TBeetsPool, TBeetsPoolsResponse } from './types.d.ts';

const BEETS_BASE_URL = 'https://backend-v3.beets-ftm-node.com/';

export class BeetsApiAdapter implements IYieldAdapter {
  name = 'sonic.BeetsApiAdapter';
  logger = new Logger({ name: this.name });

  stsMarket?: TBeetsStakedSonicMarket;
  pools?: TBeetsPool[];
  userPoolsPositions?: TBeetsPool[];

  // TODO
  fetchTokensWithYield(_chain: TChainName, _tokens: TToken[]) {
    throw new Error('not implemented');
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
      throw new Error(`Failed to get StakedSonic from Beets: ${error}`);
    }
  }

  // LP Pools
  async getPools(limit = 50): Promise<TBeetsPool[]> {
    try {
      if (!this.pools) {
        let offset = 0;
        let total = 0;
        let totalPools: TBeetsPool[] = [];

        do {
          const params = {
            operationName: 'GetPools',
            variables: {
              first: limit,
              skip: offset,
              orderBy: 'totalLiquidity',
              orderDirection: 'desc',
              where: {
                poolTypeIn: [
                  'WEIGHTED',
                  'STABLE',
                  'COMPOSABLE_STABLE',
                  'META_STABLE',
                  'LIQUIDITY_BOOTSTRAPPING',
                  'GYRO',
                  'GYRO3',
                  'GYROE',
                  'COW_AMM',
                  'FX',
                ],
                chainIn: ['SONIC'],
                userAddress: null,
                minTvl: 0,
                tagIn: null,
                tagNotIn: ['BLACK_LISTED'],
              },
              textSearch: null,
            },
            query:
              'query GetPools($first: Int, $skip: Int, $orderBy: GqlPoolOrderBy, $orderDirection: GqlPoolOrderDirection, $where: GqlPoolFilter, $textSearch: String) {\n  pools: poolGetPools(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n    textSearch: $textSearch\n  ) {\n    address\n    chain\n    createTime\n    decimals\n    protocolVersion\n    tags\n    hasErc4626\n    hasNestedErc4626\n    hasAnyAllowedBuffer\n    hook {\n      ...Hook\n      __typename\n    }\n    poolTokens {\n      id\n      address\n      symbol\n      weight\n      name\n      canUseBufferForSwaps\n      useWrappedForAddRemove\n      useUnderlyingForAddRemove\n      nestedPool {\n        id\n        address\n        symbol\n        name\n        tokens {\n          id\n          address\n          symbol\n          weight\n          name\n          canUseBufferForSwaps\n          useWrappedForAddRemove\n          useUnderlyingForAddRemove\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    dynamicData {\n      totalLiquidity\n      lifetimeVolume\n      lifetimeSwapFees\n      volume24h\n      fees24h\n      holdersCount\n      swapFee\n      swapsCount\n      totalShares\n      aprItems {\n        id\n        title\n        apr\n        type\n        rewardTokenSymbol\n        rewardTokenAddress\n        __typename\n      }\n      __typename\n    }\n    staking {\n      id\n      type\n      chain\n      address\n      gauge {\n        id\n        gaugeAddress\n        version\n        status\n        workingSupply\n        otherGauges {\n          gaugeAddress\n          version\n          status\n          id\n          rewards {\n            id\n            tokenAddress\n            rewardPerSecond\n            __typename\n          }\n          __typename\n        }\n        rewards {\n          id\n          rewardPerSecond\n          tokenAddress\n          __typename\n        }\n        __typename\n      }\n      aura {\n        id\n        apr\n        auraPoolAddress\n        auraPoolId\n        isShutdown\n        __typename\n      }\n      __typename\n    }\n    factory\n    id\n    name\n    owner\n    swapFeeManager\n    pauseManager\n    poolCreator\n    symbol\n    type\n    userBalance {\n      totalBalance\n      totalBalanceUsd\n      walletBalance\n      walletBalanceUsd\n      stakedBalances {\n        balance\n        balanceUsd\n        stakingType\n        stakingId\n        __typename\n      }\n      __typename\n    }\n    poolTokens {\n      ...PoolTokens\n      __typename\n    }\n    __typename\n  }\n  count: poolGetPoolsCount(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n    textSearch: $textSearch\n  )\n}\n\nfragment UnderlyingToken on GqlToken {\n  chain\n  chainId\n  address\n  decimals\n  name\n  symbol\n  priority\n  tradable\n  isErc4626\n  logoURI\n  __typename\n}\n\nfragment Erc4626ReviewData on Erc4626ReviewData {\n  reviewFile\n  summary\n  warnings\n  __typename\n}\n\nfragment Hook on GqlHook {\n  address\n  config {\n    enableHookAdjustedAmounts\n    shouldCallAfterAddLiquidity\n    shouldCallAfterInitialize\n    shouldCallAfterRemoveLiquidity\n    shouldCallAfterSwap\n    shouldCallBeforeAddLiquidity\n    shouldCallBeforeInitialize\n    shouldCallBeforeRemoveLiquidity\n    shouldCallBeforeSwap\n    shouldCallComputeDynamicSwapFee\n    __typename\n  }\n  type\n  params {\n    ... on ExitFeeHookParams {\n      exitFeePercentage\n      __typename\n    }\n    ... on FeeTakingHookParams {\n      addLiquidityFeePercentage\n      removeLiquidityFeePercentage\n      swapFeePercentage\n      __typename\n    }\n    ... on StableSurgeHookParams {\n      maxSurgeFeePercentage\n      surgeThresholdPercentage\n      __typename\n    }\n    ... on MevTaxHookParams {\n      mevTaxThreshold\n      mevTaxMultiplier\n      maxMevSwapFeePercentage\n      __typename\n    }\n    __typename\n  }\n  reviewData {\n    reviewFile\n    summary\n    warnings\n    __typename\n  }\n  __typename\n}\n\nfragment PoolTokens on GqlPoolTokenDetail {\n  id\n  chain\n  chainId\n  address\n  decimals\n  name\n  symbol\n  priority\n  tradable\n  canUseBufferForSwaps\n  useWrappedForAddRemove\n  useUnderlyingForAddRemove\n  index\n  balance\n  balanceUSD\n  priceRate\n  decimals\n  weight\n  hasNestedPool\n  isAllowed\n  priceRateProvider\n  logoURI\n  priceRateProviderData {\n    address\n    name\n    summary\n    reviewed\n    warnings\n    upgradeableComponents {\n      entryPoint\n      implementationReviewed\n      __typename\n    }\n    reviewFile\n    factory\n    __typename\n  }\n  nestedPool {\n    id\n    address\n    type\n    bptPriceRate\n    nestedPercentage\n    nestedShares\n    totalLiquidity\n    totalShares\n    tokens {\n      index\n      address\n      decimals\n      balance\n      balanceUSD\n      symbol\n      weight\n      isErc4626\n      canUseBufferForSwaps\n      useWrappedForAddRemove\n      useUnderlyingForAddRemove\n      logoURI\n      underlyingToken {\n        ...UnderlyingToken\n        __typename\n      }\n      erc4626ReviewData {\n        ...Erc4626ReviewData\n        __typename\n      }\n      __typename\n    }\n    hook {\n      ...Hook\n      __typename\n    }\n    __typename\n  }\n  isErc4626\n  isBufferAllowed\n  underlyingToken {\n    ...UnderlyingToken\n    __typename\n  }\n  erc4626ReviewData {\n    ...Erc4626ReviewData\n    __typename\n  }\n  __typename\n}',
          };
          const res = await axios.post<TBeetsPoolsResponse>(`${BEETS_BASE_URL}`, params, {
            headers: {
              'Content-Type': 'application/json',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            },
          });

          const pools = res.data.data.pools;
          const count = res.data.data.count;

          total = count;

          totalPools = totalPools.concat(pools);

          offset += limit;
        } while (offset < total);

        return totalPools;
      }
      return this.pools;
    } catch (error) {
      throw new Error(`Failed to get liquidity pools from Beets: ${error}`);
    }
  }

  async getUserPoolsPositions(walletAddress: TAddress): Promise<TBeetsPool[]> {
    try {
      if (!this.userPoolsPositions) {
        const params = {
          operationName: 'GetPools',
          variables: {
            where: {
              userAddress: walletAddress,
              chainIn: ['SONIC'], // Supports OPTIMISM but hardcoded for Sonic-only for now
            },
          },
          query:
            'query GetPools($first: Int, $skip: Int, $orderBy: GqlPoolOrderBy, $orderDirection: GqlPoolOrderDirection, $where: GqlPoolFilter, $textSearch: String) {\n  pools: poolGetPools(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n    textSearch: $textSearch\n  ) {\n    address\n    chain\n    createTime\n    decimals\n    protocolVersion\n    tags\n    hasErc4626\n    hasNestedErc4626\n    hasAnyAllowedBuffer\n    hook {\n      ...Hook\n      __typename\n    }\n    poolTokens {\n      id\n      address\n      symbol\n      weight\n      name\n      canUseBufferForSwaps\n      useWrappedForAddRemove\n      useUnderlyingForAddRemove\n      nestedPool {\n        id\n        address\n        symbol\n        name\n        tokens {\n          id\n          address\n          symbol\n          weight\n          name\n          canUseBufferForSwaps\n          useWrappedForAddRemove\n          useUnderlyingForAddRemove\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    dynamicData {\n      totalLiquidity\n      lifetimeVolume\n      lifetimeSwapFees\n      volume24h\n      fees24h\n      holdersCount\n      swapFee\n      swapsCount\n      totalShares\n      aprItems {\n        id\n        title\n        apr\n        type\n        rewardTokenSymbol\n        rewardTokenAddress\n        __typename\n      }\n      __typename\n    }\n    staking {\n      id\n      type\n      chain\n      address\n      gauge {\n        id\n        gaugeAddress\n        version\n        status\n        workingSupply\n        otherGauges {\n          gaugeAddress\n          version\n          status\n          id\n          rewards {\n            id\n            tokenAddress\n            rewardPerSecond\n            __typename\n          }\n          __typename\n        }\n        rewards {\n          id\n          rewardPerSecond\n          tokenAddress\n          __typename\n        }\n        __typename\n      }\n      aura {\n        id\n        apr\n        auraPoolAddress\n        auraPoolId\n        isShutdown\n        __typename\n      }\n      __typename\n    }\n    factory\n    id\n    name\n    owner\n    swapFeeManager\n    pauseManager\n    poolCreator\n    symbol\n    type\n    userBalance {\n      totalBalance\n      totalBalanceUsd\n      walletBalance\n      walletBalanceUsd\n      stakedBalances {\n        balance\n        balanceUsd\n        stakingType\n        stakingId\n        __typename\n      }\n      __typename\n    }\n    poolTokens {\n      ...PoolTokens\n      __typename\n    }\n    __typename\n  }\n  count: poolGetPoolsCount(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n    textSearch: $textSearch\n  )\n}\n\nfragment UnderlyingToken on GqlToken {\n  chain\n  chainId\n  address\n  decimals\n  name\n  symbol\n  priority\n  tradable\n  isErc4626\n  logoURI\n  __typename\n}\n\nfragment Erc4626ReviewData on Erc4626ReviewData {\n  reviewFile\n  summary\n  warnings\n  __typename\n}\n\nfragment Hook on GqlHook {\n  address\n  config {\n    enableHookAdjustedAmounts\n    shouldCallAfterAddLiquidity\n    shouldCallAfterInitialize\n    shouldCallAfterRemoveLiquidity\n    shouldCallAfterSwap\n    shouldCallBeforeAddLiquidity\n    shouldCallBeforeInitialize\n    shouldCallBeforeRemoveLiquidity\n    shouldCallBeforeSwap\n    shouldCallComputeDynamicSwapFee\n    __typename\n  }\n  type\n  params {\n    ... on ExitFeeHookParams {\n      exitFeePercentage\n      __typename\n    }\n    ... on FeeTakingHookParams {\n      addLiquidityFeePercentage\n      removeLiquidityFeePercentage\n      swapFeePercentage\n      __typename\n    }\n    ... on StableSurgeHookParams {\n      maxSurgeFeePercentage\n      surgeThresholdPercentage\n      __typename\n    }\n    ... on MevTaxHookParams {\n      mevTaxThreshold\n      mevTaxMultiplier\n      maxMevSwapFeePercentage\n      __typename\n    }\n    __typename\n  }\n  reviewData {\n    reviewFile\n    summary\n    warnings\n    __typename\n  }\n  __typename\n}\n\nfragment PoolTokens on GqlPoolTokenDetail {\n  id\n  chain\n  chainId\n  address\n  decimals\n  name\n  symbol\n  priority\n  tradable\n  canUseBufferForSwaps\n  useWrappedForAddRemove\n  useUnderlyingForAddRemove\n  index\n  balance\n  balanceUSD\n  priceRate\n  decimals\n  weight\n  hasNestedPool\n  isAllowed\n  priceRateProvider\n  logoURI\n  priceRateProviderData {\n    address\n    name\n    summary\n    reviewed\n    warnings\n    upgradeableComponents {\n      entryPoint\n      implementationReviewed\n      __typename\n    }\n    reviewFile\n    factory\n    __typename\n  }\n  nestedPool {\n    id\n    address\n    type\n    bptPriceRate\n    nestedPercentage\n    nestedShares\n    totalLiquidity\n    totalShares\n    tokens {\n      index\n      address\n      decimals\n      balance\n      balanceUSD\n      symbol\n      weight\n      isErc4626\n      canUseBufferForSwaps\n      useWrappedForAddRemove\n      useUnderlyingForAddRemove\n      logoURI\n      underlyingToken {\n        ...UnderlyingToken\n        __typename\n      }\n      erc4626ReviewData {\n        ...Erc4626ReviewData\n        __typename\n      }\n      __typename\n    }\n    hook {\n      ...Hook\n      __typename\n    }\n    __typename\n  }\n  isErc4626\n  isBufferAllowed\n  underlyingToken {\n    ...UnderlyingToken\n    __typename\n  }\n  erc4626ReviewData {\n    ...Erc4626ReviewData\n    __typename\n  }\n  __typename\n}',
        };

        const res = await axios.post<TBeetsPoolsResponse>(`${BEETS_BASE_URL}`, params, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          },
        });

        if (!res.data || !res.data.data) return [];

        return res.data.data.pools;
      }

      return this.userPoolsPositions;
    } catch (error) {
      throw new Error(`Failed to get liquidity pools from Beets: ${error}`);
    }
  }
}
