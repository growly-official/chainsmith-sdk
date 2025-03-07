import type { StoreApi } from 'zustand'
import type { TPlugin } from '..'
import type { TChain, TClient } from '../../types'
import { createStore } from 'zustand'

export type Disk = ChainsmithStorage['disk']
export type Ram = ChainsmithStorage['ram']
export interface ChainsmithStorage {
  disk: {
    client: TClient | undefined
    chains: TChain[]
    plugins: TPlugin[]
  }
  ram: Record<string, any>
}

const defaultState: ChainsmithStorage = {
  disk: {
    client: undefined,
    chains: [],
    plugins: [],
  },
  ram: {},
}

const globalStorage: StoreApi<ChainsmithStorage> = createStore<ChainsmithStorage>(set => ({
  ...defaultState,
  writeToDisk: (data: Disk) => set({ disk: data }),
  writeToRam: (data: Ram) => set({ ram: data }),
}))

export class StoragePlugin<R extends Ram = any> {
  readDiskOrReturn<F extends keyof Disk>(obj: Record<F, any>): Disk[F] {
    const [key, value]: [F, Disk[F]] = Object.entries(obj)[0] as any
    return value || this.writeToDisk(key, globalStorage.getState().disk[key])
  }

  readRamOrReturn<F extends keyof Ram>(obj: Record<F, any>): Ram[F] {
    const [key, value]: [F, Ram[F]] = Object.entries(obj)[0] as any
    return value || this.writeToRam(key, (globalStorage.getState().ram as R)[key])
  }

  readDisk<F extends keyof Disk>(key: F): Disk[F] {
    return globalStorage.getState().disk[key]
  }

  readRam<F extends keyof Ram>(key: F): Ram[F] {
    return globalStorage.getState().ram[key]
  }

  writeToDisk<F extends keyof Disk>(key: F, value: any): Disk[F] {
    const diskState = globalStorage.getState().disk
    globalStorage.setState({
      disk: {
        ...diskState,
        [key]: value,
      },
    })
    return value
  }

  writeToRam<F extends keyof Ram>(key: string, value: any): Ram[F] {
    const ramState = globalStorage.getState().ram
    globalStorage.setState({
      ram: {
        ...ramState,
        [key]: value,
      },
    })
    return value
  }

  reset() {
    globalStorage.setState(defaultState)
  }
}
