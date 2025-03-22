import type { IAdapter } from '../../types';
import { getAllFuncs, intersectMultipleArrays } from '../../utils';

function tryAdapters(adapters: IAdapter[], method: string) {
  return async (...args: any[]) => {
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
}

/**
 * Combine multiple adapters into a single adapter that tries each one in order.
 *
 * @params adapters - List of orders that matches the provided type.
 * @returns{IAdapter} - Combined single adapter
 */
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
