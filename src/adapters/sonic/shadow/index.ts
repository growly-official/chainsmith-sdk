import { getChainByName } from '../../../utils/chain.util.ts';
import { EvmTokenPlugin } from '../../../plugins/index.ts';
import type { IOnchainTokenAdapter } from '../../../types/adapter.d.ts';
import type { TChainName, TAddress } from '../../../types/chains.d.ts';
import type { TContractToken, TContractTokenMetadata } from '../../../types/tokens.d.ts';
import { autoInjectable } from 'tsyringe';
import { Files } from '../../../data/index.ts';
import type { TClient } from '../../../types/client.d.ts';
import { createClient } from '../../../wrapper.ts';
import { Logger } from 'tslog';

@autoInjectable()
export class ShadowExchangeAdapter implements IOnchainTokenAdapter {
  name = 'sonic.ShadowExchangeAdapter';
  logger = new Logger({ name: this.name });
  client: TClient | undefined = undefined;

  rpcUrl: string;
  contractTokenMetadatas: TContractTokenMetadata[];

  constructor(
    rpcUrl: string,
    private evmPlugin: EvmTokenPlugin
  ) {
    const tokenList = Files.TokenList.SonicShadowExchangeTokenList;
    const chain = getChainByName('sonic');
    this.client = createClient({
      chain,
      config: {
        rpcUrl,
      },
    });
    this.contractTokenMetadatas = tokenList.tokens.map(token => ({
      ...token,
      address: token.address as any,
      chainId: chain.id,
      type: undefined,
    }));
  }

  listAllOwnedTokens(_: TChainName, address: TAddress): Promise<TContractToken[]> {
    return this.evmPlugin.getBatchLatestTokens(this.client, this.contractTokenMetadatas, address);
  }
}
