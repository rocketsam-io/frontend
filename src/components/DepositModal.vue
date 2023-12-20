<script setup lang="ts">
import { Sam } from '@/onchain/utils'
import { useConfigStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'
import { useOnboard } from '@web3-onboard/vue'
import { BrowserProvider } from 'ethers'
import { formatUnits, parseUnits } from 'ethers'
import { ref, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue'
import CustomToast from './CustomToast.vue'
import { useToast } from "vue-toastification"
import { useStarknetStore } from '@/stores/starknet'
import { ether, getBalance } from '@/onchain/starknet'
import { Contract, uint256, cairo, type Call, CustomError } from 'starknet'
import * as StarknetCore from 'get-starknet-core'
import { STARK_ABI } from '@/abi/RocketStark'
import { ERC20_ABI } from '@/abi/ERC20'

const { visible, pool } = defineProps(['visible', 'pool'])

const emit = defineEmits(['toggle', 'updatePool'])
const opened = ref(visible)

const config = useConfigStore()
const evm = useEvmStore()
const starknet = useStarknetStore()
const toast = useToast()

const { connectWallet, connectedWallet, setChain } = useOnboard()

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

// Sam Contract
const processing = ref(false)

// Deposit
const deposit = async () => {
  processing.value = true

  if (pool.chain.chainType === 'evm') {
    if (config.logs) console.log('Deposit EVM funds:', transaction.value + fee.value)
    // @ts-ignore
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const sam = Sam(pool.address, pool.chain.id)

    await sam
      .connect(signer)
      .deposit(transaction.value.toString(), {
        value: transaction.value + fee.value
      })
      .then(async (transaction) => {
        showToast(`Depositing…`, { hash: transaction.hash })
        emit('toggle')

        await transaction.wait(3)

        showToast(`Successful Deposit`, { hash: transaction.hash })
        emit('updatePool')

      }).catch(e => showToast(`Deposit Failed`, { error: 'Transaction ' + e.reason }))

  } else {
    if (config.logs) console.log('Deposit Starknet funds:', transaction.value + fee.value)

    const wallet = starknet.wallet
    const Sam = new Contract(STARK_ABI, pool.address, wallet)
    const Ether = new Contract(ERC20_ABI, '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', wallet)

    const approve: Call = Ether.populate('approve', [pool.address, uint256.bnToUint256(transaction.value)])
    const deposit: Call = Sam.populate('deposit', [uint256.bnToUint256(transaction.value)])

    return wallet.execute([approve, deposit])
      .then(async (result: any) => {
        showToast(`Depositing…`, { hash: result.transaction_hash })
        emit('toggle')

        await wallet.provider.waitForTransaction(result.transaction_hash)

        showToast(`Successful Deposit`, { hash: result.transaction_hash })
        emit('updatePool')

      }).catch((e: CustomError) => showToast(`Deposit Failed`, { error: e.message }))
  }

  processing.value = false
}

// Fetch
let intervalId: any
onMounted(() => {
  const fetchBalance = async () => {
    if (config.logs) console.log('Fetch balance of', pool.chain.chainType === 'evm' ? evm.address : starknet.address)
    if (pool.chain.chainType === 'evm' && evm.address) {
      // @ts-ignore
      const provider = new BrowserProvider(window.ethereum)
      balance.value = await provider.getBalance(evm.address)
    } else if (pool.chain.chainType === 'starknet' && starknet.address) {
      balance.value = await getBalance(starknet.address)
    }
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

  fee.value = pool.chain.chainType === 'evm'
    ? await pool.contract.estimateProtocolFee(transaction.value)
    : await pool.contract.estimateProtocolFee(transaction.value)
  console.log('fee.value', fee.value)
  if (config.logs) console.log('Calculate fee:', fee.value)
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
        p.help(v-if="fee >= 0") Fee: {{ format(fee).toFixed(5) }} {{ pool.chain.nativeCurrency.symbol }}

      .field
        .control
          button.button.is-primary.is-fullwidth.is-rounded.is-medium(
            v-if="!connectedWallet"
            @click="connect()"
          ) Connect Wallet

          button.button.is-white.is-fullwidth.is-rounded.is-medium(
            v-else-if="pool.chain.chainType === 'evm' && pool.chain.chainId !== evm.chain"
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