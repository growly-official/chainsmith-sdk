import axios from 'axios';
import { Logger } from 'tslog';
import { formatUnits } from 'viem';
import type { IOnchainNftAdapter, TAddress, TChainName, TNftBalance } from '../../../../types';
import { getChainIdByName, objectToQueryString } from '../../../../utils';
import type {
  TPaintSwapUserNFT,
  TPaintSwapUserNFTResp,
  TPaintSwapUserOwnedCollection,
  TPaintSwapUserOwnedResp,
} from './types';

export type * from './types.d.ts';

const PAINTSWAP_BASE_URL = 'https://api.paintswap.finance/v2';

export class PaintSwapAdapter implements IOnchainNftAdapter {
  name = 'sonic.PaintSwapAdapter';
  logger = new Logger({ name: this.name });

  async fetchNFTBalance(chain: TChainName, address: TAddress): Promise<TNftBalance[]> {
    // Get UserOwnedCollections + Get UserNFTs, then merge both of them to TNftBalance
    const userOwnedCollections = await this.getUserOwnedCollections(address, chain);

    if (!userOwnedCollections || !userOwnedCollections.length) return [];

    // TODO: In case of schema evolution
    // Dynamically get currency, get decimals from metadata
    // then format the floorPrice
    // Currently hard code S for Sonic with 18 decimals

    const nftBalances: TNftBalance[] = userOwnedCollections.map(collection => {
      return {
        chainId: getChainIdByName(chain),
        address: collection.address,
        name: collection.collection.name,
        image: collection.collection.banner,
        floorPrice: Number.parseFloat(formatUnits(BigInt(collection.collection.stats.floor), 18)),
        currency: 'S', // Currently hardcode to 'S' for Sonic
        balance: Number.parseInt(collection.total),
      } as TNftBalance;
    });

    return nftBalances;
  }

  // PaintSwap functions

  /**
   * Get PaintSwap collections owned by the user (with metadata, only approved collections)
   * @param walletAddress - User wallet address
   * @param chain - Chain name
   * @returns User owned collections
   */
  async getUserOwnedCollections(
    walletAddress: TAddress,
    chain: TChainName
  ): Promise<TPaintSwapUserOwnedCollection[]> {
    this.logger.info('Fetch collection owned by:', walletAddress);

    const chainId = getChainIdByName(chain);

    let userOwnedCollections: TPaintSwapUserOwnedCollection[] = [];
    const limit = 1000;
    let offset = 0;

    while (true) {
      try {
        const queryOptions = {
          user: walletAddress,
          chainId,
          onlyApprovedCollections: true,
          numToFetch: limit,
          numToSkip: offset,
        };

        const params = objectToQueryString(queryOptions);

        const url = `${PAINTSWAP_BASE_URL}/userOwned?${params}`;
        const res = await axios.get<TPaintSwapUserOwnedResp>(url);
        const data = res.data;

        if (!data || !data.owned) throw new Error('No UserOwned data available');

        if (!data.owned.length) break;

        userOwnedCollections = userOwnedCollections.concat(data.owned);
        offset += limit;
      } catch (error) {
        this.logger.error('Error fetching PaintSwap data:', error);
        return [];
      }
    }

    return userOwnedCollections;
  }

  /**
   * Get PaintSwap ALL NFTs owned by the user (marketplace data, no metadata)
   * @param walletAddress - User wallet address
   * @param chain - Chain name
   * @returns User NFTs
   */
  async getUserNFTs(walletAddress: TAddress, chain: TChainName): Promise<TPaintSwapUserNFT[]> {
    this.logger.info('Fetch NFT balance of:', walletAddress);

    const chainId = getChainIdByName(chain);

    let userNFTs: TPaintSwapUserNFT[] = [];
    const limit = 1000;
    let offset = 0;

    while (true) {
      try {
        const queryOptions = {
          user: walletAddress,
          chainId,
          numToFetch: limit,
          numToSkip: offset,
          orderBy: 'lastTransferTimestamp',
          orderDirection: 'desc',
        };

        const params = objectToQueryString(queryOptions);

        const url = `${PAINTSWAP_BASE_URL}/userNFTs?${params}`;
        const res = await axios.get<TPaintSwapUserNFTResp>(url);
        const data = res.data;

        if (!data || !data.nfts) throw new Error('No UserNFTs data available');

        if (!data.nfts.length) break;

        userNFTs = userNFTs.concat(data.nfts);
        offset += limit;
      } catch (error) {
        this.logger.error('Error fetching PaintSwap data:', error);
        return [];
      }
    }

    return userNFTs;
  }
}
