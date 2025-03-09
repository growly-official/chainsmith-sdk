import 'reflect-metadata';
import { initChainsmithSdk } from '..';
import { Wallets } from '../data';
import type { TChainName } from '../types';
import {
  calculateEVMStreaksAndMetrics,
  calculateMultichainTokenPortfolio,
  calculateNFTActivityStats,
  findLongestHoldingToken,
} from '../utils';
import { AdapterRegistry, buildDefaultChains } from './config';

async function testFetchTokenTransferActivities() {
  const chains = buildDefaultChains(['mainnet']);
  const sdk = initChainsmithSdk(chains);
  const wallet = Wallets.ETH_MAINNET_WALLET_PCMINH;

  return await sdk.token.listMultichainTokenTransferActivities(AdapterRegistry.Evmscan)(wallet);
}

async function testFetchNftTransferActivities() {
  const chains = buildDefaultChains(['mainnet']);
  const sdk = initChainsmithSdk(chains);
  const wallet = Wallets.ETH_MAINNET_WALLET_PCMINH;

  return await sdk.token.listMultichainNftTransferActivities(AdapterRegistry.Evmscan)(wallet);
}

async function testFetchTokenPortfolio() {
  const chains = buildDefaultChains(['mainnet']);
  const sdk = initChainsmithSdk(chains);
  const wallet = Wallets.ETH_MAINNET_WALLET_PCMINH;

  return await sdk.portfolio.getMultichainTokenPortfolio([
    AdapterRegistry.CoinMarketcap,
    AdapterRegistry.Alchemy,
  ])(wallet);
}

async function testCalculatePortfolioStats() {
  const tokenPortfolio = await testFetchTokenPortfolio();
  return calculateMultichainTokenPortfolio(tokenPortfolio);
}

async function testCalculateEvmTxStats() {
  const tokenActivities = await testFetchTokenTransferActivities();
  const wallet = Wallets.ETH_MAINNET_WALLET_PCMINH;

  return calculateEVMStreaksAndMetrics(tokenActivities['base'] || [], wallet);
}

async function testFindLongestHoldingToken() {
  const tokenActivities = await testFetchTokenTransferActivities();
  const wallet = Wallets.ETH_MAINNET_WALLET_PCMINH;

  return Object.entries(tokenActivities).map(([chain, activities]) => {
    return findLongestHoldingToken(chain as TChainName, activities, wallet);
  });
}

async function testCalculateNftActivityStats() {
  const nftActivities = await testFetchNftTransferActivities();
  const wallet = Wallets.ETH_MAINNET_WALLET_PCMINH;

  return calculateNFTActivityStats(Object.values(nftActivities).flat(), wallet);
}

export {
  testFetchTokenTransferActivities,
  testFetchNftTransferActivities,
  testFetchTokenPortfolio,
  testCalculatePortfolioStats,
  testCalculateEvmTxStats,
  testFindLongestHoldingToken,
  testCalculateNftActivityStats,
};
