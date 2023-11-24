<script setup lang="ts">
import { Sam } from '@/onchain/utils'
import { useConfigStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'
import type { Pool } from '@/types'
import { useOnboard } from '@web3-onboard/vue'
import { BrowserProvider } from 'ethers'
import { JsonRpcProvider, formatUnits, parseUnits } from 'ethers'
import { ref, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue'
import CustomToast from './CustomToast.vue'
import { useToast } from "vue-toastification"

const { visible, pool } = defineProps(['visible', 'pool'])

const emit = defineEmits(['toggle', 'updatePool'])
const opened = ref(visible)

const config = useConfigStore()
const evm = useEvmStore()
const toast = useToast()

const { connectWallet, connectedWallet, connectedChain, setChain } = useOnboard()

const connect = async () => {
  emit('toggle')
  opened.value = false
  await connectWallet()
}

const switchChain = async () => setChain({ wallet: evm.wallet.label, chainId: config.currentChain.chainId })

const showToast = (msg: string, params?: any) => toast({
  component: CustomToast,
  props: {
    msg,
    params
  }
})

// Sam
const processing = ref(false)
const sam = Sam(pool.address, pool.chain.id)
// @ts-ignore
const provider = new BrowserProvider(window.ethereum)
const deposit = async () => {
  console.log('Deposit funds:', transaction.value + fee.value)

  // const { ethereum } = window
  // const provider = new BrowserProvider(ethereum)
  const signer = await provider.getSigner()

  processing.value = true
  await sam.connect(signer)
    .deposit(transaction.value.toString(), {
      value: transaction.value + fee.value
    })
    .then(async (transaction) => {
      showToast(`Depositing…`, { hash: transaction.hash })
      emit('toggle')

      await transaction.wait(3)

      showToast(`Successful Deposit`, { hash: transaction.hash })
      emit('updatePool')
    }).catch(e => {
      showToast(`Deposit Failed`, { error: 'Transaction ' + e.reason })
      console.log(e)
    })
  processing.value = false
}

// Fetch
let intervalId: any
onMounted(() => {
  const fetchBalance = async () => {
    console.log('Fetch balance of', evm.address)
    if (evm.address)
      balance.value = await provider.getBalance(evm.address)
  }

  fetchBalance()
  intervalId = setInterval(fetchBalance, 5000)
  return () => clearInterval(intervalId)
})

onUnmounted(() => clearInterval(intervalId))

// Input field
const amount = ref<number>(0)
const disabled = ref<boolean>(true)
const balance = ref<bigint>(0n)
const transaction = ref<bigint>(0n)
const fee = ref<bigint>(0n)

const format = (value: bigint) => parseFloat(formatUnits(value, pool.chain.nativeCurrency.decimals)) || 0

const checkAmount = async () => {
  if (amount.value < 0) amount.value = 0
  disabled.value = amount.value > format(balance.value) || amount.value === 0
  transaction.value = parseUnits(String(amount.value) || '0', pool.chain.nativeCurrency.decimals)
  fee.value = await sam.estimateProtocolFee(transaction.value)
  console.log('Calculate fee:', fee.value)
}

watch(amount, async () => checkAmount())

const estimateTrxValue = parseUnits('0.002', pool.chain.nativeCurrency.decimals)
const max = () => amount.value = format(BigInt(balance.value) - estimateTrxValue)

</script>

<template lang="pug">
.modal.is-active(:class="{'is-active': opened }")
  .modal-background(@click="emit('toggle')")
  .modal-content
    .modal-close.is-large(@click="emit('toggle')")
    slot
      .title Deposit to 
        span.has-text-primary «{{ pool.name }}»
      .field
        label.level.is-mobile
          .level-left Amount
          .level-right(v-if="balance > 0" @click="max()") Balance: {{ format(balance).toFixed(5) }} {{ pool.chain.nativeCurrency.symbol }}
        .control.has-icons-left.has-icons-right
          input.input.is-medium(
            placeholder="0"
            type="number"
            inputmode="decimal"
            autocomplete="off"
            maxlength="23"
            v-model="amount"
          )
          .icon.is-small.is-left(v-if="config.currentChain")
            img.network(:src="'/assets/chains/' + config.currentChain.icon")
          .icon.is-small.is-right.max(@click="max()") MAX
        p.help(v-if="fee") Fee: {{ format(fee).toFixed(5) }} {{ pool.chain.nativeCurrency.symbol }}

      .field
        .control
          button.button.is-primary.is-fullwidth.is-rounded.is-medium(
            v-if="!connectedWallet"
            @click="connect()"
          ) Connect Wallet

          button.button.is-white.is-fullwidth.is-rounded.is-medium(
            v-else-if="pool.chain.chainId !== evm.chain"
            @click="switchChain"
          ) Switch network

          button.button.is-fullwidth.is-rounded.is-medium(
            v-else
            @click="deposit()"
            :class="{'is-primary': !disabled, 'is-loading': processing}"
            :disabled="disabled"
          ) Deposit

</template>

<style lang="scss"></style>