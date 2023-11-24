<template lang="pug">
a.popup(v-if="params.hash" target="_blank" :href="url")
  .title.is-spaced {{ msg }}
  .explorer(v-if="params.hash")
    span View on explorer
    img(src="../assets/link.svg")
  .date {{ timeMessage }}

.popup(v-else) 
  .title.is-spaced {{ msg }} 
  .subtitle(v-if="params.error") {{  params.error }}

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfigStore } from '@/stores/config'

const config = useConfigStore()

// Time
const creationTime = ref(Date.now())

const timeDifference = computed(() => {
  const now = Date.now()
  const diffInMilliseconds = now - creationTime.value
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
  return diffInMinutes
})

const timeMessage = computed(() =>
  timeDifference.value < 1
    ? 'less than 1 minute ago'
    : `${timeDifference.value} minutes ago`
)

// Explorer
const { msg, params } = defineProps(['msg', 'params'])
const url = computed(() => config.currentChain.blockExplorerUrl + '/tx/' + params.hash)
console.log(params)

</script>

<style lang="scss">
.toast {
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #2A2A31;
  box-shadow: 0px 4px 32px 0px rgba(231, 67, 27, 0.20);
  padding: 0.75rem 1rem;

  &-body {
    padding: 0;
    margin-bottom: 0.75rem;

    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;

    .title {
      color: #fff;
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .subtitle,
    .explorer {
      display: flex;
      flex-direction: row;
      color: #fff;
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0 0 0.5rem;

      span {
        margin-right: .25rem;
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .date {
      color: rgba(255, 255, 255, 0.40);
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1;
    }
  }

  .Vue-Toastification__close-button {
    position: absolute;
    display: block;
    top: 0.75rem;
    right: 1rem;
    color: transparent;
    width: 2rem;
    height: 2rem;
    opacity: 1;
  }

  .Vue-Toastification__progress-bar {
    bottom: 0.75rem;
    left: 1rem;
    right: 1rem;
    width: auto;
    background-color: #EC4F28;
    height: 2px;
  }
}
</style>
