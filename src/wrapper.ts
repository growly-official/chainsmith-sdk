import {
  createPublicClient,
  createWalletClient as viemCreateWalletClient,
  formatEther,
  http,
} from 'viem';
import type {
  TChain,
  TChainEcosystem,
  TBaseChain,
  TCreateClientParameters,
  TClient,
  TChainName,
  TWalletClient,
  TCreateWalletClientParameters,
} from './types/index.d.ts';

const DEFAULT_MULTICAL_BATCH_SIZE = 32 * 1026;

// TODO: Refactor to createPublicClient using viemCreatePublicClient
export function createClient({ chain, config }: TCreateClientParameters): TClient {
  if (chain.ecosystem === 'evm') {
    const transport = http(config?.rpcUrl || chain.rpcUrls.default.http?.[0] || '', {
      onFetchRequest(request) {
        console.log('URL: ', request.url);
      },
    });
    return createPublicClient({
      chain,
      transport,
      batch: {
        multicall: {
          batchSize: config?.batchSize || DEFAULT_MULTICAL_BATCH_SIZE,
        },
      },
    }) as any;
  } else {
    return undefined as any;
  }
}

export function createWalletClient({
  chain,
  account,
  config,
}: TCreateWalletClientParameters): TWalletClient {
  if (chain.ecosystem === 'evm') {
    const transport = http(config?.rpcUrl || chain.rpcUrls.default.http?.[0] || '', {
      onFetchRequest(request) {
        console.log('URL: ', request.url);
      },
    });
    return viemCreateWalletClient({
      chain,
      transport,
      account,
    }) as any;
  } else {
    return undefined as any;
  }
}

export function formatReadableToken(chain: TBaseChain, balance: bigint): number {
  if (chain.ecosystem === 'evm') return parseFloat(formatEther(balance));
  return parseFloat(balance.toString());
}

export class ChainTypeBuilder {
  chain: TBaseChain;

  constructor(chain: TBaseChain) {
    this.chain = chain as any;
  }

  withChainName = (name: TChainName): ChainTypeBuilder => {
    this.chain.chainName = name;
    return this;
  };

  withRpcUrl = (url: string): ChainTypeBuilder => {
    this.chain.rpcUrls.default = {
      ...this.chain.rpcUrls.default,
      http: [url],
    };
    return this;
  };

  withEcosystem = (ecosystem: TChainEcosystem): ChainTypeBuilder => {
    this.chain.ecosystem = ecosystem;
    return this;
  };

  build = (): TChain => {
    return this.chain as TChain;
  };
}
