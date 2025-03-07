import type { IYieldAdapter } from '../../../types/adapter.d'
import type { TAddress, TChainName } from '../../../types/chains.d'
import type { TToken } from '../../../types/tokens.d'
import type {
  TMetropolisAggregatedInfo,
  TMetropolisClassicV2Pool,
  TMetropolisTokenImputed,
  TMetropolisV21Pool,
  TMetropolisVault,
  TMetropolisVaultPosition,
} from './types'
import axios from 'axios'
import { Logger } from 'tslog'

const METROPOLIS_BASE_URL = 'https://api-b.metropolis.exchange/api/v1'

export class MetropolisApiAdapter implements IYieldAdapter {
  name = 'sonic.MetropolisApiAdapter'
  logger = new Logger({ name: this.name })

  v21Pools?: TMetropolisV21Pool[]
  tokenMap?: Record<string, TMetropolisTokenImputed>

  vaults?: TMetropolisVault[]
  userVaultPositions?: TMetropolisVaultPosition[]

  // Might unused
  classicV2Pools?: TMetropolisClassicV2Pool[]

  fetchTokensWithYield(_chain: TChainName, _tokens: TToken[]) {
    throw new Error('not implemented')
  }

  // Pools
  async getV21Pools(): Promise<TMetropolisV21Pool[]> {
    try {
      if (!this.v21Pools) {
        const res = await axios.get(`${METROPOLIS_BASE_URL}/pools`)
        return res.data
      }
      return this.v21Pools
    }
    catch (error) {
      throw new Error(`Failed to get v21 pools: ${error}`)
    }
  }

  async getClassicV2Pools(): Promise<TMetropolisClassicV2Pool[]> {
    try {
      if (!this.classicV2Pools) {
        const res = await axios.get(`${METROPOLIS_BASE_URL}/pools-classic-v2`)
        return res.data
      }
      return this.classicV2Pools
    }
    catch (error) {
      throw new Error(`Failed to get classic v2 pools: ${error}`)
    }
  }

  // Vaults
  async getVaults(chainId: number): Promise<TMetropolisVault[]> {
    try {
      if (!this.vaults) {
        const res = await axios.get(`${METROPOLIS_BASE_URL}/vaults?chainId=${chainId}`)
        return res.data
      }
      return this.vaults
    }
    catch (error) {
      throw new Error(`Failed to get vaults: ${error}`)
    }
  }

  async getUserVaultPositions(walletAddress: TAddress): Promise<TMetropolisVaultPosition[]> {
    try {
      if (!this.userVaultPositions) {
        const res = await axios.get(
          `${METROPOLIS_BASE_URL}/vaults/user-positions/${walletAddress}`,
        )
        return res.data
      }
      return this.userVaultPositions
    }
    catch (error) {
      throw new Error(`Failed to get user\'s vault positions: ${error}`)
    }
  }

  // Aggregated Protocol Stats
  async getProtocolStatistics(): Promise<TMetropolisAggregatedInfo> {
    const res = await axios.get(
      `${METROPOLIS_BASE_URL}/protocol-info?aggregate=true&filterByVersion=classic-v2-v21`,
    )
    return res.data
  }
}
