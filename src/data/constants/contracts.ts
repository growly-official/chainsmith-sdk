// ------- NFT Marketplace -------
export const BLUR_NFT_MARKETPLACE = new Set([
  // Source: https://docs.blur.foundation/contracts
  '0x000000000000ad05ccc4f10045630fb830b95127', // Proxy
  '0xb2ecfe4e4d61f8790bbb9de2d1259b9e2410cea5', // Proxy V2
  '0x39da41747a83aee658334415666f3ef92dd0d541', // Aggregator
  '0x0000000000a39bb272e79075ade125fd351887ac', // Big Pool
  '0x29469395eaf6f95920e59f858042f0e28d98a20b', // Blend
]);

export const OPENSEA_MARKETPLACE = new Set([
  // ETH
  '0x7f268357a8c2552623316e2562d90e642bb538e5', // Wyvern Exchange V2
  '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b', // Wyvern Exchange V1
  '0x18c2e87d183c5338a9142f97db176f3832b1d6de', // Payments
  '0xf2458bd228d8a39b64bd3b9f84890e957cac3bbc', // OpenSea Pro: Marketplace
  '0xa5409ec958C83C3f309868babACA7c86DCB077c1', // Registry

  '0x0000000000000068f116a894984e2db1123eb395', // Seaport 1.6
  '0x00000000000000adc04c56bf30ac9d3c0aaf14dc', // Seaport 1.5
  '0x00000000006c3852cbEf3e08E8dF289169EdE581', // Seaport 1.1
]);

export const ZORA = new Set([
  '0x777777c338d93e2c7adf08d102d45ca7cc4ed021', // Zora 1155 factory

  // More in
  // https://docs.zora.co/contracts/deployments
  // https://docs.zora.co/contracts/factories
]);

export const MAGIC_EDEN = new Set([
  '0x5ebc127fae83ed5bdd91fc6a5f5767e259df5642',
  '0x475aa716337d79b5ea513bfe4cc01787eb2e6004', // Base
]);

// ------- DeFi -------
export const SHADOW = new Set([
  '0x92643Dc4F75C374b689774160CDea09A0704a9c2', // Universal Router
  '0x5543c6176feb9b4b179078205d7c29eea2e2d695', // Swap Router
]);

export const GMX = new Set([
  // Arbitrum mainnet https://github.com/gmx-io/protocol-info/blob/master/src/config/contracts.ts
  '0x489ee077994b6658eafa855c308275ead8097c4a', // Vault
  '0xabbc5f99639c9b6bcb58544ddf04efa6802f4064', // Router
  '0xfebb9f4cac4cd523598fe1c5771181440143f24a', // VaultReader
  '0x2b43c90d1b727cee1df34925bcd5ace52ec37694', // Reader
  '0x3963ffc9dff443c2a94f21b129d429891e32ec18', // GlpManager
  '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1', // RewardRouter
  '0xb95db5b167d75e6d04227cfffa61069348d271f5', // GlpRewardRouter
  '0x8bfb8e82ee4569aee78d03235ff465bd436d40e0', // RewardReader
  '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // NATIVE_TOKEN
  '0x4277f8f2c384827b5273592ff7cebd9f2c1ac258', // GLP
  '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a', // GMX
  '0xf42ae1d54fd613c9bb14810b0588faaa09a426ca', // ES_GMX
  '0x35247165119b69a40edd5304969560d0ef486921', // BN_GMX
  '0x45096e7aa921f27590f8f19e457794eb09678141', // USDG
  '0x6260101218ec4ccfff1b778936c6f2400f95a954', // ES_GMX_IOU
  '0x908c4d94d34924765f1edc22a1dd098397c59dd4', // StakedGmxTracker
  '0x4d268a7d4c16ceb5a606c173bd974984343fea13', // BonusGmxTracker
  '0xd2d1162512f927a7e282ef43a362659e4f2a728f', // FeeGmxTracker
  '0x1addd80e6039594ee970e5872d247bf0414c8903', // StakedGlpTracker
  '0x4e971a87900b931ff39d1aad67697f49835400b6', // FeeGlpTracker

  '0x23208b91a98c7c1cd9fe63085bff68311494f193', // StakedGmxDistributor
  '0x60519b48ec4183a61ca2b8e37869e675fd203b34', // StakedGlpDistributor

  '0x199070ddfd1cfb69173aa2f7e20906f26b363004', // GmxVester
  '0xa75287d2f8b217273e7fcd7e86ef07d33972042e', // GlpVester

  '0x09f77e8a13de9a35a7231028187e9fd5db8a2acb', // OrderBook
  '0x7257ac5d0a0aac04aa7ba2ac0a6eb742e332c3fb', // OrderExecutor
  '0xa27c20a7cf0e1c68c0460706bb674f98f362bc21', // OrderBookReader

  '0xb87a436b93ffe9d75c5cfa7bacfff96430b09868', // PositionRouter
  '0x75e42e6f01baf1d6022bea862a28774a9f8a4a0c', // PositionManager

  '0x80a9ae39310abf666a87c743d6ebbd0e8c42158e', // UniswapGmxEthPool
  '0xe6fab3f0c7199b0d34d7fbe83394fc0e0d06e99d', // ReferralStorage
  '0x8aa382760bcdce8644c33e6c2d52f6304a76f5c8', // ReferralReader

  // Synthetics
  '0xfd70de6b91282d8017aa4e741e9ae325cab992d8', // DataStore
  '0xc8ee91a54287db53897056e12d9819156d3822fb', // EventEmitter
  '0x7c68c7866a64fa2160f78eeae12217ffbf871fa8', // ExchangeRouter
  '0xf89e77e8dc11691c9e8757e84aafbcd8a67d7a55', // DepositVault
  '0x0628d46b5d145f183adb6ef1f2c97ed1c4701c55', // WithdrawalVault
  '0x31ef83a530fde1b38ee9a18093a333d8bbbc40d5', // OrderVault
  '0xf60becbba223eea9495da3f606753867ec10d139', // SyntheticsReader
  '0x7452c558d45f8afc8c83dae62c3f8a5be19c71f6', // SyntheticsRouter
  '0xaa50bd556ce0fe61d4a57718ba43177a3ab6a597', // Timelock

  '0xca11bde05977b3631167028862be2a173976ca11', // Multicall
]);

