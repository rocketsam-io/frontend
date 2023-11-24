<script setup lang="ts">
import { formatAddress } from '@/onchain/utils'
import { useChainsStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'

const evm = useEvmStore()
const config = useChainsStore()
const { user } = defineProps(['user'])

const boostClass = (boost: number) => {
  if (boost > 3) return 'green'
  else if (boost > 2) return 'yellow'
  else if (boost > 1) return 'red'
  else return 'none'
}

const isCurrentUser = user?.address?.toLowerCase() === evm?.address?.toLowerCase()

</script>

<template lang="pug">
tr(
  :class="{ 'is-selected': isCurrentUser }"
)
  td.position(align="center" :class="{ 'has-text-primary has-text-bold': !user.rank }") {{ user.rank || 'UNRANKED' }}
  td(align="center") {{ formatAddress(user.address) }}
  td(align="center" v-if="user.boost && config.settings.boost") 
    span.tag(:class="boostClass(user.boost)") {{ user.boost > 1 ? user.boost.toFixed(1) : user.boost }}x
  td(align="center") {{ user?.daily_points > 0 ? user.daily_points.toFixed(2) : 0}}
  td(align="center") {{ user?.points > 0 ? user.points.toFixed(2) : 0 }}
</template>