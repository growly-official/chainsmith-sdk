import type { IAdapter } from '../../types/adapter.d.ts';
import { autoInjectable } from 'tsyringe';
import { tavily } from '@tavily/core';
import { ITavilySearchOptions, TTavilySearchResponse } from './types.js';

export type TavilyClient = ReturnType<typeof tavily>; // declaring manually because original package does not export its types

@autoInjectable()
export class TavilyAdapter implements IAdapter {
  name = 'TavilyAdapter';

  tavilyClient: TavilyClient;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('TAVILY_API_KEY is not set');
    }
    this.tavilyClient = tavily({ apiKey });
  }

  async search(query: string, options?: ITavilySearchOptions): Promise<TTavilySearchResponse> {
    try {
      const response = await this.tavilyClient.search(query, {
        includeAnswer: options?.includeAnswer || true,
        maxResults: options?.limit || 5,
        topic: options?.type || 'news',
        searchDepth: options?.searchDepth || 'basic',
        includeImages: options?.includeImages || false,
        days: options?.days || 60, // 1 months
      });

      return response;
    } catch (error) {
      console.error('Web search error:', error);
      throw error;
    }
  }
}
