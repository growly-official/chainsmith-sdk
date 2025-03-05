import 'reflect-metadata';
import { AdapterRegistry, buildDefaultChains } from './config.ts';
import { Wallets } from '../data/index.ts';
import { ChainsmithSdk } from '../index.ts';
import { buildChainsWithCustomRpcUrls } from '../utils/chain.util.ts';
import { multiple } from '../adapters/index.ts';
import type { TNftBalance } from 'types/nfts.d.ts';
import type { TChainName } from 'types/chains.d.ts';

const chains = buildDefaultChains(['base', 'mainnet', 'optimism']);
const sdk = ChainsmithSdk.init(chains);

function testExternalities(enabled: boolean, f: () => Promise<any>) {
  if (enabled) f().then(console.log);
}

async function fetchMultichainTokenList() {
  const wallets = {};
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
  const sdk = ChainsmithSdk.init(chains);
  // const ownedTokens = await sdk.token.listChainOwnedTokens(AdapterRegistry.ShadowExchange)(
  //   Wallets.SONIC_WALLET_BEETS_TREASURY
  // );
  // console.log(ownedTokens);

  const portfolio = await sdk.portfolio.getTokenPortfolio([
    multiple([AdapterRegistry.ShadowExchangeApi, AdapterRegistry.CoinMarketcap]),
    AdapterRegistry.ShadowExchange,
  ])(Wallets.SONIC_WALLET_BEETS_TREASURY);
  console.log(portfolio);

  const points = await sdk.sonicPoint.fetchUserPointsStats(Wallets.SONIC_WALLET_BEETS_TREASURY);
  console.log(points);
}

async function fetchNFTData() {
  let collectibles: TNftBalance[] = [];

  const sonicCollectibles = await AdapterRegistry.PaintSwap.fetchNFTBalance(
    'sonic',
    Wallets.ETH_MAINNET_WALLET_PCMINH
  );
  collectibles = collectibles.concat(sonicCollectibles);

  const evmChains: TChainName[] = ['base', 'mainnet', 'optimism'];

  for (const chain of evmChains) {
    const evmCollectibles = await AdapterRegistry.Reservoir.fetchNFTBalance(
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

  const sts = await AdapterRegistry.BeetsApi.getStakedSonicMarket();
  console.log(sts);

  const os = await AdapterRegistry.OriginApi.getStakedSonicMarket();
  console.log(os);
}

testExternalities(false, fetchMultichainTokenPortfolio);
testExternalities(false, fetchMultichainTokenList);
testExternalities(false, fetchEvmscanTokenActivitiesWorks);
testExternalities(false, fetchDexScreenerParis);
testExternalities(false, fetchChainlistMetadata);
testExternalities(false, fetchSonicChainData);
testExternalities(false, fetchNFTData);
testExternalities(true, fetchSonicDapp);
