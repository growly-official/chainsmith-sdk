import 'reflect-metadata';
import {
  EvmChainPlugin,
  EvmTokenPlugin,
  MultichainPortfolioPlugin,
  MultichainTokenPlugin,
  MultiPlatformSocialPlugin,
  SonicPointPlugin,
  StoragePlugin,
} from './plugins';
import type { TChain } from './types';

export class ChainsmithSdk {
  portfolio: MultichainPortfolioPlugin = new MultichainPortfolioPlugin();
  token: MultichainTokenPlugin = new MultichainTokenPlugin();
  social: MultiPlatformSocialPlugin = new MultiPlatformSocialPlugin();
  sonicPoint: SonicPointPlugin = new SonicPointPlugin();
  storage: StoragePlugin = new StoragePlugin();
  evmToken: EvmTokenPlugin = new EvmTokenPlugin();
  evmChain: EvmChainPlugin = new EvmChainPlugin();
}

export function initChainsmithSdk(chains?: TChain[]) {
  const sdk = new ChainsmithSdk();
  if (chains) sdk.storage.writeToDisk('chains', chains);
  return sdk;
}
