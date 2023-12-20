import type { JsonRpcApiProvider } from 'ethers'
import type { RocketSam } from './ethers-contracts'

export type Currency = {
  name: string
  symbol: string
  decimals: number
}

export type Chain = {
  id: number
  chainId: string
  name: string
  chainType: 'evm'
  icon: string
  fullname: string
  network: 'Mainnet' | 'Testnet'
  website?: string
  nativeCurrency: Currency
  rpcUrl: string
  faucetUrl?: string
  blockExplorerUrl: string
  features?: { name: string }[]
  provider: JsonRpcApiProvider
  pools: string[]
  contracts: RocketSam[]
}

export type Pool = {
  address: string
  contract: RocketSam
  chain: Chain
}

export type User = {
  rank: number
  address: string
  boost: number
  daily_points: number
  points: number
}
