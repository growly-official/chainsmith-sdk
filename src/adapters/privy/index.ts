import type { ISmartWalletAdapter } from '../../types/adapter.d.ts';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class PrivyAdapter implements ISmartWalletAdapter {
  name = 'PrivyAdapter';
}
