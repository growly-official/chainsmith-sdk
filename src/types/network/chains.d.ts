import type { Address as EvmAddress } from 'viem';
import type * as EvmChainList from 'viem/chains';

// Constant type aliases for chain ecosystems.
export type ETHEREUM_VIRTUAL_MACHINE = 'evm';
export type SOLANA_VIRTUAL_MACHINE = 'svm';
export type MOVE_VIRTUAL_MACHINE = 'mvm';

// Aliases for chain-related types.

/** A chain address. */
export type TAddress = EvmAddress | THexString;

/** Abstracted chain type. */
export type TChainType = EvmChainList.Chain;

/** Abstracted chain type with partial metadata. */
export type TBaseChain = TChainType & Partial<TChainMetadata>;

/** Block number type. */
export type TBlockNumber<quantity = bigint> = quantity;

/** Abstracted chain type with full metadata. */
export type TChain = TChainType & TChainMetadata;

/** Chain ecosystems. */
export type TChainEcosystem =
  | ETHEREUM_VIRTUAL_MACHINE
  | SOLANA_VIRTUAL_MACHINE
  | MOVE_VIRTUAL_MACHINE
  | 'other';

/** Chain ID type. */
export type TChainId = number;
export type THexString = `0x${string}`;

/** Chain metadata. */
export interface TChainMetadata {
  chainName: TChainName;
  ecosystem: TChainEcosystem;
}

/** Chain name type. */
export type TChainName = keyof typeof EvmChainList;

export interface TChainMetadataListResponse {
  icon: string;
  logoUrl?: string;
  name: string;
  chain: string;
  rpc: string[];
  faucets: string[];
  infoURL: string;
  shortName: string;
  chainId: TChainId;
  networkId: number;
}

/** Registry of chains. */
export type IEcosystemRegistry = TMultiEcosystem<{
  name: string;
  chains: TChainName[];
}>;

/**
 * Multi-chain type.
 * @template T - Multi-chain data
 */
export type TMultichain<T> = Partial<Record<TChainName, T>>;

/**
 * Multi-ecosystem type.
 * @template T - Multi-ecosystem data
 */
export type TMultiEcosystem<T> = Partial<Record<TChainEcosystem, T>>;