export const CURVE = new Set([
  '0x99a58482bd75cbab83b27ec03ca68ff489b5788f', // router
  '0x16c6521dff6bab339122a0fe25a9116693265353',

  '0x4f37a9d177470499a2dd084621020b023fcffc1f', // base
  '0x0dcded3545d565ba3b19e683431381007245d983', // op
  '0x2191718cd32d02b8e60badffea33e4b5dd9a0a0d', // arb
]);

export const ONEINCH = new Set([
  // eth
  '0x111111125434b319222cdbf8c261674adb56f3ae',
  '0x11111112542d85b3ef69ae05771c2dccff4faa26',
  '0x1111111254fb6c44bac0bed2854e76f90643097d',
  '0xe069cb01d06ba617bcdf789bf2ff0d5e5ca20c71',

  // base
  '0x1111111254eeb25477b68fb85ed929f73a960582',

  // op
  '0x111111125421ca6dc452d289314280a0f8842a65',
]);

export const COW_SWAP = new Set([
  '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
  '0x40a50cf069e992aa4536211b23f286ef88752187',
]);

export const AERODROME = new Set([
  '0x6cb442acf35158d5eda88fe602221b67b400be3e', // router
]);

export const UNISWAP = new Set([
  // eth router
  '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
  '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
  '0x76d631990d505e4e5b432eedb852a60897824d68',

  // arbitrum router
  '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
  '0xec8b0f7ffe3ae75d7ffab09429e3675bb63503e4',
  '0x5e325eda8064b456f4781070c0738d849c824258',
  '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',

  // base router
  '0xec8b0f7ffe3ae75d7ffab09429e3675bb63503e4',
  '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
  '0x9e18efb3be848940b0c92d300504fb08c287fe85',

  // optimism router
  '0xb555edf5dcf85f42ceef1f3630a52a108e55a654',
  '0xec8b0f7ffe3ae75d7ffab09429e3675bb63503e4',
  '0xcb1355ff08ab38bbce60111f1bb2b784be25d7e8',
  '0x40d51104da22e3e77b683894e7e3e12e8fc61e65',
]);

export const PENDLE = new Set([
  '0x888888888889758f76e7103c6cbf23abbf58f946', // router v4
  '0x00000000005bbb0ef59571e58418f9a4357b68a0', // router v3
  '0x1b6d3e5da9004668e14ca39d1553e9a46fe842b3', // router
  '0x0000000001e4ef00d069e71d6ba041b0a16f7ea0',
  '0x41fad93f225b5c1c95f2445a5d7fcb85ba46713f',
]);

export const PANCAKE_SWAP = new Set([
  // v2 Router https://developer.pancakeswap.finance/contracts/universal-router/addresses
  '0x65b382653f7c31bc0af67f188122035461ec9c76', // ETH
  '0xfe6508f0015c778bdcc1fb5465ba5ebe224c9912', // ARB + Base

  // v3 https://developer.pancakeswap.finance/contracts/v3/addresses
  '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865', // v3 Factory
  '0x1b81d678ffb9c0263b24a97847620c99d213eb14', // Swap router
]);

export const VELODROME = new Set([
  '0x4bf3e32de155359d1d75e8b474b66848221142fc', // router
  '0xa062ae8a9c5e11aaa026fc2670b0d65ccc8b2858', // router v2
]);

export const AAVE = new Set([
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
  '0x398ec7346dcd622edc5ae82352f02be94c62d119',

  '0x794a61358d6845594f94dc1db02a252b5b4814ad', // op
]);

export const MOONWELL = new Set([
  '0xc36442b4a4522e871399cd717abdd847ab11fe88', // uniswap liquidity
  '0xa962f2974a846b30366251f4634384c1e42aef16', // op unwrapper
]);

export const LP_INTERACTION = new Set([
  '0x1382cff3cee10d283dcca55a30496187759e4caf', // uniswap lp
  '0x9560e827af36c94d2ac33a39bce1fe78631088db', // op lp
]);

export const SYNTHETIX = new Set([
  // See sections under https://docs.synthetix.io/v3/for-developers/deployment-info
  // CoreProxy V3
  '0xffffffaeff0b96ea8e4f94b2253f31abdd875847', // Mainnet, ARB, OP
  '0x32c222a9a159782afd7529c87fa34b96ca72c696', // Base
  // TODO: Update Spot/Perp contract later

  // FeeProxy V2
  '0xb440dd674e1243644791a4adfe3a2abb0a92d309', // Mainnet
  '0x4a16a42407aa491564643e1dfc1fd50af29794ef', // OP
]);

