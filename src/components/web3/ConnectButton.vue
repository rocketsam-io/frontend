<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ConnectorsModal from '@/components/web3/ConnectorsModal.vue'

import { useConfigStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'

import { formatAddress } from '@/onchain/utils'
import { useOnboard } from '@web3-onboard/vue'
import { useStarknetStore } from '@/stores/starknet'

const config = useConfigStore()
const evm = useEvmStore()
const starknet = useStarknetStore()

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

// Connector modal or blocknative directly
const active = ref(false)
const toggle = async () => {
  if (!config.settings.starknet)
    return connectWallet()
  active.value = !active.value
}

</script>

<template lang="pug">
.navbar-item
  ConnectorsModal(v-if="!config.settings.starknet" :active="active" @toggle="toggle()")
  .button.is-primary.is-rounded(
    v-if="!evm.address && !starknet.address"
    @click="toggle()"
  ) {{ connectingWallet ? 'Connecting...' : 'Connect wallet' }}
  .buttons.has-addons(v-else)
    .button.is-rounded(v-if="connectedWallet" @click="!evm.chainInfo ? switchNetwork() :toggle()")
      .icon(v-if="!evm.chainInfo")
        img(v-if="evm.chainInfo" :src="'/assets/chains/' + evm.chainInfo?.icon")
        img(v-else src="/assets/chains/switch.svg" alt='Switch Network' @click="switchNetwork()")
      span {{ evm.formatted }}
    .button.is-rounded(v-else @click="toggle()") Connect EVM
    .button.is-rounded(v-if="config.settings.starknet" @click="toggle()" disabled) Connect StarkNet

</template>

<style lang="scss" scoped>
.button {
  height: 2.75rem;
}

.buttons.has-addons {
  .button {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
    border: none;

    &:not(:last-child) {
      margin-right: 1px;
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
}
</style>