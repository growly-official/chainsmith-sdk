import type { ISmartWalletAdapter } from '@/types/adapter';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class PrivyAdapter implements ISmartWalletAdapter {
  name = 'PrivyAdapter';
}
