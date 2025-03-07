import type { IAdapter } from '../../types/adapter.d'
import type { IDexScreenerData, IDexScreenerPair } from './types'
import { Logger } from 'tslog'

const DEX_SCREENER_ENDPOINT = 'https://api.dexscreener.com/latest/dex'

export class DexScreenerAdapter implements IAdapter {
  name = 'DexScreenerAdapter'
  logger = new Logger({ name: this.name })

  async fetchDexScreenerData(tokenAddress: string): Promise<IDexScreenerData> {
    this.logger.info('Fetch dex screener data: ', tokenAddress)
    const url = `${DEX_SCREENER_ENDPOINT}/search?q=${tokenAddress}`
    try {
      const data: any = await fetch(url)
        .then(res => res.json())
        .catch(console.error)
      if (!data || !data.pairs) {
        throw new Error('No DexScreener data available')
      }
      const dexData: IDexScreenerData = {
        schemaVersion: data.schemaVersion,
        pairs: data.pairs,
      }
      return dexData
    }
    catch (error) {
      console.error(error)
      return {
        schemaVersion: '1.0.0',
        pairs: [],
      }
    }
  }

  sortPairsByMarketcap(dexData: IDexScreenerData): IDexScreenerPair[] {
    if (dexData.pairs.length === 0)
      return []
    // Sort pairs by both liquidity and market cap to get the highest one.
    return dexData.pairs.sort((a, b) => {
      const diff = b.marketcap - a.marketcap
      if (diff !== 0)
        return diff
      // If market cap is equal, higher liquidity comes first.
      return b.marketCap - a.marketCap
    })
  }

  sortPairsByLiquidity(dexData: IDexScreenerData): IDexScreenerPair[] {
    if (dexData.pairs.length === 0)
      return []
    // Sort pairs by both liquidity and market cap to get the highest one.
    return dexData.pairs.sort((a, b) => {
      const diff = b.liquidity.usd - a.liquidity.usd
      if (diff !== 0)
        return diff
      // If liquidity is equal, higher market cap comes first.
      return b.marketCap - a.marketCap
    })
  }
}
