<script setup lang="ts">
import { BrowserProvider } from 'ethers'
import { formatUnits } from 'ethers'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useToast } from "vue-toastification"

import Toast from '@/components/CustomToast.vue'
import DepositModal from '@/components/DepositModal.vue'

import type { Pool } from '@/types'
import { useEvmStore } from '@/stores/evm'
import { useOnboard } from '@web3-onboard/vue'
import { Sam } from '@/onchain/utils'
import { useConfigStore } from '@/stores/config'
import { getWallets } from '@/onchain/starknet'
import { useStarknetStore } from '@/stores/starknet'
import { Contract, CustomError } from 'starknet'
import { STARK_ABI } from '@/abi/RocketStark'
import * as StarknetCore from 'get-starknet-core'
import type { RocketSam } from '@/types/ethers-contracts'

const { pool } = defineProps<{
  pool: Pool
}>()
const emit = defineEmits(['updatePools'])

// Tostification
const toast = useToast()
const evm = useEvmStore()
const starknet = useStarknetStore()
const config = useConfigStore()

const { setChain } = useOnboard()

const showToast = (msg: string, params?: any) => toast({
  component: Toast,
  props: {
    msg,
    params
  }
})

// Fetch
type PoolRow = {
  balance: bigint | null
  volume: bigint | null
  poolVolume: bigint | null
}

let rowInfo = ref<PoolRow>({
  balance: null,
  volume: null,
  poolVolume: null
})

const fetchPool = async (eventMessage: string) => {
  if (pool && pool.contract) {
    if (config.logs) console.log('Fetch pool', eventMessage)

    try {
      if (pool.chain.chainType === 'evm') {
        const contract = pool.contract as RocketSam
        rowInfo.value = {
          balance: evm.address ? await contract.balances(evm.address) : 0n,
          volume: evm.address ? await contract.addressStatistic(evm.address).then((r: any) => r.depositsVolume) : 0n,
          poolVolume: await contract.depositsVolume() || 0n
        }
      } else {
        const contract = pool.contract as Contract
        rowInfo.value = {
          balance: starknet.address ? await contract.getBalance(starknet.address) : 0n,
          volume: starknet.address ? await contract.getAddressStatistics(starknet.address).then((r: any) => r.deposits_volume) : 0n,
          poolVolume: await contract.getDepositsVolume() || 0n
        }
      }
    } catch (e) {
      console.error('Chain RPC error!', e)
    }
  }
}

watch(() => pool, () => fetchPool('pool changed'))

let intervalId: any
onMounted(() => {
  fetchPool('mount')
  intervalId = setInterval(() => fetchPool('by timeout'), 15000)
  return () => clearInterval(intervalId)
})
onUnmounted(() => clearInterval(intervalId))

// Withdraw
const processing = ref(false)

const withdrawFromEVM = async () => {
  // @ts-ignore
  const { ethereum } = window
  const provider = new BrowserProvider(ethereum)

  if (!evm.address || !provider) {
    showToast(`Withdrawal Failed`, { error: `can't get wallet provider` })
    return
  } else if (pool.chain.chainId !== evm.chainInfo?.chainId)
    await setChain({ wallet: evm.wallet.label, chainId: pool.chain.chainId })

  const signer = await provider.getSigner(evm.address)

  processing.value = true

  return Sam(pool.address, pool.chain.id, signer)
    .withdraw().then(async (trx) => {
      showToast(`Withdrawing…`, { hash: trx.hash })
      processing.value = false

      await trx.wait(2)

      showToast(`Successful Withdrawal`, { hash: trx.hash })
      updatePool()

    }).catch(e => {

      processing.value = false
      showToast(`Withdrawal Failed`, { error: 'Transaction ' + e.reason || e })
    })
}


const withdrawFromStarknet = async () => {

  const Sam = new Contract(STARK_ABI, pool.address, starknet.wallet.account)
  processing.value = true

  return Sam
    .withdraw()
    .then(async (result: any) => {
      showToast(`Withdrawing…`, { hash: result.transaction_hash })
      processing.value = false

      await starknet.wallet.provider.waitForTransaction(result.transaction_hash)

      showToast(`Successful Withdrawal`, { hash: result.transaction_hash })
      updatePool()

    }).catch((e: CustomError) => {
      processing.value = false
      showToast(`Withdrawal Failed`, { error: e.message })
    })
}

const withdraw = async () => {
  console.log('Withdraw from', pool.chain.chainType)
  return pool.chain.chainType === 'evm'
    ? withdrawFromEVM()
    : withdrawFromStarknet()
}

// Deposit to pool
const visible = ref(false)
const toggle = async () => visible.value = !visible.value
const updatePool = async () => fetchPool('after transaction')

// Visual
const scan = (pool: Pool) => pool.chain.chainType === 'evm' ?
  `${pool.chain.blockExplorerUrl}/address/${pool.address}`
  : `${pool.chain.blockExplorerUrl}/contract/${pool.address}`

const amount = (value: bigint) => formatUnits(value, pool.chain.nativeCurrency.decimals || 18)
const format = (value: bigint) => {
  const rounded = !value
    ? 0n
    : value <= 1000000000000n
      ? '< 0.0001'
      : parseFloat(
        parseFloat(
          amount(value)
        ).toFixed(5))

  return `${rounded} ${pool.chain.nativeCurrency.symbol}`
}

</script>

<template lang="pug">
tr
  td(align="left")
    a(target="_blank" :href="scan(pool)") {{ pool.name }}

  td(align="center" :class="{'blur': !rowInfo.balance }")
    | {{ evm.address && rowInfo?.balance >= 0 ? format(rowInfo.balance) : '-' }}

  td(align="center" :class="{'blur': !rowInfo.volume }")
    | {{ evm.address && rowInfo?.volume >= 0 ? format(rowInfo.volume) : '-' }}

  td(align="center" :class="{'blur': !rowInfo.poolVolume }")
    | {{ rowInfo?.poolVolume >= 0 ? format(rowInfo.poolVolume) : '-' }}

  td(align="right")
    .buttons.is-right
      .button.is-primary.is-rounded.is-fullwidth-mobile(
        :class="{'is-loading': visible }"
        @click="toggle(pool)"
      ) Deposit

      .button.is-rounded.is-fullwidth-mobile(
        :class="{'is-withdraw': rowInfo?.balance, 'is-loading': processing }"
        :disabled="rowInfo.balance <= 0n"
        @click="rowInfo.balance > 0 ? withdraw() : ''"
      ) Withdraw

      DepositModal(
        v-if="visible"
        :visible="visible"
        :pool="pool"
        @toggle="toggle()"
        @updatePool="updatePool()"
      )

</template>