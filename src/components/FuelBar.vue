<template lang="pug">
.fuel(v-if="$props.percent")
  h2 Fuel
  .scrollbar 
    .top
      .left {{ $props.percent.toFixed(2) }}%
      .right {{ (100 - $props.percent).toFixed(2) }}%
    .scroll
      .filled(:style="`width:${$props.percent}%`")
      .estimate
    .bottom
      .left start 
      .right launch
</template>

<script setup lang="ts">
const percent = defineProps(['percent'])
</script>