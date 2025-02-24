import 'reflect-metadata';
import { AdapterRegistry, buildDefaultChains } from './config.ts';
import { Wallets } from '../src/data/index.ts';
import { ChainsmithSdk } from '../src/index.ts';
import { buildChainsWithCustomRpcUrls } from '../src/utils/chain.util.ts';
import { multiple } from '../src/adapters/index.ts';

const chains = buildDefaultChains(['base', 'mainnet', 'optimism']);
const sdk = ChainsmithSdk.init(chains);

function testExternalities(enabled: boolean, f: () => Promise<any>) {
  if (enabled) f().then(console.log);
}

async function fetchMultichainTokenList() {
  const wallets = {};
  for (const wallet of [Wallets.ETH_MAINNET_WALLET_PCMINH]) {
    const portfolio = await sdk.portfolio.getMultichainTokenList([
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
  const ownedTokens = await sdk.token.listChainOwnedTokens(AdapterRegistry.ShadowExchange)(
    Wallets.SONIC_WALLET_BEETS_TREASURY
  );
  console.log(ownedTokens);

  const portfolio = await sdk.portfolio.getChainTokenPortfolio([
    multiple([AdapterRegistry.ShadowExchange, AdapterRegistry.CoinMarketcap]),
    AdapterRegistry.ShadowExchange,
  ])(Wallets.SONIC_WALLET_BEETS_TREASURY);
  console.log(portfolio);
}

testExternalities(false, fetchMultichainTokenPortfolio);
testExternalities(false, fetchMultichainTokenList);
testExternalities(false, fetchEvmscanTokenActivitiesWorks);
testExternalities(false, fetchDexScreenerParis);
testExternalities(false, fetchChainlistMetadata);
testExternalities(true, fetchSonicChainData);