export const VENUS = new Set([
  // Docs: https://docs-v4.venus.io/deployed-contracts/isolated-pools

  // ------ Mainnet ------
  // Core Pool
  '0x687a01ecf6d3907658f7a7c714749fac32336d1b', // Comptroller
  '0x044dd75b9e043acfd2d6eb56b6bb814df2a9c809', // NativeTokenGateway
  '0x672208c10aaaa2f9a6719f449c4c8227bc0bc202', // vcrvUSD_Core
  '0xd8add9b41d4e1cd64edad8722ab0ba8d35536657', // vDAI_Core
  '0x4fafbdc4f2a9876bd1764827b26fb8dc4fd1db95', // vFRAX_Core
  '0x17142a05fe678e9584fa1d88efac1bf181bf7abe', // vsFRAX_Core
  '0x13eb80fdbe5c5f4a7039728e258a6f05fb3b912b', // vTUSD_Core
  '0x17c07e0c232f2f80dfdbd7a95b942d893a4c5acb', // vUSDC_Core
  '0x8c3e3821259b82ffb32b2450a95d2dcbf161c24e', // vUSDT_Core
  '0x8716554364f20bca783cb2baa744d39361fd1d8d', // vWBTC_Core
  '0x7c8ff7d2a1372433726f879bd945ffb250b94c65', // vWETH_Core
  // Curve Pool
  '0x67aa3ecc5831a65a5ba7be76bed3b5dc7db60796', // Comptroller
  '0x2d499800239c4cd3012473cb1eae33562f0a6933', // vcrvUSD_Curve
  '0x30ad10bd5be62cab37863c2bfcc6e8fb4fd85bda', // vCRV_Curve
  // Liquid Staked ETH
  '0xf522cd0360ef8c2ff48b648d53ea1717ec0f3ac3', // Comptroller
  '0xbc1471308eb2287ebe137420eb1664a964895d21', // NativeTokenGateway
  '0xa854d35664c658280fff27b6edc6c4195c3229b3', // vezETH_LiquidStakedETH
  '0x76697f8eaea4be01c678376aab97498ee8f80d5c', // vPT-weETH-26DEC2024_LiquidStakedETH
  '0xdb6c345f864883a8f4cae87852ac342589e76d1b', // vrsETH_LiquidStakedETH
  '0xf9e9fe17c00a8b96a8ac20c4e344c8688d7b947e', // vsfrxETH_LiquidStakedETH
  '0xc82780db1257c788f262fbbda960b3706dfdcaf2', // vWETH_LiquidStakedETH
  '0x4a240f0ee138697726c8a3e43efe6ac3593432cb', // vwstETH_LiquidStakedETH
  '0xb4933af59868986316ed37fa865c829eba2df0c7', // vweETH_LiquidStakedETH
  '0xef26c64bc06a8de4ca5d31f119835f9a1d9433b9', // vweETHs_LiquidStakedETH

  // ------ Arbitrum One ------
  // Core Pool
  '0x317c1a5739f39046e20b08ac9beea3f10fd43326', // Comptroller
  '0xc8e51418cadc001157506b306c6d0b878f1ff755', // NativeTokenGateway
  '0xada57840b372d4c28623e87fc175de8490792811', // vWBTC_Core
  '0x68a34332983f4bf866768dd6d6e638b02ef5e1f0', // vWETH_Core
  '0xb9f9117d4200dc296f9acd1e8be1937df834a2fd', // vUSDT_Core
  '0x7d8609f8da70ff9027e9bc5229af4f6727662707', // vUSDC_Core
  '0xaeb0fed69354f34831fe1d16475d9a83ddacada6', // vARB_Core
  // Liquid Staked ETH Pool
  '0x52bab1af7ff770551bd05b9fc2329a0bf5e23f16', // Comptroller
  '0xd1e89806bab8cd7680dfc7425d1fa6d7d5f0c3fe', // NativeTokenGateway
  '0x9df6b5132135f14719696bbae3c54bab272fdb16', // vwstETH_LiquidStakedETH
  '0x246a35e79a3a0618535a469adaf5091caa9f7e88', // vweETH_LiquidStakedETH
  '0x39d6d13ea59548637104e40e729e4aabe27fe106', // vWETH_LiquidStakedETH

  // ------ Optimism ------
  // Core Pool
  '0x5593ff68be84c966821eef5f0a988c285d5b7cec', // Comptroller
  '0x5b1b7465cfde450e267b562792b434277434413c', // NativeTokenGateway
  '0x9efdcfc2373f81d3df24647b1c46e15268884c46', // vWBTC_Core
  '0x66d5ae25731ce99d46770745385e662c8e0b4025', // vWETH_Core
  '0x37ac9731b0b02df54975cd0c7240e0977a051721', // vUSDT_Core
  '0x1c9406ee95b7af55f005996947b19f91b6d55b15', // vUSDC_Core
  '0x6b846e3418455804c1920fa4cc7a31a51c659a2d', // vOP_Core
]);

export const COMPOUND = new Set([
  // fn to identify interaction:
  // v2 mint, borrow, redeem%, repay%, liquidate%, seize%, accrue%
  // v3 allow, supply%, withdraw%

  // Mainnet v2: https://docs.compound.finance/v2/
  '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c', // cAAVE
  '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e', // cBAT
  '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4', // cCOMP
  '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // cDAI
  '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5', // cETH
  '0x7713dd9ca933848f6819f38b8352d9a15ea73f67', // cFEI
  '0xface851a4921ce59e912d19329929ce6da6eb0c7', // cLINK
  '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b', // cMKR
  '0x158079ee67fce2f58472a96584a73c7ab9ac95c1', // cREP
  '0xf5dce57282a584d2746faf1593d3121fcac444dc', // cSAI
  '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7', // cSUSHI
  '0x12392f67bdf24fae0af363c24ac620a2f67dad86', // cTUSD
  '0x35a18000230da775cac24873d00ff85bccded550', // cUNI
  '0x39aa39c021dfbae8fac545936693ac917d5e7563', // cUSDC
  '0x041171993284df560249b57358f931d9eb7b925d', // cUSDP
  '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9', // cUSDT
  '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4', // cWBTC
  '0xccf4429db6322d5c611ee964527d42e5d685dd6a', // cWBTC2
  '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946', // cYFI
  '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407', // cZRX
  // '0xc00e94cb662c3520282e6f5717214004a7f26888', // COMP
  '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', // Comptroller
  '0xc0da02939e1441f497fd74f78ce7decb17b66529', // Governance
  '0x6d903f6003cca6255d85cca4d3b5e5146dc33925', // Timelock

  // V3: https://docs.compound.finance/#protocol-contracts
  // Mainnet
  '0xc3d688b66703497daa19211eedff47f25384cdc3', // cUSDCv3
  '0xa17581a9e3356d9a858b789d68b4d866e593ae94', // cWETHv3
  '0x3afdc9bca9213a35503b077a6072f3d0d5ab0840', // cUSDTv3
  '0x3d0bb1ccab520a66e607822fc55bc921738fafe3', // cwstETHv3
  // Arbitrum
  '0xa5edbdd9646f8dff606d7448e414884c7d905dca', // cUSDCev3
  '0x9c4ec768c28520b50860ea7a15bd7213a9ff58bf', // cUSDCv3
  '0x6f7d514bbd4aff3bcd1140b7344b32f063dee486', // cWETHv3
  '0xd98be00b5d27fc98112bde293e487f8d4ca57d07', // cUSDTv3
  // Base
  '0xb125e6687d4313864e53df431d5425969c15eb2f', // cUSDCv3
  '0x9c4ec768c28520b50860ea7a15bd7213a9ff58bf', // cUSDbCv3
  '0x46e6b214b524310239732d51387075e0e70970bf', // cWETHv3
  // OP
  '0x2e44e174f7d53f0212823acc11c01a11d58c5bcb', // cUSDCv3
  '0x995e394b8b2437ac8ce61ee0bc610d617962b214', // cUSDTv3
  '0xe36a30d249f7761327fd973001a32010b521b6fd', // cWETHv3
]);

