import type { IAdapter } from '../../../../types';
import { Logger } from 'tslog';

export class SuiNameServiceAdapter implements IAdapter {
  name: string = 'sui.SuiNameServiceAdapter';
  logger = new Logger({ name: 'MultiPlatformSocialPlugin' });
}
