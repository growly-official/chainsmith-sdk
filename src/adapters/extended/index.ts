import type { IAdapter } from '../../types/adapter.d.ts';
import { intersectMultipleArrays, getAllFuncs } from '../../utils/array.util.ts';

const tryAdapters =
  (adapters: IAdapter[], method: string) =>
  async (...args: any[]) => {
    for (const adapter of adapters) {
      try {
        if (typeof (adapter as any)[method] === 'function') {
          const result = await (adapter as any)[method](...args);
          if (result !== undefined) return result;
        }
      } catch (error) {
        console.error(`Adapter ${adapter.constructor.name} failed on ${method}: ${error}`);
      }
    }
    throw new Error(`All adapters failed for method: ${method}`);
  };

export function multiple<T extends IAdapter>(adapters: T[]): T {
  // Get the intersection of method names across all adapters
  const commonMethods = intersectMultipleArrays(adapters.map(getAllFuncs));
  return new Proxy(
    {},
    {
      get(_, method: string) {
        if (!commonMethods.includes(method))
          throw new Error(`Method ${method} is not supported by all adapters`);
        return tryAdapters(adapters, method);
      },
    }
  ) as any;
}
