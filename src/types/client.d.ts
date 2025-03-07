import type {
  Account,
  Chain,
  PrivateKeyAccount,
  PublicClient,
  Transport,
  WalletClient,
} from 'viem';
import type { TChain } from './chains';

export interface TCreateClientParameters {
  chain: TChain;
  config?: Partial<{
    batchSize: number;
    rpcUrl: string;
  }>;
}

export type TClient = PublicClient & {
  chain: TChain;
};

export interface TCreateWalletClientParameters extends TCreateClientParameters {
  account: PrivateKeyAccount;
}

export type TWalletClient = WalletClient<Transport, Chain, Account> & {
  chain: TChain;
};
