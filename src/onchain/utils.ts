import { JsonRpcProvider } from 'ethers'
import { ACTIVE_CHAINS } from './chains'
import type { Provider } from 'ethers'
import { RocketSam__factory, type RocketSam } from '@/types/ethers-contracts'
import type { Signer } from 'ethers'
import type { Chain } from '@/types'

export const formatAddress = (address: string, from = 6, to = 5, uppercase = false) => {
  if (uppercase) address = address.toUpperCase().replace('0X', '0x')
  return address.slice(0, from) + '...' + address.slice(-to)
}

export const Sam = (address: string, chain: number, signer?: Signer | Provider) => {
  console.log('Create contract', address, chain, signer)
  if (!signer) {
    const network = ACTIVE_CHAINS.find((i) => i.id === chain) as Chain
    signer = new JsonRpcProvider(network.rpcUrl)
  }

  return RocketSam__factory.connect(address, signer) as RocketSam
}
