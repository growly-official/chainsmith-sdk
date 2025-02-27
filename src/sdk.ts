import { container, singleton } from 'tsyringe';
import {
  MultichainPortfolioPlugin,
  MultichainTokenPlugin,
  MultiPlatformSocialPlugin,
  StoragePlugin,
  EvmTokenPlugin,
  EvmChainPlugin,
  SonicPointPlugin,
} from './plugins/index.ts';
import type { TChain } from './types/index.d.ts';

@singleton()
export default class ChainsmithSdk {
  constructor(
    public portfolio: MultichainPortfolioPlugin,
    public token: MultichainTokenPlugin,
    public social: MultiPlatformSocialPlugin,
    public sonicPoint: SonicPointPlugin,
    public storage: StoragePlugin,
    public evmToken: EvmTokenPlugin,
    public evmChain: EvmChainPlugin
  ) {}

  public static init(chains?: TChain[]) {
    const sdk = container.resolve(ChainsmithSdk);
    sdk.storage.reset();
    if (chains) sdk.storage.writeToDisk('chains', chains);
    return sdk;
  }
}
