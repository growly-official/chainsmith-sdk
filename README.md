# Chainsmith SDK [WIP]

Viem-compatible abstraction library to simplify the interaction with multiple blockchains via user-friendly high level APIs.

## Current features of the SDK

- Support all chains listed in Viem library.
- Customizable plugins and adapters.
- Core plugins to query onchain portfolio, token metadata, token prices...
- Chain configuration with modifiable RPC URL settings.
- Plug-n-play different adapters to plugins depend on the use cases.

## Getting Started

Chainsmith SDK is still in beta development phase. Hence, no production package published yet. Currently, if you want to use Chainsmith in your project, install the repository in the project workspace.

### Initialize SDK using shared RPC Providers.

Below example uses Alchemy as a primary RPC providers for all the chains registered to the SDK.

```typescript
import { ChainsmithSdk } from 'chainsmith-sdk/src/index.ts';
import { alchemy } from 'chainsmith-sdk/src/rpc/index.ts';
import { buildEvmChains } from 'chainsmith-sdk/src/utils/index.ts';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';

// Helper method to build all EVM chains with Alchemy as a RPC provider.
export const buildDefaultChains = (chainNames: TChainName[]) =>
  buildEvmChains(chainNames, alchemy(ALCHEMY_API_KEY));

// Build Base, Mainnet and Optimism chain types.
const chains = buildDefaultChains(['base', 'mainnet', 'optimism']);

// Initialize the Chainsmith SDK.
const sdk = ChainsmithSdk.init(chains);
```

The `alchemy` is the RPC endpoint builder provided by the SDK itself. If you want to customize a method on your own, see the example code of `alchemy`.

### Initialize SDK with custom RPC endpoints

Let's say you want to use a custom RPC provider for Sonic chain, you can follow the below code to use the method `buildChainsWithCustomRpcUrls` that maps the `TChainName` with the RPC url.

```typescript
const chains = buildChainsWithCustomRpcUrls({ sonic: 'https://rpc.soniclabs.com' }, 'evm');
```
