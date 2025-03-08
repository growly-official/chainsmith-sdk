import 'reflect-metadata';
import { initChainsmithSdk } from '..';
import { multiple } from '../adapters';
import { Wallets } from '../data';
import type { TAddress, TChainName, TMarketTokenList, TMultichain, TNftBalance } from '../types';
import { buildChainsWithCustomRpcUrls } from '../utils';
import { AdapterRegistry, buildDefaultChains } from './config';

const chains = buildDefaultChains(['base', 'mainnet', 'optimism']);
const sdk = initChainsmithSdk(chains);

function testExternalities(enabled: boolean, f: () => Promise<any>) {
  if (enabled) f().then(console.log);
}

async function fetchMultichainTokenList() {
  const wallets: Record<TAddress, TMultichain<TMarketTokenList>> = {};
  for (const wallet of [Wallets.ETH_MAINNET_WALLET_PCMINH]) {
    const portfolio = await sdk.portfolio.getMultichainMarketTokenList([
      AdapterRegistry.CoinMarketcap,
      AdapterRegistry.Alchemy,
    ])(wallet);
    wallets[wallet] = portfolio;
  }
  return wallets;
}

async function fetchEvmscanTokenActivitiesWorks() {
  sdk.storage.writeToRam('walletAddress', Wallets.ETH_MAINNET_WALLET_PCMINH);
  const tokenTransferActivities = await sdk.token.listMultichainTokenTransferActivities(
    AdapterRegistry.Evmscan
  )();
  return tokenTransferActivities;
}

async function fetchDexScreenerParis() {
  return AdapterRegistry.DexScreener.fetchDexScreenerData(
    '0xBAa5CC21fd487B8Fcc2F632f3F4E8D37262a0842'
  );
}

async function fetchMultichainTokenPortfolio() {
  const portfolio = await sdk.portfolio.getMultichainTokenPortfolio([
    AdapterRegistry.CoinMarketcap,
    AdapterRegistry.Alchemy,
  ])(Wallets.ETH_MAINNET_WALLET_JESSE);
  return portfolio;
}

async function fetchChainlistMetadata() {
  const metadataList = await sdk.evmChain.getAllChainMetadata();
  return metadataList;
}

async function fetchSonicChainData() {
  const chains = buildChainsWithCustomRpcUrls({ sonic: 'https://rpc.soniclabs.com' }, 'evm');
  const sdk = initChainsmithSdk(chains);
  const ownedTokens = await sdk.token.listChainOwnedTokens(AdapterRegistry.ShadowExchange)(
    Wallets.SONIC_WALLET_CHUNGTIN
  );
  console.log(ownedTokens);

  const portfolio = await sdk.portfolio.getTokenPortfolio([
    multiple([AdapterRegistry.ShadowExchangeApi, AdapterRegistry.CoinMarketcap]),
    AdapterRegistry.ShadowExchange,
  ])(Wallets.SONIC_WALLET_CHUNGTIN);
  console.log(portfolio);

  const points = await sdk.sonicPoint.fetchUserPointsStats(Wallets.SONIC_WALLET_BEETS_TREASURY);
  console.log(points);
}

async function fetchNFTData() {
  const chains = buildChainsWithCustomRpcUrls({ sonic: 'https://rpc.soniclabs.com' }, 'evm');
  const sdk = initChainsmithSdk(chains);

  let collectibles: TNftBalance[] = [];

  const sonicCollectibles = await sdk.token.getNftCollectibles(AdapterRegistry.PaintSwap)(
    'sonic',
    Wallets.ETH_MAINNET_WALLET_PCMINH
  );
  collectibles = collectibles.concat(sonicCollectibles);

  const evmChains: TChainName[] = ['base', 'mainnet', 'optimism'];
  for (const chain of evmChains) {
    const evmCollectibles = await sdk.token.getNftCollectibles(AdapterRegistry.Reservoir)(
      chain,
      Wallets.ETH_MAINNET_WALLET_PCMINH
    );
    collectibles = collectibles.concat(evmCollectibles);
  }
  return collectibles;
}

async function fetchSonicDapp() {
  // const markets = await AdapterRegistry.SiloV2Api.getSiloMarkets();
  // console.log(markets[0]);

  // const vaults = await AdapterRegistry.MetropolisApi.getVaults(146);
  // console.log(vaults[0]);

  // const sts = await AdapterRegistry.BeetsApi.getStakedSonicMarket();
  // console.log(sts);

  const beetsPools = await AdapterRegistry.BeetsApi.getUserPoolsPositions(
    Wallets.SONIC_WALLET_PCMINH
  );
  console.log(beetsPools.length);
  console.log(beetsPools[0]);

  // const os = await AdapterRegistry.OriginApi.getStakedSonicMarket();
  // console.log(os);

  const ans = await AdapterRegistry.AnglesApi.getAnglesMarket();
  console.log(ans);
}

testExternalities(false, fetchMultichainTokenPortfolio);
testExternalities(false, fetchMultichainTokenList);
testExternalities(false, fetchEvmscanTokenActivitiesWorks);
testExternalities(false, fetchDexScreenerParis);
testExternalities(false, fetchChainlistMetadata);
testExternalities(true, fetchSonicChainData);
testExternalities(false, fetchNFTData);
testExternalities(false, fetchSonicDapp);