export const LIDO = new Set([
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // fn: submit
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0', // fn: wrap/unwrap
]);

export const SWELL = new Set([
  '0xf951e335afb289353dc249e82926178eac7ded78', // fn: deposit
]);

export const PUFFER_STAKING = new Set([
  // Docs: https://github.com/PufferFinance/pufETH/tree/main
  '0xd9a442856c234a39a81a089c06451ebaa4306a72', // fn: depositETH
  '0x4aa799c5dfc01ee7d790e3bf1a7c2257ce1dceff', // Depositor
]);

export const PUFFER_AIRDROP = new Set([
  // Claim PUFFER
  '0x9f7e5a1d0d2d4d61e25e9e5538cec54b98588f7f',
]);

export const PUFFER = new Set([...PUFFER_STAKING, ...PUFFER_AIRDROP]);

export const EIGENLAYER_STAKING = new Set([
  '0x39053d51b77dc0d36036fc1fcc8cb819df8ef37a', // Delegator
  '0x858646372cc42e1a627fce94aa7a7033e7cf075a', // Deposit (old Strategy Manager)
]);

export const EIGENLAYER_AIRDROP = new Set([
  // Airdrop Distributor
  '0xa105c3abedbaf4295ac6149bf24d5311f629934c',
  '0x2ec90ef34e312a855becf74762d198d8369eece1',
  '0xc1994a7efddd1a424ff8e7abd0763659119f4fca',
  '0xc135b516e399c1ed702588d887fbbe6f2d1ba27a',
  '0x263190d31d1e7c46de703ecedc46fd425afdefd3',
  '0xecf2bcb2342d8157d4fb4f4bdc1edf74fbf759b3',
  '0x035bdaeab85e47710c27eda7fd754ba80ad4ad02', // Deprecated
]);

export const EIGENLAYER = new Set([...EIGENLAYER_STAKING, ...EIGENLAYER_AIRDROP]);

