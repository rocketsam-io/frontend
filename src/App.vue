<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from './components/LayoutHeader.vue'

import { init, useOnboard } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'

import { useChainsStore } from '@/stores/config'
import { watch } from 'vue'
import { useEvmStore } from '@/stores/evm'
import type { ConnectedChain, WalletState } from '@web3-onboard/core'

const config = useChainsStore()
const evm = useEvmStore()

// Initialize chains
config.init()
console.log('Active chains:', config.onboardChains.map(i => i.label).join(', '))

// Initalize connector
const injected = injectedModule()
init({
  wallets: [injected],
  chains: config.onboardChains,
  accountCenter: {
    desktop: {
      enabled: false,
      minimal: true
    },
    mobile: {
      enabled: false,
      minimal: true
    }
  },
  connect: {
    autoConnectLastWallet: true
  }
})

const {
  connectWallet,
  connectedWallet,
  connectedChain
} = useOnboard()

watch(connectedWallet, (wallet: WalletState | null) => {
  console.log('11111', wallet)
  if (wallet) evm.setWallet(wallet)
})
watch(connectedChain, (chain: ConnectedChain | null) => {
  if (chain) evm.setChain(chain.id)
})

</script>

<template>
  <LayoutHeader />
  <RouterView />
</template>