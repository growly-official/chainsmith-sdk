import { Logger } from 'tslog';
import type { IAdapter } from '../../types/adapter.d.ts';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class BirdEyeAdapter implements IAdapter {
  name = 'BirdEyeAdapter';
  logger = new Logger({ name: this.name });
}
