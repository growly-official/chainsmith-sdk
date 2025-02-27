import { TChainName, TAddress } from 'src/types/chains.js';
import { autoInjectable } from 'tsyringe';
import { Logger } from 'tslog';
import { getChainByName, objectToQueryString } from '../../../utils/index.ts';
import type { IAdapter } from '../../../types/adapter.d.ts';
import type { TPaintSwapUserOwnedCollection, TPaintSwapUserNFT } from './types.d.ts';

const PAINTSWAP_BASE_URL = 'https://api.paintswap.finance/v2';

@autoInjectable()
export class PaintSwapAdapter implements IAdapter {
  name = 'sonic.PaintSwapAdapter';
  logger = new Logger({ name: this.name });

  // PaintSwap functions
  async getUserOwnedCollections(
    walletAddress: TAddress,
    chain = 'sonic' as TChainName
  ): Promise<TPaintSwapUserOwnedCollection[]> {
    this.logger.info('Fetch collection owned by:', walletAddress);

    const chainId = getChainByName(chain).id;

    let userOwnedCollections: TPaintSwapUserOwnedCollection[] = [];
    const limit = 1000;
    let offset = 0;

    for (;;) {
      try {
        const queryOptions = {
          user: walletAddress,
          chainId: chainId,
          // onlyApprovedCollections: true,
          numToFetch: limit,
          numToSkip: offset,
        };

        const params = objectToQueryString(queryOptions);

        const url = `${PAINTSWAP_BASE_URL}/userOwned?${params}`;
        const data = await fetch(url)
          .then(res => res.json())
          .catch(console.error);

        if (!data || !data.owned) {
          throw new Error('No UserOwned data available');
        }

        if (!data.owned.length) {
          break;
        }

        userOwnedCollections = userOwnedCollections.concat(data.owned);
        offset += limit;
      } catch (error) {
        this.logger.error('Error fetching PaintSwap data:', error);
        return [];
      }
    }

    return userOwnedCollections;
  }

  async getUserNFTs(
    walletAddress: TAddress,
    chain = 'sonic' as TChainName
  ): Promise<TPaintSwapUserNFT[]> {
    this.logger.info('Fetch NFT balance of:', walletAddress);

    const chainId = getChainByName(chain).id;

    let userNFTs: TPaintSwapUserNFT[] = [];
    const limit = 1000;
    let offset = 0;

    for (;;) {
      try {
        const queryOptions = {
          user: walletAddress,
          chainId: chainId,
          numToFetch: limit,
          numToSkip: offset,
          orderBy: 'lastTransferTimestamp',
          orderDirection: 'desc',
        };

        const params = objectToQueryString(queryOptions);

        const url = `${PAINTSWAP_BASE_URL}/userNFTs?${params}`;
        const data = await fetch(url)
          .then(res => res.json())
          .catch(console.error);

        console.log(data);

        if (!data || !data.nfts) {
          throw new Error('No userNFTs data available');
        }

        if (!data.nfts.length) {
          break;
        }

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
