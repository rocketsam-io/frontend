import { ACTIVE_CHAINS } from '@/onchain/chains'
import type { Chain } from '@/types'
import { defineStore } from 'pinia'

const DEV = import.meta.env.DEV

type Config = {
  settings: any
  chains: Chain[]
  currentChain: Chain
}

export const useConfigStore = defineStore('config', {
  state: (): Config => ({
    settings: {
      fuel: parseFloat(import.meta.env.VITE_FUEL) || 1,
      season: parseInt(import.meta.env.VITE_SEASON) || 1,
      starknet: import.meta.env.VITE_STARKNET === 'true' || false,
      boost: import.meta.env.VITE_BOOST === 'true' || false,
      dafault: parseInt(import.meta.env.VITE_DEFAULT_CHAIN) || 42170
    },
    chains: ACTIVE_CHAINS,
    currentChain: ACTIVE_CHAINS[0]
  }),

  getters: {
    evmChains: (state) => state.chains.filter((i) => i.chainType === 'evm'),
    onboardChains() {
      return Object.values(this.evmChains).map((chain: Chain) => ({
        id: chain.id,
        token: chain.nativeCurrency.symbol,
        label: chain.name,
        rpcUrl: chain.rpcUrl,
        icon: chain?.icon || `${chain.name.toLowerCase()}.svg`,
        blockExplorerUrl: chain.blockExplorerUrl
      }))
    },
    starknetChains: (state) => state.chains?.filter((i) => i.chainType === 'starknet'),
    allChains: (state) => Object.values(state.chains) as Chain[]
  },

  actions: {
    setCurrentSiteChain(chain: string | number) {
      const availiableChain = this.chains.find((c) => c.id === chain || c.chainId === chain)
      if (availiableChain) {
        console.log('Set current site chain:', availiableChain.fullname)
        this.currentChain = availiableChain

        const page = this.router.currentRoute.value.name?.toString()
        console.log('Current page namespace:', page)
        if (page && ['Leaderboard', 'Pools'].includes(page))
          this.router.push({
            name: page,
            params: {
              chain: availiableChain.name.toLowerCase()
            }
          })
      }
    },
    init() {
      try {
        const active = import.meta.env.VITE_ACTIVE_CHAINS.split(',').map((i: string) => Number(i))
        this.chains = ACTIVE_CHAINS.filter((i) => active.includes(i.id) && i.pools.length > 0)

        this.setCurrentSiteChain(this.settings.dafault)
      } catch (error) {
        console.error('Error fetching the config:', error)
      }
    }
  }
})
