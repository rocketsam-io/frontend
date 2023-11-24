<template lang="pug">
.chains.navbar-item.has-dropdown.is-hoverable
  .navbar-link
    span.icon 
      img(:src="'/assets/chains/' + config.currentChain.icon")
    span {{ config.currentChain.fullname }}
  .navbar-dropdown.is-boxed.is-right(v-if="config.allChains.length > 0")
    .items
      .navbar-item(v-for="chain in config.allChains" @click="changeChain(chain)")
        span.icon
          img(:src="'/assets/chains/' + chain.icon")
        span {{ chain.fullname }}
        IconCheck.check(:class="chain.id === parseInt(connectedChain?.id) ? 'is-active' : ''")

</template>

<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue'

import { watch } from 'vue'
import { useOnboard } from '@web3-onboard/vue'

import { useConfigStore } from '@/stores/config'
import { useEvmStore } from '@/stores/evm'
import type { Chain } from '@/types'
import type { ConnectedChain } from '@web3-onboard/core'

const { connectedWallet, connectedChain, setChain } = useOnboard()
const config = useConfigStore()
const evm = useEvmStore()

const changeChain = (chain: Chain) => {
  if (connectedWallet?.value?.label) setChain({ wallet: connectedWallet.value.label, chainId: chain.chainId })
  config.setCurrentSiteChain(chain.id)
}

watch(connectedChain, (newValue: ConnectedChain | null) => {
  if (config.logs) console.log('Route change:', newValue)
  if (newValue) config.setCurrentSiteChain(parseInt(newValue.id))
})

</script>
  
<style lang="scss">
.navbar-menu {

  .navbar-link {
    min-width: 11rem;
    height: 2.75rem;

    &:not(.is-arrowless)::after {
      border-radius: 1px;
      border-color: #FFFFFF;
      border-width: 2px;
      height: 0.5rem;
      width: 0.5rem;
      right: 1rem;
      margin-top: -0.375rem;
    }
  }

  .navbar-item {
    background: none;
    color: rgba(255, 255, 255, 0.60);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    padding: 0.5rem;
  }

  span {
    margin-right: 0.5rem;
  }

  .navbar-link {
    color: #fff;
    display: flex;

    &:hover {
      background: rgba(255, 255, 255, 0.16) !important;
    }
  }

  &:not(.is-active) {
    .chains {
      margin-left: 2rem;
      padding-left: 0.25rem;
      align-self: center;

      &.navbar-item.has-dropdown.is-hoverable {

        .navbar-link {
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        &.is-active,
        &:hover {
          .navbar-link {
            background: rgba(255, 255, 255, 0.16) !important;

            &:not(.is-arrowless)::after {
              margin-top: -0.125rem;
              transform: rotate(135deg);
              transition: all 250ms ease-in;
            }
          }
        }

        .navbar-dropdown {
          background-color: transparent;
          padding: 0.5rem 0;

          .items {
            position: relative;
            // margin-top: 0.5rem;
            border-radius: 0.5rem;
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
            background-color: #323239;
            padding: 0.25rem 0;

            &:after,
            &:before {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: -1;
              border-radius: 0.5rem;
              background-color: #323239;
            }

            &:before {
              margin: -1px;
              background: linear-gradient(to bottom, rgba(255, 255, 255, .32), rgba(255, 255, 255, 0));
            }

            .navbar-item {
              cursor: pointer;
              // min-width: 11.75rem;
              margin: 0.5rem;

              &:hover {
                background: rgba(255, 255, 255, 0.04);
                border-radius: 1px;
              }
            }
          }
        }
      }

      span {
        color: #fff;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1rem;
        margin-right: 0.5rem;
      }

      .icon {
        img {
          width: 1.5rem;
          height: 1.5rem;
          border: none;
        }
      }
    }
  }

  .check {
    visibility: hidden;
    transition: all 25ms ease-in;
    width: 1rem;
    height: 1rem;
    color: #fff;
    margin-left: auto;

    &.is-active {
      visibility: visible;
    }
  }
}
</style>
  