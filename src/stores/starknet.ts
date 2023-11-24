import { defineStore } from 'pinia'

export const useStarknetStore = defineStore('starknet', {
  state: () => ({
    address: null,
    provider: undefined,
    wallet: null,
    connectedWallet: null
  }),

  getters: {},

  actions: {
    setProvider(provider: any) {
      this.provider = provider
    },
    setWallet(wallet: any) {
      this.wallet = wallet
    },
    setConnectedWallet(wallet: any) {
      this.connectedWallet = wallet
    }
  }
})
