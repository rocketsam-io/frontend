import { ACTIVE_CHAINS } from '@/onchain/chains'
import type { Chain } from '@/types'
import { defineStore } from 'pinia'

const DEV = import.meta.env.DEV

type Config = {
  logs: boolean
  settings: any
  chains: Chain[]
  currentChain: Chain
}

export const useConfigStore = defineStore('config', {
  state: (): Config => ({
    logs: import.meta.env.VITE_DEV === 'true' ? true : false,
    settings: {
      fuel: parseFloat(import.meta.env.VITE_FUEL) || 1,
      season: parseInt(import.meta.env.VITE_SEASON) || 1,
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
    setSiteChain(chain: string | number) {
      const availiableChain = this.chains.find(
        (c) =>
          c.id === chain ||
          c.chainId === chain ||
          c.name.toLowerCase() === String(chain).toLowerCase()
      )
      if (this.logs) console.log('Chain availiable:', chain, availiableChain)

      if (availiableChain) {
        if (this.logs) console.log('Set current site chain:', availiableChain.fullname)
        this.currentChain = availiableChain
      }
      return availiableChain
    },
    setCurrentSiteChain(chain: string | number) {
      const newChain = this.setSiteChain(chain)
      if (newChain) {
        const page = this.router.currentRoute.value.name?.toString()
        if (this.logs) console.log('Current page namespace:', page)
        if (page && ['Leaderboard', 'Pools'].includes(page))
          this.router.push({
            name: page,
            params: {
              chain: newChain.name.toLowerCase()
            }
          })
      }
    },
    init() {
      try {
        this.chains = ACTIVE_CHAINS.filter(
          (i) => i.network === import.meta.env.VITE_ACTIVE_CHAINS && i.pools.length > 0
        )

        this.setCurrentSiteChain(this.settings.dafault)
      } catch (error) {
        console.error('Error fetching the config:', error)
      }
    }
  }
})
