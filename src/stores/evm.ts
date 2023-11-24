import { defineStore } from 'pinia'

import { ACTIVE_CHAINS } from '@/onchain/chains'
import { formatAddress } from '@/onchain/utils'

type evmStore = {
  address: string | null
  chain: string | null
  wallet: any | 'MetaMask'
}

export const useEvmStore = defineStore('evm', {
  state: (): evmStore => ({
    address: null,
    chain: null,
    wallet: null
  }),

  getters: {
    formatted: (state) => formatAddress(state.address?.toLowerCase() || '0x', 6),
    chainInfo: (state) => ACTIVE_CHAINS.find((i) => i.chainId === state.chain)
  },

  actions: {
    setWallet(wallet: any) {
      if (!wallet) {
        this.address = null
        this.chain = null
        this.wallet = null
      } else {
        this.wallet = wallet
        this.address = wallet?.accounts[0]?.address
        this.chain = wallet?.chains[0]?.id
      }
    },
    setChain(chain: any) {
      this.chain = chain?.id || chain
    },
    getSinger() {}
  }
})
