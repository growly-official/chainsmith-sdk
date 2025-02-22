import { getChainByName } from '../../../utils/chain.util.ts';
import { EvmTokenPlugin } from '../../../plugins/index.ts';
import type { IOnchainTokenAdapter } from '../../../types/adapter.d.ts';
import type { TAddress, TChain } from '../../../types/chains.d.ts';
import type { TContractToken, TContractTokenMetadata } from '../../../types/tokens.d.ts';
import { Files } from '../../../data/index.ts';
import { createClient } from '../../../wrapper.ts';
import { autoInjectable } from 'tsyringe';
import { Logger } from 'tslog';

@autoInjectable()
export class ShadowExchangeAdapter implements IOnchainTokenAdapter {
  name = 'sonic.ShadowExchangeAdapter';
  logger = new Logger({ name: this.name });

  rpcUrl: string;
  contractTokenMetadatas: TContractTokenMetadata[];

  constructor(private evmPlugin: EvmTokenPlugin) {
    const tokenList = Files.TokenList.SonicShadowExchangeTokenList;
    const chain = getChainByName('sonic');
    this.contractTokenMetadatas = tokenList.tokens.map(token => ({
      ...token,
      address: token.address as any,
      chainId: chain.id,
      type: undefined,
    }));
  }

  listAllOwnedTokens(chain: TChain, address: TAddress): Promise<TContractToken[]> {
    const client = createClient({
      chain,
    });
    return this.evmPlugin.getBatchLatestTokens(client, this.contractTokenMetadatas, address);
  }
}