export const OTHER_DEFI = new Set([
  '0x1e4b7a6b903680eab0c5dabcb8fd429cd2a9598c',
  '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
  '0xcc9a0b7c43dc2a5f023bb9b738e45b0ef6b06e04',
  '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
  '0xface851a4921ce59e912d19329929ce6da6eb0c7',
  '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b',
  '0xf5dce57282a584d2746faf1593d3121fcac444dc',
  '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7',
  '0x12392f67bdf24fae0af363c24ac620a2f67dad86',
  '0xccf4429db6322d5c611ee964527d42e5d685dd6a',
  '0x3fda67f7583380e67ef93072294a7fac882fd7e7',
  '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
  '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
  '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
  '0x1c1853bc7c6bff0d276da53972c0b1a066db1ae7',
  '0x316f9708bb98af7da9c68c1c3b5e79039cd336e3',
  '0xcfc1fa6b7ca982176529899d99af6473ad80df4f',
  '0xf859a1ad94bcf445a406b892ef0d3082f4174088',
  '0x158079ee67fce2f58472a96584a73c7ab9ac95c1',
  '0x35a18000230da775cac24873d00ff85bccded550',
  '0x39aa39c021dfbae8fac545936693ac917d5e7563',
  '0x285617313887d43256f852cae0ee4de4b68d45b0',
  '0x42f9505a376761b180e27a01ba0554244ed1de7d',
  '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
  '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4',
  '0xa7ff0d561cd15ed525e31bbe0af3fe34ac2059f6',
  '0x1449e0687810bddd356ae6dd87789244a46d9adb',
  '0xcec237e83a080f3225ab1562605ee6dedf5644cc',
  '0xfe83af639f769ead20bad76067abc120245a06a9',
  '0xc0da01a04c3f3e0be433606045bb7017a7323e38',
  '0x1055be4bf7338c7606d9efdcf80593f180ba043e',
  '0x02557a5e05defeffd4cae6d83ea3d173b272c904',
  '0xba3d9687cf50fe253cd2e1cfeede1d6787344ed5',
  '0xe1ba0fb44ccb0d11b80f92f4f8ed94ca3ff51d00',
  '0x6ee0f7bb50a54ab5253da0667b0dc2ee526c30a8',
  '0xfc1e690f61efd961294b3e1ce3313fbd8aa4f85d',
  '0x9d91be44c06d373a8a226e1f3b146956083803eb',
  '0xa64bd6c70cb9051f6a9ba1f163fdc07e0dfb5f84',
  '0x6fce4a401b6b80ace52baaefe4421bd188e76f6f',
  '0x7deb5e830be29f91e298ba5ff1356bb7f8146998',
  '0x328c4c80bc7aca0834db37e6600a6c49e12da4de',
  '0x625ae63000f46200499120b906716420bd059240',
  '0x4da9b813057d04baef4e5800e36083717b4a0341',
  '0xb124541127a0a657f056d9dd06188c4f1b0e5aab',
  '0x9ba00d6856a4edf4665bca2c2309936572473b7e',
  '0x71fc860f7d3a592a4a98740e39db31d25db65ae8',
  '0xfc4b8ed459e00e5400be803a9bb3954234fd50e3',
  '0x12e51e77daaa58aa0e9247db7510ea4b46f9bead',
  '0x6fb0855c404e09c47c3fbca25f08d4e41f9f062f',
  '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
  '0xa069e33994dcc24928d99f4bbeda83aaef00b5f3',
  '0x93a62da5a14c80f265dabc077fcee437b1a0efde',
  '0x29e240cfd7946ba20895a7a02edb25c210f9f324',
  '0x04bc0ab673d88ae9dbc9da2380cb6b79c4bca9ae',
  '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c',
  '0x975f1bc238303593efab00d63cf0fc5f519a8de0',
  '0xed03415e5705c5abbf8e94c491b715df526cad55',
  '0x2c3a2558e9b91e893e53bce94de3457a29f6b262',
  '0x16de59092dae5ccf4a1e6439d611fd0653f0bd01',
  '0xf61718057901f84c4eec4339ef8f0d86d2b45600',
  '0x73a052500105205d34daf004eab301916da8190f',
  '0xd6ad7a6750a7593e092a9b218d66c0a814a3436e',
  '0x597ad1e0c13bfe8025993d9e79c69e1c0233522e',
  '0x83f798e925bcd4017eb265844fddabb448f1707d',
  '0xba2e7fed597fd0e3e70f5130bcdbbfe06bb94fe1',
  '0x033e52f513f9b98e129381c6708f9faa2dee5db5',
  '0xb01419e74d8a2abb1bbad82925b19c36c191a701',
  '0x3a22df48d84957f907e67f4313e3d43179040d6e',
  '0x0001fb050fe7312791bf6475b96569d83f695c9f',
  '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
  '0x1cc481ce2bd2ec7bf67d1be64d4878b16078f309',
  '0xbb3bf20822507c70eafdf11c7469c98fc752ccca',
  '0x96e61422b6a9ba0e068b6c5add4ffabc6a4aae27',
  '0xdf5e4e54d212f7a01cf94b3986f40933fcff589f',
  '0x6903223578806940bd3ff0c51f87aa43968424c8',
  '0x03403154afc09ce8e44c3b185c82c6ad5f86b9ab',
  '0x46afc2dfbd1ea0c0760cad8262a5838e803a37e5',
  '0xcb550a6d4c8e3517a939bc79d0c7093eb7cf56b5',
  '0x0a61c2146a7800bdc278833f21ebf56cd660ee2a',
  '0xc454f4e1ddb39c8de9663287d52b0e4feb4ca45e',
  '0x35f5a420ef9bcc748329021fbd4ed0986abdf201',
  '0x8e6741b456a074f0bc45b8b82a755d4af7e965df',
  '0x2d407ddb06311396fe14d4b49da5f0471447d45c',
  '0x710295b5f326c2e47e6dd2e7f6b5b0f7c5ac2f24',
  '0x7d96ab1f847c3564b8f9a93f35e1027ada74aec2',
  '0xe15461b18ee31b7379019dc523231c57d1cbc18c',
  '0x50c1a2ea0a861a967d9d0ffe2ae4012c2e053804',
  '0x0b634a8d61b09820e9f72f79cdcbc8a4d0aad26b',
  '0xc97232527b62efb0d8ed38cf3ea103a6cca4037e',
  '0x27b5739e22ad9033bcbf192059122d163b60349d',
  '0xd0660cd418a64a1d44e9214ad8e459324d8157f1',
  '0x9ca85572e6a3ebf24dedd195623f188735a5179f',
  '0xfcc5c47be19d06bf83eb04298b026f81069ff65b',
  '0x27b7b1ad7288079a66d12350c828d3c00a6f07d7',
  '0x7047f90229a057c13bf847c0744d646cfb6c9e1a',
  '0x5533ed0a3b83f70c3c4a1f69ef5546d3d4713e44',
  '0xb8c3b7a2a618c552c23b1e4701109a9e756bab67',
  '0xe625f5923303f1ce7a43acfefd11fd12f30dbca4',
  '0xa8b1cb4ed612ee179bdea16cca6ba596321ae52d',
  '0x2994529c0652d127b7842094103715ec5299bbed',
  '0x629c759d1e83efbf63d84eb3868b564d9521c129',
  '0x98b058b2cbacf5e99bc7012df757ea7cfebd35bc',
  '0xcc7e70a958917cce67b4b87a8c30e6297451ae98',
  '0x625b7df2fa8abe21b0a976736cda4775523aed1e',
  '0x39546945695dcb1c037c836925b355262f551f55',
  '0x96ea6af74af09522fcb4c28c269c26f59a31ced6',
  '0x0fcdaedfb8a7dfda2e9838564c5a1665d856afdf',
  '0x7f83935ecfe4729c4ea592ab2bc1a32588409797',
  '0x123964ebe096a920dae00fb795ffbfa0c9ff4675',
  '0x5334e150b938dd2b6bd040d9c4a03cff0ced3765',
  '0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6',
  '0xbacb69571323575c6a5a3b4f9eede1dc7d31fbc1',
  '0xb4d1be44bff40ad6e506edf43156577a3f8672ec',
  '0x8414db07a7f743debafb402070ab01a4e0d2e45e',
  '0x986b4aff588a109c09b50a03f42e4110e29d353f',
  '0xdcd90c7f6324cfa40d7169ef80b12031770b4325',
  '0x07fb4756f67bd46b748b16119e802f1f880fb2cc',
  '0xfe39ce91437c76178665d64d7a2694b0f6f17fe3',
  '0x1b5eb1173d2bf770e50f10410c9a96f7a8eb6e75',
  '0xf6c9e9af314982a4b38366f4abfaa00595c5a6fc',
  '0xa9fe4601811213c340e850ea305481aff02f5b28',
  '0xe14d13d8b3b85af791b2aadd661cdbd5e6097db1',
  '0xc2cb1040220768554cf699b0d863a3cd4324ce32',
  '0xacd43e627e64355f1861cec6d3a6688b31a6f952',
  '0x19d3364a399d251e894ac732651be8b0e4e85001',
  '0x020171085bcd43b6fd36ad8c95ad61848b1211a2',
  '0xec0d8d3ed5477106c6d4ea27d90a60e594693c90',
  '0x881b06da56bb5675c54e4ed311c21e54c5025298',
  '0x37d19d1c4e1fa9dc47bd1ea12f742a0887eda74a',
  '0x26ea744e5b887e5205727f55dfbe8685e3b21951',
  '0x5f18c75abdae578b483e5f43f12a39cf75b973a9',
  '0xe6354ed5bc4b393a5aad09f21c46e101e692d447',
  '0x2f08119c6f07c006695e079aafc638b8789faf18',
  '0x9d409a0a012cfba9b15f6d4b36ac57a46966ab9a',
  '0xda816459f1ab5631232fe5e97a05bbbb94970c95',
  '0xc5bddf9843308380375a611c18b50fb9341f502a',
  '0xe11ba472f74869176652c35d30db89854b5ae84d',
  '0xe0db48b4f71752c4bef16de1dbd042b82976b8c7',
  '0xa354f35829ae975e850e23e9615b11da1b3dc4de',
  '0xe1237aa7f535b0cc33fd973d66cbf830354d16c7',
  '0x04aa51bbcb46541455ccf1b8bef2ebc5d3787ec9',
  '0x9d25057e62939d3408406975ad75ffe834da4cdd',
  '0x36324b8168f960a12a8fd01406c9c78143d41380',
  '0xa2609b2b43ac0f5ebe27deb944d2a399c201e3da',
  '0xa1787206d5b1be0f432c4c4f96dc4d1257a1dd14',
  '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
  '0xface851a4921ce59e912d19329929ce6da6eb0c7',
  '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b',
  '0xf5dce57282a584d2746faf1593d3121fcac444dc',
  '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7',
  '0x12392f67bdf24fae0af363c24ac620a2f67dad86',
  '0xccf4429db6322d5c611ee964527d42e5d685dd6a',
  '0x2e088a0a19dda628b4304301d1ea70b114e4accd',
  '0xa1bc2cf69d474b39b91665e24e7f2606ed142991',
  '0x25e12482a25cf36ec70fda2a09c1ed077fc21616',
  '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
  '0x92cf9e5e4d1dfbf7da0d2bb3e884a68416a65070',
  '0x5f465e9fcffc217c5849906216581a657cd60605',
  '0x8014595f2ab54cd7c604b00e9fb932176fdc86ae',
  '0xd18140b4b819b895a3dba5442f959fa44994af50',
  '0xcf50b810e57ac33b91dcf525c6ddd9881b139332',
  '0xe096ccec4a1d36f191189fe61e803d8b2044dfc3',
  '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e',
  '0x947b7742c403f20e5faccdac5e092c943e7d0277',
  '0xa3c5a1e09150b75ff251c1a7815a07182c3de2fb',
  '0xae5f315a5b5dd4dbacd38862562a51490e500183',
  '0xedccb35798fae4925718a43cc608ae136208aa8d',
  '0x877288c4e6eba4f635ba7428706447353b47de75',
  '0x3c995e43e6ddd551e226f4c5544c77bfed147ab9',
  '0x1389388d01708118b497f59521f6943be2541bb7',
  '0xe98984ad858075813ada4261af47e68a64e28fcc',
  '0xdecc7d761496d30f30b92bdf764fb8803c79360d',
  '0x989aeb4d175e16225e39e87d0d97a3360524ad80',
  '0x989aeb4d175e16225e39e87d0d97a3360524ad80',
  '0x794a61358d6845594f94dc1db02a252b5b4814ad',
  '0x8dff5e27ea6b7ac08ebfdf9eb090f32ee9a30fcf',
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
  '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
  '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599',
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
  '0xbeadf48d62acc944a06eeae0a9054a90e5a7dc97',
  '0x18cd499e3d7ed42feba981ac9236a278e4cdc2ee',
  '0x9c4ec768c28520b50860ea7a15bd7213a9ff58bf',
  '0x78d0677032a35c63d142a48a2037048871212a8c',
  '0xa238dd80c259a72e81d7e4664a9801593f98d1c5',
  '0x8be473dcfa93132658821e67cbeb684ec8ea2e74',
  '0x03a520b32c04bf3beef7beb72e919cf822ed34f1',
  '0x30a4aa1d14d44f0f5bfe887447ab6facc94a549f',
  '0x70778cfcfc475c7ea0f24cc625baf6eae475d0c9',
]);

