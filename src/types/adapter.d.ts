import type { Logger } from 'tslog';
import type {
  TAddress,
  TChain,
  TChainName,
  TContractToken,
  TMarketToken,
  TNftBalance,
  TNftTransferActivity,
  TToken,
  TTokenTransferActivity,
} from '.';

/**
 * Plugin methods consume this type to use a single adapter
 * @template A - Consumable adapter
 */
export type WithAdapter<A extends IAdapter, R> = (adapter: A) => R;

/**
 * Plugin methods consume this type to use multiple adapters
 * @template A - Consumable adapters
 */
export type WithManyAdapters<A extends IAdapter[], R> = (adapters: A) => R;

/** Adapter type */
export interface IAdapter {
  /** The name of the adapter. */
  name: string;
  /** The logger instance for the adapter. */
  logger?: Logger<any>;
}

/** Adapter for fetching market data */
export interface IMarketDataAdapter extends IAdapter {
  /**
   * Fetches market data for a single token, including its price.
   *
   * @param {TChainName} chain - The name of the blockchain network.
   * @param {TToken} token - The token to fetch market data for.
   * @returns {Promise<TMarketToken | undefined>} - A promise that resolves to the token with its market data or `undefined` if not found.
   */
  fetchTokenWithPrice: (chain: TChainName, token: TToken) => Promise<TMarketToken | undefined>;

  /**
   * Fetches market data for multiple tokens, including their prices and total USD value.
   *
   * @param {TChainName} chain - The name of the blockchain network.
   * @param {TToken[]} tokens - The list of tokens to fetch market data for.
   * @returns {Promise<{ tokens: TMarketToken[]; totalUsdValue: number }>} - A promise that resolves to an object containing:
   *   - `tokens`: An array of tokens with their market data.
   *   - `totalUsdValue`: The aggregated USD value of all tokens.
   */
  fetchTokensWithPrice: (
    chain: TChainName,
    tokens: TToken[]
  ) => Promise<{ tokens: TMarketToken[]; totalUsdValue: number }>;
}

export interface IYieldAdapter extends IAdapter {
  fetchTokensWithYield: (chain: TChainName, tokens: TToken[]) => any;
}

export interface IOnchainActivityAdapter extends IAdapter {
  listAllTokenActivities: (
    chain: TChainName,
    address: TAddress,
    limit: number
  ) => Promise<TTokenTransferActivity[]>;

  listAllNftActivities: (
    chain: TChainName,
    address: TAddress,
    limit: number
  ) => Promise<TNftTransferActivity[]>;

  // TODO: Add raw transaction txList
}

/**
 * Adapter interface for fetching on-chain NFT balances, extending `IAdapter`.
 */
export interface IOnchainNftAdapter extends IAdapter {
  /**
   * Fetches the NFT balance of a given address on a specified blockchain.
   *
   * @param {TChainName} chain - The name of the blockchain network.
   * @param {TAddress} address - The wallet address to fetch NFT balances for.
   * @returns {Promise<TNftBalance[]>} - A promise that resolves to an array of NFT balances.
   */
  fetchNFTBalance: (chain: TChainName, address: TAddress) => Promise<TNftBalance[]>;
}

/**
 * Adapter interface for fetching on-chain token balances, extending `IAdapter`.
 */
export interface IOnchainTokenAdapter extends IAdapter {
  /**
   * Lists all owned tokens of a given address on a specified blockchain.
   *
   * @param {TChain} chain - The blockchain network.
   * @param {TAddress} address - The wallet address to fetch token balances for.
   * @returns {Promise<TContractToken[]>} - A promise that resolves to an array of owned tokens.
   */
  listAllOwnedTokens: (chain: TChain, address: TAddress) => Promise<TContractToken[]>;
}
