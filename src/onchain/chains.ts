import type { Chain } from '@/types'
import { JsonRpcProvider } from 'ethers'
import { Network } from 'ethers'
import { RocketSam__factory, type RocketSam } from '@/types/ethers-contracts'

const allChains: any[] = [
  {
    id: 204,
    name: 'opBNB',
    chainType: 'evm',
    icon: 'opbnb.svg',
    fullname: 'opBNB',
    network: 'Mainnet',
    website: 'https://opbnb.bnbchain.org',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrl: 'https://opbnb-mainnet-rpc.bnbchain.org',
    blockExplorerUrl: 'https://mainnet.opbnbscan.com',
    features: [
      {
        name: 'EIP1559'
      }
    ]
  },
  {
    id: 324,
    name: 'zkSync',
    chainType: 'evm',
    icon: 'zksync.svg',
    fullname: 'zkSync Era',
    network: 'Mainnet',
    website: 'https://zksync.io',
    nativeCurrency: {
      name: 'zkSync',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://zksync2-mainnet.zksync.io',
    blockExplorerUrl: 'https://explorer.zksync.io',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0xbc6C8BbBD06b6785cF898C3a69DbAE56527dEF10',
      '0x267e930bb2cb5d3d62564c20b947ad8839c8f7b6',
      '0x5b35d48acdc790ebb94523a100a20e97c937de29',
      '0xb959a457c54b03d8bf1d126c3baca8ee2cd967f2',
      '0x65b82bd5a83ff082f723ebf4187b7739ad13e230',
      '0xe771b992d2af7d0d99bc93c83cc9c254787e47a8',
      '0x0b6662b53560ca1b4b22e15bd3cf692e864a733c',
      '0xe6bcb3c91982f5f63e4b19b8130a10767762e2a9',
      '0x07068c8e44a4f4816b3921178ccec6cd4d9a4e14',
      '0x59f6cef0843f3506b214055ad6fd3c385f83d1ad'
    ]
  },
  {
    id: 1088,
    name: 'Metis',
    chainType: 'evm',
    icon: 'metis.svg',
    fullname: 'Metis',
    network: 'Mainnet',
    website: 'https://www.metis.io',
    nativeCurrency: {
      name: 'Metis',
      symbol: 'METIS',
      decimals: 18
    },
    rpcUrl: 'https://andromeda.metis.io/?owner=1088',
    blockExplorerUrl: 'https://andromeda-explorer.metis.io'
  },
  {
    id: 1101,
    name: 'zkEVM',
    chainType: 'evm',
    icon: 'zkevm.svg',
    fullname: 'Polygon zkEVM',
    network: 'Mainnet',
    website: 'https://polygon.technology/polygon-zkevm',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://zkevm-rpc.com',
    blockExplorerUrl: 'https://zkevm.polygonscan.com'
  },
  {
    id: 5e3,
    name: 'Mantle',
    chainType: 'evm',
    icon: 'mantle.svg',
    fullname: 'Mantle',
    network: 'Mainnet',
    website: 'https://mantle.xyz',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18
    },
    rpcUrl: 'https://rpc.mantle.xyz',
    blockExplorerUrl: 'https://explorer.mantle.xyz',
    pools: ['0x1077df51A4059477826549101a30a70b9579A08B']
  },
  {
    id: 7001,
    name: 'ZetaChain',
    chainType: 'evm',
    icon: 'zetachain.svg',
    fullname: 'ZetaChain',
    network: 'Testnet',
    website: 'https://zetachain.com',
    nativeCurrency: {
      name: 'ZETA',
      symbol: 'ZETA',
      decimals: 18
    },
    rpcUrl: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
    faucetUrl: 'https://labs.zetachain.com/get-zeta',
    blockExplorerUrl: 'https://zetachain-athens-3.blockscout.com',
    features: [
      {
        name: 'EIP1559'
      }
    ]
  },
  {
    id: 8453,
    name: 'Base',
    chainType: 'evm',
    icon: 'base.svg',
    fullname: 'Base',
    network: 'Mainnet',
    website: 'https://base.org',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://base.llamarpc.com',
    blockExplorerUrl: 'https://basescan.org',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0x634607B44e21F4b71e7bD5e19d5b8E4dC99Ab9C4',
      '0x1077df51A4059477826549101a30a70b9579A08B',
      '0x802DbB9efE447f8e4f578EB7add3F7e43E89C529',
      '0x0c9Bfb785E6582A15d6523252675abaA7350Bf76',
      '0x288df8088905D71Ff052bf052f3A0ff11A6CDa46',
      '0x2B4a7822F3de8bd6cb0552f562b40a391890E945',
      '0x553a8EFa12d333c864c89CB809D68268C836B70a',
      '0x5ae3cB086887A6FB7662eE58Cf1d5113E69bBA62',
      '0x1feF777Fb93Aa45a6Cefcf5507c665b64b301FB3',
      '0x0557D4C04BB994719b087d2950841BF25cf39899'
    ]
  },
  {
    id: 42161,
    name: 'Arbitrum',
    chainType: 'evm',
    icon: 'arbitrum.svg',
    fullname: 'Arbitrum One',
    network: 'Mainnet',
    website: 'https://arbitrum.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://rpc.ankr.com/arbitrum',
    blockExplorerUrl: 'https://arbiscan.io',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0x8e9067e9cab56bf4690b4d6fbe4d12260dc63eb2',
      '0x553a8EFa12d333c864c89CB809D68268C836B70a',
      '0x5ae3cB086887A6FB7662eE58Cf1d5113E69bBA62',
      '0x0557D4C04BB994719b087d2950841BF25cf39899',
      '0x70f445C078D699E173d66c3b55098fe6D9Dbd6F4',
      '0x366FB130510Ea17853E06A9791EA3326Bdbb4a13',
      '0xF330c18BdBA381366016A5C4d65D4B340E77c108',
      '0x5aD05713f9e2dF30834913d3f94f0fDc27e49031',
      '0x363df9b72EC83c7d4Fd60A61eF4629BFdc8A7Dbf',
      '0xAb8848bB1883B2b5DfEb170D8362667e937cdd36'
    ]
  },
  {
    id: 42170,
    name: 'Nova',
    chainType: 'evm',
    icon: 'nova.svg',
    fullname: 'Arbitrum Nova',
    network: 'Mainnet',
    website: 'https://arbitrum.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://nova.arbitrum.io/rpc',
    blockExplorerUrl: 'https://nova.arbiscan.io',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0x80C7E6B91a33b2D956F01092B1E60EEc6e957dc9',
      '0x634607B44e21F4b71e7bD5e19d5b8E4dC99Ab9C4',
      '0x1077df51A4059477826549101a30a70b9579A08B',
      '0x802DbB9efE447f8e4f578EB7add3F7e43E89C529',
      '0x0c9Bfb785E6582A15d6523252675abaA7350Bf76',
      '0x288df8088905D71Ff052bf052f3A0ff11A6CDa46',
      '0x2B4a7822F3de8bd6cb0552f562b40a391890E945',
      '0x553a8EFa12d333c864c89CB809D68268C836B70a',
      '0x5ae3cB086887A6FB7662eE58Cf1d5113E69bBA62',
      '0x1feF777Fb93Aa45a6Cefcf5507c665b64b301FB3'
    ]
  },
  {
    id: 59144,
    name: 'Linea',
    chainType: 'evm',
    icon: 'linea.svg',
    fullname: 'Linea',
    network: 'Mainnet',
    website: 'https://linea.build',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://rpc.ankr.com/linea',
    blockExplorerUrl: 'https://lineascan.build',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0x80C7E6B91a33b2D956F01092B1E60EEc6e957dc9',
      '0x1077df51A4059477826549101a30a70b9579A08B',
      '0x802DbB9efE447f8e4f578EB7add3F7e43E89C529',
      '0x0c9Bfb785E6582A15d6523252675abaA7350Bf76',
      '0x288df8088905D71Ff052bf052f3A0ff11A6CDa46',
      '0x2B4a7822F3de8bd6cb0552f562b40a391890E945',
      '0x553a8EFa12d333c864c89CB809D68268C836B70a',
      '0x5ae3cB086887A6FB7662eE58Cf1d5113E69bBA62',
      '0x1feF777Fb93Aa45a6Cefcf5507c665b64b301FB3',
      '0x0557D4C04BB994719b087d2950841BF25cf39899'
    ]
  },
  {
    id: 34443,
    name: 'Mode',
    chainType: 'evm',
    icon: 'mode.svg',
    fullname: 'Mode',
    network: 'Mainnet',
    website: 'https://www.mode.network',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://mode.drpc.org',
    blockExplorerUrl: 'https://modescan.io',
    pools: ['0x80C7E6B91a33b2D956F01092B1E60EEc6e957dc9']
  },
  {
    id: 59140,
    name: 'Linea',
    chainType: 'evm',
    icon: 'linea.svg',
    fullname: 'Linea Goerli',
    network: 'Goerli',
    website: 'https://linea.build',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://rpc.goerli.linea.build',
    faucetUrl: 'https://faucet.goerli.linea.build',
    blockExplorerUrl: 'https://goerli.lineascan.build',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0xBa5Aadd72073259eBd0a979f43d924B3Eb098D75',
      '0xA0292011d303e7dC0b54f7309c366BDb385C4e52',
      '0xae3C715AAd50d5264820D99bAEA4A4D78E8dB337',
      '0xa29803D9B8677Fd35A1d454B70B53a1cf27f66Dd',
      '0x4E500046E6f613e1AFe03034df7A79937ce141b5',
      '0xF5b051fb51936dde656e77462C0f74a0b01F30Eb',
      '0x0212c05c5d490C1C41aeFFdAb820Da105f96DFdf',
      '0x765a9043955FB823992AaF289fD40435bCc6C9dC',
      '0x12850292A72EFC49d586600D73F607C099F26193',
      '0x848c382f9e153A2A4E51f6aA1aaa24B5B4a70abF'
    ]
  },
  {
    id: 534352,
    name: 'Scroll',
    chainType: 'evm',
    icon: 'scroll.svg',
    fullname: 'Scroll',
    network: 'Mainnet',
    website: 'https://scroll.io',
    nativeCurrency: {
      name: 'Scroll',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://rpc.scroll.io',
    blockExplorerUrl: 'https://scrollscan.com',
    pools: [
      '0x634607B44e21F4b71e7bD5e19d5b8E4dC99Ab9C4',
      '0x1077df51A4059477826549101a30a70b9579A08B',
      '0x802DbB9efE447f8e4f578EB7add3F7e43E89C529',
      '0x0c9Bfb785E6582A15d6523252675abaA7350Bf76',
      '0x288df8088905D71Ff052bf052f3A0ff11A6CDa46',
      '0x2B4a7822F3de8bd6cb0552f562b40a391890E945',
      '0x553a8EFa12d333c864c89CB809D68268C836B70a',
      '0x5ae3cB086887A6FB7662eE58Cf1d5113E69bBA62',
      '0x1feF777Fb93Aa45a6Cefcf5507c665b64b301FB3',
      '0x0557D4C04BB994719b087d2950841BF25cf39899'
    ]
  },
  {
    id: 7777777,
    name: 'Zora',
    chainType: 'evm',
    icon: 'zora.svg',
    fullname: 'Zora',
    network: 'Mainnet',
    website: 'https://zora.energy',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://rpc.zora.energy',
    blockExplorerUrl: 'https://explorer.zora.energy',
    features: [
      {
        name: 'EIP1559'
      }
    ],
    pools: [
      '0x634607B44e21F4b71e7bD5e19d5b8E4dC99Ab9C4',
      '0x1077df51A4059477826549101a30a70b9579A08B',
      '0x802DbB9efE447f8e4f578EB7add3F7e43E89C529',
      '0x0c9Bfb785E6582A15d6523252675abaA7350Bf76',
      '0x288df8088905D71Ff052bf052f3A0ff11A6CDa46',
      '0x2B4a7822F3de8bd6cb0552f562b40a391890E945',
      '0x553a8EFa12d333c864c89CB809D68268C836B70a',
      '0x5ae3cB086887A6FB7662eE58Cf1d5113E69bBA62',
      '0x1feF777Fb93Aa45a6Cefcf5507c665b64b301FB3',
      '0x80C7E6B91a33b2D956F01092B1E60EEc6e957dc9'
    ]
  }
]

export const ACTIVE_CHAINS: Chain[] = allChains.map((chain) => {
  chain.chainId = '0x' + chain.id.toString(16)

  if (!chain.pools) chain.pools = []

  const network = Network.from(chain.id)
  console.log(network)
  chain.provider = new JsonRpcProvider(chain.rpcUrl, network, { staticNetwork: network })
  chain.contracts = chain.pools.map(
    (pool: string) => RocketSam__factory.connect(pool, chain.provider) as RocketSam
  )
  return chain
})
