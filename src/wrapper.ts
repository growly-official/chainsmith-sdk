import {
  createPublicClient,
  formatEther,
  http,
  createWalletClient as viemCreateWalletClient,
} from 'viem';
import type {
  TBaseChain,
  TChain,
  TChainEcosystem,
  TChainName,
  TClient,
  TCreateClientParameters,
  TCreateWalletClientParameters,
  TWalletClient,
} from './types';

const DEFAULT_MULTICAL_BATCH_SIZE = 32 * 1026;

// TODO: Refactor to createPublicClient using viemCreatePublicClient
export function createClient({ chain, config }: TCreateClientParameters): TClient {
  if (chain.ecosystem === 'evm') {
    const transport = http(config?.rpcUrl || chain.rpcUrls.default.http?.[0] || '');
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
    const transport = http(config?.rpcUrl || chain.rpcUrls.default.http?.[0] || '');
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
  if (chain.ecosystem === 'evm') return Number.parseFloat(formatEther(balance));

  return Number.parseFloat(balance.toString());
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
