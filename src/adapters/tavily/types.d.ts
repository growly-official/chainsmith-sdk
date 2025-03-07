export interface TTavilySearchResult {
  title: string;
  url: string;
  content: string;
  rawContent?: string;
  score: number;
  publishedDate?: string;
}

export interface TTavilySearchImage {
  url: string;
  description?: string;
}

export interface TTavilySearchResponse {
  answer?: string;
  query: string;
  responseTime: number;
  images: TavilySearchImage[];
  results: TavilySearchResult[];
}

export interface ITavilySearchOptions {
  limit?: number;
  type?: 'news' | 'general';
  includeAnswer?: boolean;
  searchDepth?: 'basic' | 'advanced';
  includeImages?: boolean;
  days?: number; // 1 means current day, 2 means last 2 days
}