// Sorry for bad naming if any
export const DEX_INTERACTION = new Set([
  ...UNISWAP,
  ...ONEINCH,
  ...PENDLE,
  ...COW_SWAP,
  ...VELODROME,
  ...AERODROME,
  ...SHADOW,
  ...PANCAKE_SWAP,
  ...GMX,
]);

export const SWAP_INTERACTION = new Set(
  Array.from(DEX_INTERACTION).filter(element => !LP_INTERACTION.has(element))
);
export const LEND_BORROW_STAKE_INTERACTION = new Set([
  ...OTHER_DEFI,
  ...MOONWELL,
  ...CURVE,
  ...AAVE,
  ...VENUS,
  ...COMPOUND,
  ...SYNTHETIX,
  ...LIDO,
  ...SWELL,
  ...PUFFER_STAKING,
  ...EIGENLAYER_STAKING,
]);

export const ALL_DEFI_INTERACTION = new Set([...DEX_INTERACTION, ...LEND_BORROW_STAKE_INTERACTION]);

// Name service
export const ENS = new Set([
  '0x253553366da8546fc250f225fe3d25d0c782303b', // ethregistrarcontroller
  '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', // ethregistrarcontroller
  '0xa58e81fe9b61b5c3fe2afd33cf304c454abfc7cb', // eth reverse registrar

  '0x4ccb0bb02fcaba27e82a56646e81d8c5bc4119a5', // basenames registrarcontroller
  '0xd3e6775ed9b7dc12b205c8e608dc3767b9e5efda', // basenames registrarcontroller
]);

// Bridge
export const RELAY = new Set([
  '0xa5f565650890fba1824ee0f21ebbbf660a179934', // eth receiver
]);

export const BASE_BRIDGE = '0xea2a41c02fa86a4901826615f9796e603c6a4491'; // OG but deprecated
export const OP_BRIDGE = '0x4200000000000000000000000000000000000010';

