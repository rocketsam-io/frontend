<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from './components/LayoutHeader.vue'

import { init, useOnboard } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'

import { useConfigStore } from '@/stores/config'
import { watch } from 'vue'
import { useEvmStore } from '@/stores/evm'
import type { ConnectedChain, WalletState } from '@web3-onboard/core'
import { getStarknet } from 'get-starknet-core'
import { useStarknetStore } from './stores/starknet'

const config = useConfigStore()
const evm = useEvmStore()
const starknet = useStarknetStore()

// Initialize All active chains
config.init()
if (config.logs) console.log('Active chains:', config.onboardChains.map(i => i.label).join(', '))

// Initalize EVM connector
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
  connectedWallet,
  connectedChain
} = useOnboard()

watch(connectedWallet, (wallet: WalletState | null) => {
  if (config.logs) console.log('Set wallet from provider', wallet)
  if (wallet) evm.setWallet(wallet)
})

watch(connectedChain, (chain: ConnectedChain | null) => {
  if (config.logs) console.log('Set chain from provider', chain)
  if (chain) evm.setChain(chain.id)
})

// Initalize Starknet Wallet

getStarknet().getLastConnectedWallet().then(async (wallet) => {
  if (wallet) {
    if (config.logs) console.log('Set starknet wallet', wallet.name)
    wallet = await getStarknet().enable(wallet, { starknetVersion: 'v5' })
    starknet.setWallet(wallet)
  }
})

</script>

<template>
  <LayoutHeader />
  <RouterView />
</template>