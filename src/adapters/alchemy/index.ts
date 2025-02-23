import { autoInjectable } from 'tsyringe';
import type { IOnchainTokenAdapter } from '../../types/adapter.d.ts';
import type { TAddress, TChain } from '../../types/chains.d.ts';
import type { TContractToken } from '../../types/tokens.d.ts';
import type { TAlchemyRequest, TAlchemyResponse } from './types.d.ts';
import { EvmTokenPlugin } from '../../plugins/evm/index.ts';
import { alchemy } from '../../rpc/index.ts';
import axios from 'axios';

@autoInjectable()
export class AlchemyAdapter implements IOnchainTokenAdapter {
  name = 'AlchemyAdapter';

  apiKey: string;

  constructor(
    apiKey: string,
    private evmPlugin: EvmTokenPlugin
  ) {
    this.apiKey = apiKey;
  }

  async listAllOwnedTokens(chain: TChain, address: TAddress): Promise<TContractToken[]> {
    // Note: let the maxCount=100 by default
    const res = await axios.post(
      alchemy(this.apiKey)(chain),
      {
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getTokenBalances',
        params: [address],
      } as TAlchemyRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.40.0',
        },
      }
    );
    const alchemyRes: TAlchemyResponse = await res.data;
    const tokenBalances = alchemyRes.result.tokenBalances || [];
    const tokenMetadatas = await this.evmPlugin.getTokenMetadataList(chain.id);

    const parsedTokenBalance: TContractToken[] = [];
    for (const token of tokenBalances) {
      const metadata = tokenMetadatas.find(
        metadata => metadata.address.toLowerCase() === token.contractAddress.toLowerCase()
      );
      if (metadata) {
        parsedTokenBalance.push({
          chainId: chain.id,
          name: metadata.name,
          symbol: metadata.symbol,
          logoURI: metadata.logoURI,
          decimals: metadata.decimals,
          balance: Number.parseInt(token.tokenBalance, 16) / 10 ** metadata.decimals,
          address: token.contractAddress as any,
          type: undefined,
        });
      }
    }
    return parsedTokenBalance;
  }
}
