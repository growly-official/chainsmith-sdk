import { singleton } from 'tsyringe';
import { createStore, StoreApi } from 'zustand';
import type { TChain, TClient } from '../../types/index.d.ts';
import { TPlugin } from '../index.ts';

export type Disk = ChainsmithStorage['disk'];
export type Ram = ChainsmithStorage['ram'];
export type ChainsmithStorage = {
  disk: {
    client: TClient | undefined;
    chains: TChain[];
    plugins: TPlugin[];
  };
  ram: Record<string, any>;
};

const defaultState: ChainsmithStorage = {
  disk: {
    client: undefined,
    chains: [],
    plugins: [],
  },
  ram: {},
};

@singleton()
export class StoragePlugin<R extends Ram = any> {
  private storage: StoreApi<ChainsmithStorage> = createStore<ChainsmithStorage>(set => ({
    ...defaultState,
    writeToDisk: (data: Disk) => set({ disk: data }),
    writeToRam: (data: Ram) => set({ ram: data }),
  }));

  readDiskOrReturn<F extends keyof Disk>(obj: Record<F, any>): Disk[F] {
    const [key, value]: [F, Disk[F]] = Object.entries(obj)[0] as any;
    return value || this.writeToDisk(key, this.storage.getState().disk[key]);
  }

  readRamOrReturn<F extends keyof Ram>(obj: Record<F, any>): Ram[F] {
    const [key, value]: [F, Ram[F]] = Object.entries(obj)[0] as any;
    return value || this.writeToRam(key, (this.storage.getState().ram as R)[key]);
  }

  readDisk<F extends keyof Disk>(key: F): Disk[F] {
    return this.storage.getState().disk[key];
  }

  readRam<F extends keyof Ram>(key: F): Ram[F] {
    return this.storage.getState().ram[key];
  }

  writeToDisk<F extends keyof Disk>(key: F, value: any): Disk[F] {
    const diskState = this.storage.getState().disk;
    this.storage.setState({
      disk: {
        ...diskState,
        [key]: value,
      },
    });
    return value;
  }

  writeToRam<F extends keyof Ram>(key: string, value: any): Ram[F] {
    const ramState = this.storage.getState().ram;
    this.storage.setState({
      ram: {
        ...ramState,
        [key]: value,
      },
    });
    return value;
  }

  reset() {
    this.storage.setState(defaultState);
  }
}
