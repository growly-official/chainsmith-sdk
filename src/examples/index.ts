import 'reflect-metadata';
import { initChainsmithSdk } from '..';
import { multiple } from '../adapters';
import { Wallets } from '../data';
import type { TAddress, TChainName, TMarketTokenList, TMultichain, TNftBalance } from '../types';
import { buildChainsWithCustomRpcUrls } from '../utils';
import { AdapterRegistry, buildDefaultChains } from './config';
import * as OnchainBusterTestSuite from './onchain-buster';

const chains = buildDefaultChains(['base', 'mainnet', 'optimism']);
const sdk = initChainsmithSdk(chains);

function testExternalities(enabled: boolean, f: () => Promise<any>) {
  if (enabled) f().then(console.log);
}

async function testFetchMultichainTokenList() {
  const wallets: Record<TAddress, TMultichain<TMarketTokenList>> = {};
  for (const wallet of [Wallets.ETH_MAINNET_WALLET_PCMINH]) {
    wallets[wallet] = await sdk.portfolio.getMultichainMarketTokenList([
      AdapterRegistry.CoinMarketcap,
      AdapterRegistry.Alchemy,
    ])(wallet);
  }
  return wallets;
}

async function testFetchEvmscanTokenActivities() {
  sdk.storage.writeToRam('walletAddress', Wallets.ETH_MAINNET_WALLET_PCMINH);
  return sdk.token.listMultichainTokenTransferActivities(AdapterRegistry.Evmscan)();
}

async function testFetchDexScreenerParis() {
  return AdapterRegistry.DexScreener.fetchDexScreenerData(
    '0xBAa5CC21fd487B8Fcc2F632f3F4E8D37262a0842'
  );
}

async function testFetchMultichainTokenPortfolio() {
  return sdk.portfolio.getMultichainTokenPortfolio([
    AdapterRegistry.CoinMarketcap,
    AdapterRegistry.Alchemy,
  ])(Wallets.ETH_MAINNET_WALLET_JESSE);
}

async function testFetchChainlistMetadata() {
  return sdk.evmChain.getAllChainMetadata();
}

async function testFetchSonicChainData() {
  const sonicChains = buildChainsWithCustomRpcUrls({ sonic: 'https://rpc.soniclabs.com' }, 'evm');
  const sdk = initChainsmithSdk(sonicChains);

  // const ownedTokens = await sdk.token.listChainOwnedTokens(AdapterRegistry.ShadowExchange)(
  //   Wallets.SONIC_WALLET_CHUNGTIN
  // );
  // console.log(ownedTokens);

  const portfolio = await sdk.portfolio.getTokenPortfolio([
    multiple([AdapterRegistry.ShadowExchangeApi, AdapterRegistry.BeetsApi, AdapterRegistry.CoinMarketcap]),
    AdapterRegistry.ShadowExchange,
  ])(Wallets.SONIC_WALLET_PCMINH);
  console.log(portfolio);

  // const points = await sdk.sonicPoint.fetchUserPointsStats(Wallets.SONIC_WALLET_BEETS_TREASURY);
  // console.log(points);

  // return await AdapterRegistry.Evmscan.listAllTransactions('sonic', Wallets.SONIC_WALLET_CHUNGTIN);
}

async function testFetchNFTData() {
  let collectibles: TNftBalance[] = [];
  const evmChains: TChainName[] = ['base', 'mainnet', 'optimism'];
  for (const chain of evmChains) {
    collectibles = collectibles.concat(
      await sdk.token.getNftCollectibles(AdapterRegistry.Reservoir)(
        chain,
        Wallets.ETH_MAINNET_WALLET_PCMINH
      )
    );
  }
  return collectibles;
}
testExternalities(false, testFetchMultichainTokenList);
testExternalities(false, testFetchEvmscanTokenActivities);
testExternalities(false, testFetchDexScreenerParis);
testExternalities(false, testFetchMultichainTokenPortfolio);
testExternalities(false, testFetchChainlistMetadata);
testExternalities(true, testFetchSonicChainData);
testExternalities(false, testFetchNFTData);
// Onchain Buster tests
testExternalities(false, OnchainBusterTestSuite.testCalculateEvmTxStats);
testExternalities(false, OnchainBusterTestSuite.testCalculateNftActivityStats);
testExternalities(false, OnchainBusterTestSuite.testCalculatePortfolioStats);
testExternalities(false, OnchainBusterTestSuite.testFetchNftTransferActivities);
testExternalities(false, OnchainBusterTestSuite.testFetchTokenPortfolio);
testExternalities(false, OnchainBusterTestSuite.testFetchTokenTransferActivities);
testExternalities(false, OnchainBusterTestSuite.testFindLongestHoldingToken);
