import { autoInjectable } from 'tsyringe';
import { Logger } from 'tslog';

@autoInjectable()
export class MultiPlatformSocialPlugin {
  logger = new Logger({ name: 'MultiPlatformSocialPlugin' });
}
