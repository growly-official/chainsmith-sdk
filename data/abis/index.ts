export * from './erc20.ts';
export * from './defi/uniswapV2Pool.ts';
export * from './defi/shadow/shadowQuoterV2.ts';
export * from './defi/shadow/shadowPoolFactoryV3.ts';
export * from './defi/shadow/shadowPoolV3.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const Quoter = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');
const IUniswapV3PoolABI = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');
const IUniswapV3FactoryABI = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json');

export const UniswapQuoterAbi = Quoter.abi;
export const UniswapV3PoolAbi = IUniswapV3PoolABI.abi;
export const UniswapV3FactoryAbi = IUniswapV3FactoryABI.abi;