// Acknowledgement: https://github.com/base-org/web/blob/master/apps/web/src/components/Basenames/UsernameProfileSectionHeatmap/contracts.ts
export const OTHER_BRIDGES = new Set([
  '0x8ed95d1746bf1e4dab58d8ed4724f1ef95b20db0',
  '0x0ac2d6f5f5afc669d3ca38f830dad2b4f238ad3f',
  '0xa6baaed2053058a3c8f11e0c7a9716304454b09e',
  '0x96e471b5945373de238963b4e032d3574be4d195',
  '0x43298f9f91a4545df64748e78a2c777c580573d6',
  '0x30b44c676a05f1264d1de9cc31db5f2a945186b6',
  '0xdfe0ec39291e3b60aca122908f86809c9ee64e90',
  '0x256c8919ce1ab0e33974cf6aa9c71561ef3017b6',
  '0x02fbb64517e1c6ed69a6faa3abf37db0482f1152',
  '0x7355efc63ae731f584380a9838292c7046c1e433',
  '0xbbbd1bbb4f9b936c3604906d7592a644071de884',
  '0x23122da8c581aa7e0d07a36ff1f16f799650232f',
  '0xb2535b988dce19f9d71dfb22db6da744acac21bf',
  '0xc840838bc438d73c16c2f8b22d2ce3669963cd48',
  '0xe4e2121b479017955be0b175305b35f312330bae',
  '0xcee284f754e854890e311e3280b767f80797180d',
  '0xd3b5b60020504bc3489d6949d545893982ba3011',
  '0xa3a7b6f88361f48403514059f1f16c8e78d60eec',
  '0x72ce9c846789fdb6fc1f34ac4ad25dd9ef7031ef',
  '0xd92023e9d9911199a6711321d1277285e6d4e2db',
  '0x8315177ab297ba92a06054ce80a67ed4dbd7ed3a',
  '0xe5896783a2f463446e1f624e64aa6836be4c6f58',
  '0xa10c7ce4b876998858b1a9e12b10092229539400',
  '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f',
  '0x667e23abd27e623c11d4cc00ca3ec4d0bd63337a',
  '0x0b9857ae2d4a3dbe74ffe1d7df045bb7f96e4840',
  '0x14797f5432f699cb4d4db04df599b74952d78d7b',
  '0x1c479675ad559dc151f6ec7ed3fbf8cee79582b6',
  '0xdac7bb7ce4ff441a235f08408e632fa1d799a147',
  '0x8eb8a3b98659cce290402893d0123abb75e3ab28',
  '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0',
  '0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2',
  '0x64192819ac13ef72bf6b5ae239ac672b43a9af08',
  '0x737901bea3eeb88459df9ef1be8ff3ae1b42a2ba',
  '0xf78765bd14b4e8527d9e4e5c5a5c11a44ad12f47',
  '0xecad1ab3464eccc7536af6afee414df873495616',
  '0x841ce48f9446c8e281d3f1444cb859b4a6d0738c',
  '0xc578cbaf5a411dfa9f0d227f97dadaa4074ad062',
  '0x5427fefa711eff984124bfbb1ab6fbf5e3da1820',
  '0xf1c1413096ff2278c3df198a28f8d54e0369cf3a',
  '0x74af8a878317e0f6e72e302fbcdf5f3009186398',
  '0x4add6ab943e7908bb51e7878755d0ca322c898d6',
  '0x3be8a7d4aa3e9b723a718e1b83fe8a8b5c37871c',
  '0x43de2d77bf8027e25dbd179b491e8d64f38398aa',
  '0xd54f502e184b6b739d7d27a6410a67dc462d69c8',
  '0x9280e0ffdfae4ec895fdf4d4978c9e1b869eb774',
  '0x9a8c4bdcd75cfa1059a6e453ac5ce9d3f5c82a35',
  '0x6880f6fd960d1581c2730a451a22eed1081cfd72',
  '0x3014ca10b91cb3d0ad85fef7a3cb95bcac9c0f79',
  '0x30f938fed5de6e06a9a7cd2ac3517131c317b1e7',
  '0x75ace7a086ea0fb1a79e43cc6331ad053d8c67cb',
  '0x88ad09518695c6c3712ac10a214be5109a655671',
  '0x4aa42145aa6ebf72e164c9bbc74fbd3788045016',
  '0x7e7669bdff02f2ee75b68b91fb81c2b38f9228c2',
  '0x6ea6c65e14661c0bcab5bc862fe5e7d3b5630c2f',
  '0x7301cfa0e1756b71869e93d4e4dca5c7d0eb0aa6',
  '0xa4108aa1ec4967f8b52220a4f7e94a8201f2d906',
  '0xfd53b1b4af84d59b20bf2c20ca89a6beeaa2c628',
  '0x2dccdb493827e15a5dc8f8b72147e6c4a5620857',
  '0x426a61a2127fdd1318ec0edce02474f382fdad30',
  '0xf9fb1c508ff49f78b60d3a96dea99fa5d7f3a8a6',
  '0xfe601de9d4295274b9904d5a9ad7069f23ee2b32',
  '0x4d34e61caf7a3622759d69e48ccdeb8dee5021e8',
  '0x1bd0029385f95ad2584cdfaf5c19f3f20651def6',
  '0xe2e3441004e7d377a2d97142e75d465e0dd36af9',
  '0xa929022c9107643515f5c777ce9a910f0d1e490c',
  '0x3d4cc8a61c7528fd86c55cfe061a78dcba48edd1',
  '0xb8901acb165ed027e32754e0ffe830802919727f',
  '0x22b1cbb8d98a01a3b71d034bb899775a76eb1cc2',
  '0x3666f603cc164936c1b87e207f36beba4ac5f18a',
  '0x3e4a3a4796d16c0cd582c382691998f7c06420b6',
  '0xb98454270065a31d71bf635f6f7ee6a518dfb849',
  '0x5fdcca53617f4d2b9134b29090c87d01058e27e9',
  '0x37acfef331e6063c8507c2a69c97b4f78c770a5a',
  '0x3307c46a1e9633025d2e89658c7502a683585450',
  '0x5a1d63d3e1303e89503f2a1ecb553328f148909d',
  '0x50002cdfe7ccb0c41f519c6eb0653158d11cd907',
  '0xf86fd6735f88d5b6aa709b357ad5be22cedf1a05',
  '0x66a71dcef29a0ffbdbe3c6a460a3b5bc225cd675',
  '0x014f808b7d4b6f58be5fef88002d5028cd0ed14b',
  '0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4',
  '0x674bdf20a0f284d710bc40872100128e2d66bd3f',
  '0xec3cc6cf0252565b56fc7ac396017df5b9b78a31',
  '0x3980c9ed79d2c191a89e02fa3529c60ed6e9c04b',
  '0xc10ef9f491c9b59f936957026020c321651ac078',
  '0xfc7cc7c7e7985316d23104b9689c511134f59bc8',
  '0x13b432914a996b0a48695df9b2d701eda45ff264',
  '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
  '0x87bcb3038988ca2a89605ffa8f237fb78df1c3ae',
  '0x46290b0c3a234e3d538050d8f34421797532a827',
  '0xd779967f8b511c5edf39115341b310022900efed',
  '0x923e0a17f49fb03d936f2af2d59d379c615f5447',
  '0xec4486a90371c9b66f499ff3936f29f0d5af8b7e',
  '0x10c6b61dbf44a083aec3780acf769c77be747e23',
  '0xe4cf417081a0ab3f964b44d904bc2b534351a9a7',
  '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
  '0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284',
  '0x6b7a87899490ece95443e979ca9485cbe7e71522',
  '0x765277eebeca2e31912c9946eae1021199b39c61',
  '0xba8da9dcf11b50b03fd5284f164ef5cdef910705',
  '0x4e67df0f232c3bc985f8a63326d80ce3d9a40400',
  '0x8cc49fe67a4bd7a15674c4ffd4e969d94304bbbf',
  '0x57ed6bd35a6ce815079855cd0b21331d1d5d0a0e',
  '0xcdd83050f045ab31b884f0dc49581bc7b3e0b84c',
  '0x23ddd3e3692d1861ed57ede224608875809e127f',
  '0x2d6775c1673d4ce55e1f827a0d53e62c43d1f304',
  '0x88a69b4e698a4b090df6cf5bd7b2d47325ad30a3',
  '0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b',
  '0x3eed23ea148d356a72ca695dbce2fceb40a32ce0',
  '0x48d7a6bbc428bca019a560cf3e8ea5364395aad3',
  '0xdc1664458d2f0b6090bea60a8793a4e66c2f1c00',
  '0x6a39909e805a3eadd2b61fff61147796ca6abb47',
  '0x4fc16de11deac71e8b2db539d82d93be4b486892',
  '0x2784a755690453035f32ac5e28c52524d127afe2',
  '0x10e6593cdda8c58a1d0f14c5164b376352a55f2f',
  '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1',
  '0x467194771dae2967aef3ecbedd3bf9a310c76c65',
  '0x1bf68a9d1eaee7826b3593c20a0ca93293cb489a',
  '0xeec0fb4913119567cdfc0c5fc2bf8f9f9b226c2d',
  '0xcd38b15a419491c7c1238b0659f65c755792e257',
  '0x8f92e7353b180937895e0c5937d616e8ea1a2bb9',
  '0x2140ecdc45c89ca112523637824513bae72c8671',
  '0x4c36d2919e407f0cc2ee3c993ccf8ac26d9ce64e',
  '0xa0c68c638235ee32657e8f720a23cec1bfc77c77',
  '0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf',
  '0x8484ef722627bf18ca5ae6bcf031c23e6e922b30',
  '0x401f6c983ea34274ec46f84d70b31c151321188b',
  '0xa68d85df56e733a06443306a095646317b5fa633',
  '0xf687e1481d85f8b9f4d1f4d4c15348cef8e5a762',
  '0xe4b679400f0f267212d5d812b95f58c83243ee71',
  '0x32666b64e9fd0f44916e1378efb2cfa3b3b96e80',
  '0x5d22045daceab03b158031ecb7d9d06fad24609b',
  '0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d',
  '0xd8b19613723215ef8cc80fc35a1428f8e8826940',
  '0xf4b00c937b4ec4bb5ac051c3c719036c668a31ec',
  '0xeae57ce9cc1984f202e15e038b964bb8bdf7229a',
  '0xf5c9f957705bea56a7e806943f98f7777b995826',
  '0x659a00c33263d9254fed382de81349426c795bb6',
  '0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419',
  '0xf6080d9fbeebcd44d89affbfd42f098cbff92816',
  '0xbb3400f107804dfb482565ff1ec8d8ae66747605',
  '0x283751a21eafbfcd52297820d27c1f1963d9b5b4',
  '0x2796317b0ff8538f253012862c06787adfb8ceb6',
  '0xa2569370a9d4841c9a62fc51269110f2eb7e0171',
  '0x6571d6be3d8460cf5f7d6711cd9961860029d85f',
  '0x045e507925d2e05d114534d0810a1abd94aca8d6',
  '0xcd9d4988c0ae61887b075ba77f08cbfad2b65068',
  '0x5fd79d46eba7f351fe49bff9e87cdea6c821ef9f',
  '0xc145990e84155416144c532e31f89b840ca8c2ce',
  '0x4103c267fba03a1df4fe84bc28092d629fa3f422',
  '0x86ca49d37015a8541642b1b5a90af0115ec61994',
  '0xf301d525da003e874df574bcdd309a6bf0535bb6',
  '0x98f3c9e6e3face36baad05fe09d375ef1464288b',
  '0x3ee18b2214aff97000d974cf647e7c347e8fa585',
  '0xf92cd566ea4864356c5491c177a430c222d7e678',
  '0x31efc4aeaa7c39e54a33fdc3c46ee2bd70ae0a09',
  '0xe34b087bf3c99e664316a15b01e5295eb3512760',
  '0x104b9b1c41c6764e88edf1207f498902d840fe2a',
  '0x0dd1f24cf4ff96f197a795d02d0ba1eb53448bcc',
  '0x8eca806aecc86ce90da803b080ca4e3a9b8097ad',
  '0x6de5bdc580f55bc9dacafcb67b91674040a247e3',
  '0x5cdaf83e077dbac2692b5864ca18b61d67453be8',
  '0xabea9132b05a70803a4e85094fd0e1800777fbef',
  '0xc30141b657f4216252dc59af2e7cdb9d8792e1b0',
  '0x49048044d57e1c92a77f79988d21fa8faf74e97e',
  '0x3154cf16ccdb4c6d922629664174b904d80f2c35',
  '0x3a23f943181408eac424116af7b7790c94cb97a5',
  '0x09aea4b2242abc8bb4bb78d537a67a245a7bec64',
]);
