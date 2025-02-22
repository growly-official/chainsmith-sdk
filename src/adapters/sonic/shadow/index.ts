import { getChainByName } from '../../../utils/chain.util.ts';
import { EvmTokenPlugin } from '../../../plugins/index.ts';
import type { IOnchainTokenAdapter } from '../../../types/adapter.d.ts';
import type { TChainName, TAddress } from '../../../types/chains.d.ts';
import type { TContractToken } from '../../../types/tokens.d.ts';
import { autoInjectable } from 'tsyringe';
import { intoChainTokenAddressMap } from 'src/utils/token.util.ts';
import { Files } from 'src/data/index.ts';

@autoInjectable()
export class ShadowExchangeAdapter implements IOnchainTokenAdapter {
  name = 'sonic.ShadowExchangeAdapter';

  constructor(private evmPlugin: EvmTokenPlugin) {
    intoChainTokenAddressMap(Files.TokenList.SonicShadowExchangeTokenList);
  }

  listAllOwnedTokens(chain: TChainName, address: TAddress): Promise<TContractToken[]> {
    const client = getChainByName(chain);
    this.evmPlugin.getBatchLatestTokens(client);
    return [];
  }
}
