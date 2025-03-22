import type { IAdapter } from '../../types';
import { Logger } from 'tslog';

export class BirdEyeAdapter implements IAdapter {
  name = 'BirdEyeAdapter';
  logger = new Logger({ name: this.name });
}
