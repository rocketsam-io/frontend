<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import FuelBar from '@/components/FuelBar.vue'
import UserRow from '@/components/UserRow.vue'

import { formatAddress } from '@/onchain/utils'
import { useConfigStore } from '@/stores/config'

import axios from 'axios'
import { useEvmStore } from '@/stores/evm'
import type { User } from '@/types'

const config = useConfigStore()
const evm = useEvmStore()

const leaderboard = ref<User[]>([])
const loading = ref(true)
const API = import.meta.env.VITE_API

const fetchLeaderboard = async (chain: any = config.currentChain.id) => {
  loading.value = true
  let url = API + 'leaderboard/' + (chain ? chain?.id || chain : '')
  leaderboard.value = await axios.get(url).then(r => {
    const list = r.data
    if (evm?.address) {
      const currentUser: User = list
        .find((user: any) => user.address.toLowerCase() === evm.address?.toLowerCase())
        || { rank: 0, address: evm.address, boost: 1, daily_points: 0, points: 0 }

      if (currentUser && currentUser?.rank !== 1)
        list.unshift(currentUser)
    }
    return list
  })
  loading.value = false
}

// Fetch
let intervalId: any
onMounted(() => {
  intervalId = setInterval(() => fetchLeaderboard(), 15000)
  return () => clearInterval(intervalId)
})
onUnmounted(() => clearInterval(intervalId))
onBeforeMount(() => fetchLeaderboard(config.currentChain.id))
watch(() => config.currentChain, (newChain) => fetchLeaderboard(newChain.id))

</script>

<template lang="pug">
section.section
  .container.is-fullheight-with-navbar
    .section-header
      h1 Leaderboard
      .season Season {{ config.settings.season }}

    .table-container(:class="{ 'with-logo': leaderboard.length === 0 }")
      table.table.is-fullwidth.is-hoverable
        thead
          tr
            th.position(align="center") Position
            th(align="center") Wallet
            th(align="center" v-if="config.settings.boost") Boost
            th(align="center") Points (24H)
            th(align="center") Total

        tbody
          UserRow(v-for="user in leaderboard" :user="user")

    FuelBar(:percent="config.settings.fuel")

</template>