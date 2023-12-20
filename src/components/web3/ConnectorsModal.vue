<script setup lang="ts">
import IconConnected from '@/components/icons/IconConnected.vue'
import { useOnboard } from '@web3-onboard/vue'

import { useConfigStore } from '@/stores/config'
import { ref, watch, defineProps } from 'vue'

import { useEvmStore } from '@/stores/evm'
import { useStarknetStore } from '@/stores/starknet'

import * as StarknetCore from 'get-starknet-core'
import { getStoreVersionFromBrowser } from '@/onchain/utils'

const config = useConfigStore()
const evm = useEvmStore()
const starknet = useStarknetStore()

// EVM
const {
  connectWallet,
  connectedWallet,
  connectedChain,
  disconnectConnectedWallet
} = useOnboard()

let wallet = {
  name: 'Injected Wallet',
  icon: 'blocknative.svg'
}

// @ts-ignore
const { ethereum } = window

if (ethereum?.isRabby)
  wallet = {
    name: 'Rabby Wallet',
    icon: 'rabby.svg'
  }
else if (ethereum?.isMetaMask)
  wallet = {
    name: 'MetaMask',
    icon: 'metamask.svg'
  }

// Starknet
export type starknetWallets = "Argent X" | "Braavos"
const connectStarknet = async (wallet: starknetWallets) => {
  console.log('Connecting...', wallet)

  try {
    const extensions = await StarknetCore.default.getDiscoveryWallets()
    const availableWallets = await StarknetCore.default.getAvailableWallets()

    const lastConnectedWallet = await StarknetCore.default.getLastConnectedWallet()

    if (config.logs) console.log('lastConnectedWallet', lastConnectedWallet)

    let walletToConnect = undefined

    if (config.logs) console.log(availableWallets)

    walletToConnect = [...availableWallets].find(i => i.name === wallet)

    if (walletToConnect) {
      const wallet = await StarknetCore.default.enable(walletToConnect, { starknetVersion: "v5" })
      starknet.setWallet(wallet)
    } else {
      // @ts-ignore
      window.open(extensions.find((i: any) => i.name === wallet).downloads[getStoreVersionFromBrowser()], '_blank')
    }

    config.setCurrentSiteChain('starknet')

  } catch (error) {
    if (config.logs) console.log('STARKNET WALLET TOOGLE ERROR', error)
  }
}

// Connect actions
const connect = async (namespace: 'evm' | 'starknet', wallet?: starknetWallets) => {
  emit('toggle')
  if (namespace === 'evm') await connectWallet()
  if (namespace === 'starknet' && wallet) await connectStarknet(wallet)
}

const disconnect = async (namespace: 'evm' | 'starknet') => {
  emit('toggle')
  if (namespace === 'evm') await disconnectConnectedWallet()
  if (namespace === 'starknet') {
    await StarknetCore.default.disconnect({ clearLastWallet: true })
    starknet.setWallet(null)
  }
}

const props = defineProps(['active'])
const emit = defineEmits(['toggle'])

</script>

<template lang="pug">
.modal(:class="{'is-active': props.active }")
  .modal-background(@click="emit('toggle')")
  .modal-content
    .modal-close.is-large(@click="emit('toggle')")
    .title Connect Wallet
    .field.mb-5
      .subtitle EVM
        IconConnected.icon(:class="{'is-active': evm.wallet }")
        .disconnect(v-if="connectedWallet" @click="disconnect('evm')") Disconnect

      .buttons.has-addons
        .button.is-fullwidth.is-ghost.is-normal.is-justify-content-left.is-rounded(@click="connect('evm')")
          .icon
            img(:src="`/assets/wallets/${wallet.icon}`")
          span {{ wallet.name }}

    .field
      .subtitle StarkNet
        IconConnected.icon(:class="{'is-active': starknet.wallet }")
        .disconnect(v-if="starknet.wallet" @click="disconnect('starknet')") Disconnect

      .buttons
        .button.is-fullwidth.is-ghost.is-normal.is-justify-content-left.is-rounded(@click="connect('starknet', 'Argent X')")
          .icon
            img(src="/assets/wallets/argent.svg")
          span Argent X
        .button.is-fullwidth.is-ghost.is-normal.is-justify-content-left.is-rounded(@click="connect('starknet', 'Braavos')")
          .icon
            img(src="/assets/wallets/braavos.svg")
          span Braavos

</template>

<style lang="scss" scoped>
.button[disabled] {
  background-color: transparent;
  border-color: transparent;
}

.disconnect {
  cursor: pointer;
  margin-left: auto;
  padding: 0.28rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255);
  opacity: 0.6;

  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;

  &:hover {
    opacity: 0.7;
    background: rgba(255, 255, 255, 0.04);
  }
}
</style>