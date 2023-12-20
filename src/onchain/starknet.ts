import * as StarknetCore from 'get-starknet-core'
import { Contract, RpcProvider, uint256 } from 'starknet'
import { ERC20_ABI } from '@/abi/ERC20'

export const getWallets = async () => {
  const discoveryWallets = await StarknetCore.default.getDiscoveryWallets()
  const availableWallets = await StarknetCore.default.getAvailableWallets()

  console.log('discoveryWallets', discoveryWallets)
  console.log('availableWallets', availableWallets)
}

const provider = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.public.blastapi.io' })

export const ether = (walletOrProvider = provider) =>
  new Contract(
    ERC20_ABI,
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    walletOrProvider
  )

export const getBalance = async (address: string) =>
  ether()
    .balanceOf(address)
    .then((r: any) => uint256.uint256ToBN(r.balance))
