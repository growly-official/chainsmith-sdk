export * from './array.util.js';
export * from './number.util.js';
export * from './chain.util.js';
export * from './portfolio.util.js';
export * from './activity.util.js';

export const getVariableName = (v: object) => {
  return Object.keys(v)[0];
};

export const objectToQueryString = (obj: Record<any, any>): string => {
  return Object.entries(obj)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const fetchWithRetry = async (
  url: string | URL | globalThis.Request,
  maxRetries: number,
  delayPerRetry: number,
  fetchConfig?: RequestInit,
  options: RequestInit = {}
): Promise<any> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        ...fetchConfig,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (i < maxRetries - 1) {
        const delay = delayPerRetry * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
    }
  }
};
