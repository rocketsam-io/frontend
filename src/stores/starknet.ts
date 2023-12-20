import { defineStore } from 'pinia'

import { formatAddress } from '@/onchain/utils'

type evmStore = {
  address: string | null
  wallet: any | 'Argent X'
}

export const useStarknetStore = defineStore('starknet', {
  state: (): evmStore => ({
    wallet: null,
    address: null
  }),

  getters: {
    formatted: (state) => formatAddress(state.address?.toLowerCase() || '0x', 6)
  },

  actions: {
    setWallet(wallet: any) {
      console.log('Set starknet wallet', wallet)
      if (!wallet) {
        this.address = ''
        this.wallet = null
        localStorage.removeItem('starknet')
      } else {
        this.wallet = wallet
        this.address = wallet.selectedAddress
        if (this.address) localStorage.setItem('starknet', this.address)
      }
    }
  }
})
