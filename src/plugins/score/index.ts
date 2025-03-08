import { Logger } from 'tslog';

export type * from './types';

export class ScoringEnginePlugin {
  logger = new Logger({ name: 'ScoringEnginePlugin' });

  constructor() {
    // TODO: Add onchain buster engine here
  }
}
