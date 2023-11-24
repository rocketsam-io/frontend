<script setup lang="ts">
import IconConnected from '@/components/icons/IconConnected.vue'
import { useOnboard } from '@web3-onboard/vue'

import { useConfigStore } from '@/stores/config'
import { ref, watch, defineProps } from 'vue'

import { useEvmStore } from '@/stores/evm'
import { useStarknetStore } from '@/stores/starknet'

const config = useConfigStore()
const evm = useEvmStore()
const starknet = useStarknetStore()

const {
  connectWallet,
  connectedWallet,
  connectedChain,
  disconnectConnectedWallet
  // alreadyConnectedWallets,
  // disconnectConnectedWallet,
  // getChain,
  // // switchChain,
  // // connect,
  // // disconnect,
  // setChain,
  // wallets
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

// Connect actions
const connect = async (namespace: 'evm' | 'starknet', wallet?: string) => {
  emit('toggle')
  if (namespace === 'evm') await connectWallet()
  // if (namespace === 'starknet') await connectStarknet(wallet)
}
const disconnect = async (namespace: 'evm' | 'starknet') => {
  emit('toggle')
  if (namespace === 'evm') await disconnectConnectedWallet()
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
      .buttons
        .button.is-fullwidth.is-ghost.is-normal.is-justify-content-left.is-rounded(@click="connect('starknet', 'argent')" disabled="true")
          .icon
            img(src="/assets/wallets/argent.svg")
          span Argent X
        .button.is-fullwidth.is-ghost.is-normal.is-justify-content-left.is-rounded(@click="connect('starknet', 'braavos')" disabled="true")
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