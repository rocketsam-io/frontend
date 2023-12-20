<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'

import { formatAddress } from '@/onchain/utils'
import { useOnboard } from '@web3-onboard/vue'

const config = useConfigStore()
const evm = useEvmStore()

// EVM
const {
  connectWallet,
  connectingWallet,
  connectedWallet,
  connectedChain,
  alreadyConnectedWallets,
  disconnectConnectedWallet,
  getChain,
  setChain,
  wallets
} = useOnboard()

const switchNetwork = () => setChain({ wallet: evm.wallet.label, chainId: config.currentChain.chainId })

// Blocknative directly
const toggle = async () => {
  return connectWallet()
}

</script>

<template lang="pug">
.navbar-item
  .button.is-primary.is-rounded(
    v-if="!evm.address"
    @click="toggle()"
  ) {{ connectingWallet ? 'Connecting...' : 'Connect wallet' }}
  .button.is-rounded.is-connected(v-if="connectedWallet" @click="!evm.chainInfo ? switchNetwork() :toggle()")
    .icon(v-if="!evm.chainInfo")
      img(v-if="evm.chainInfo" :src="'/assets/chains/' + evm.chainInfo?.icon")
      img(v-else src="/assets/chains/switch.svg" alt='Switch Network' @click="switchNetwork()")
    span {{ evm.formatted }}

</template>

<style lang="scss" scoped>
.button {
  height: 2.75rem;
}


.button.is-connected {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: none;

  span {
    margin-right: 0;
  }

  .icon {
    margin-right: 0.5rem;

    img {
      width: 1rem;
      height: 1rem;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }

  .is-active {
    background: rgba(255, 255, 255, 0.16);
  }
}
</style>