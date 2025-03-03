import { autoInjectable } from 'tsyringe';
import { Logger } from 'tslog';

@autoInjectable()
export class ScoringEnginePlugin {
  logger = new Logger({ name: 'ScoringEnginePlugin' });

  constructor() {
    //TODO: Add onchain buster engine here
  }
}
