import 'reflect-metadata';
import { AdapterRegistry, buildDefaultChains } from './config';
import { Wallets } from '../src/data';
import { ChainsmithSdk } from '../src';
import { buildChainsWithCustomRpcUrls } from '../src/utils/chain.util';
import { multiple } from '../src/adapters';

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

async function fetchPaintSwapData() {
  const nftBalance = await AdapterRegistry.PaintSwap.fetchNFTBalance(
    'sonic',
    Wallets.SONIC_WALLET_CHUNGTIN
  );
  console.log(nftBalance);
}

testExternalities(false, fetchMultichainTokenPortfolio);
testExternalities(false, fetchMultichainTokenList);
testExternalities(false, fetchEvmscanTokenActivitiesWorks);
testExternalities(false, fetchDexScreenerParis);
testExternalities(false, fetchChainlistMetadata);
testExternalities(false, fetchSonicChainData);
testExternalities(true, fetchPaintSwapData);
