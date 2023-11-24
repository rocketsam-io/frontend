<script setup lang="ts">
import FuelBar from '@/components/FuelBar.vue'

import { onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useConfigStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'
import { useRoute } from 'vue-router'

import { JsonRpcProvider } from 'ethers'
import { RocketSam__factory, type RocketSam } from '@/types/ethers-contracts'
import { Network } from 'ethers'

import PoolRow from '@/components/SinglePool.vue'
import type { Currency, Pool } from '@/types'

const config = useConfigStore()
const evm = useEvmStore()

const poolNames = [
  'Н-1',
  'Saturn 5',
  'Falcon 9',
  'Falcon Heavy',
  'SpaceX Starship',
  'Long March 9',
  'Energia - Buran',
  'Soyuz-U',
  'Space Launch System (SLS)',
  'Delta IV Heavy',
]

const loading = ref<boolean>(true)
const pools = ref<Pool[]>([])
const currency = ref<Currency>({
  name: 'ETH',
  symbol: 'ETH',
  decimals: 18
})

// Fetch data
currency.value = config.currentChain.nativeCurrency

const fetchPools = async (eventMessage: string) => {
  const chain = config.currentChain
  if (config.logs) console.log('Fetch RocketSam Pools for', chain.fullname, 'after', eventMessage)
  loading.value = true
  const data = chain.contracts
    .map((contract, i) => ({
      name: poolNames[i],
      address: chain.pools[i],
      contract: contract,
      chain: chain
    }))
  pools.value = await Promise.all(data)
  loading.value = false
}
const newChainFetchPools = (eventMessage: string) => {
  pools.value = []
  if (pools.value.length === 0) fetchPools(eventMessage)
}

watch(() => config.currentChain, (newChain) => {
  if (config.logs) console.log('Current chain', newChain.name, pools.value.length)
  newChainFetchPools('change/update current chain')
})

const route = useRoute()
watch(route, (newRoute) => {
  if (config.logs) console.log('Route change', newRoute, pools.value.length)
  newChainFetchPools('change/update route')
})

onBeforeMount(() => {
  fetchPools('beforeMount')
})

</script>

<template lang="pug">
section.section
  .container.is-fullheight-with-navbar
    .section-header
      h1 Pools
      .season Season {{ config.settings.season }}

    .table-container(:class="{ 'with-logo': pools.length === 0 }")
      table.table.is-fullwidth.is-hoverable
        thead
          tr
            th(align="left") Pool
            th(align="center" alt="Your balance in Pool") Your Balance
            th(align="center" alt="Your volume in Pool") Your Volume
            th(align="center" alt="Total Pool volume") Pool Volume
            th(align="right") &nbsp;
        tbody
          PoolRow(
            v-for="pool in pools"
            :key="pool.name"
            :currency="currency"
            :pool="pool"
            @updatePools="fetchPools('user deposit')"
          )

    FuelBar(:percent="config.settings.fuel")

</template>

<style lang="scss" scoped>
.buttons.is-right:not(.has-addons) {
  flex-wrap: nowrap;

  .button:not(.is-fullwidth) {
    padding: 0.75rem 1.5rem;
    min-width: 7.25rem;
    margin-right: 0.375rem;
    margin-left: 0.375rem;
  }
}
</style>