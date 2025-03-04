import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const ChainMetadataList = require('./chainMetadataList.json');
const ChainMetadataMap = require('./chainMetadataMap.json');

export { ChainMetadataList, ChainMetadataMap };
