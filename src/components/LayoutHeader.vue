<script setup lang="ts">
import { ref } from 'vue'
import { useChainsStore } from '@/stores/config'

import SelectNetwork from '@/components/web3/SelectNetwork.vue'
import ConnectButton from '@/components/web3/ConnectButton.vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const { onboardChains } = useChainsStore()

// Navbar toggler
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target
      const $target = document.getElementById(target)
      el.classList.toggle('is-active')
      if ($target) $target.classList.toggle('is-active')
    })
  })
})

const config = useChainsStore()

</script>

<template lang="pug">
header.header
  .container
    nav.navbar(role="navigation" aria-label="main navigation")
      .navbar-brand
        router-link.navbar-item(to="/")
          img.logo(src="../assets/logo-full.svg" alt="RocketSam")

        .navbar-burger(aria-label="menu" aria-expanded="false" data-target="mainNavbar") 
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")

        .mobile-buttons.is-hidden-desktop.is-hidden-widescreen
          ConnectButton

      #mainNavbar.navbar-menu
        .navbar-end.has-text-centered-mobile
          router-link.navbar-item(
            :to="'/leaderboard/' + config?.currentChain?.name.toLowerCase()"
            :class="{ 'router-link-active': route.path.includes('/leaderboard') }"
          ) Leaderboard 
          router-link.navbar-item(
            :to="'/pools/' + config?.currentChain?.name.toLowerCase()"
            :class="{ 'router-link-active': route.path.includes('/pools') }"
          ) Pools 

        SelectNetwork
        ConnectButton

</template>

<style lang="scss" scoped>
.navbar {
  .navbar-menu {
    .navbar-item {
      background: none;
      color: rgba(255, 255, 255, 0.60);
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5rem;
      padding: 0.5rem;

      /* 150% */
      &.router-link-active,
      &.router-link-exact-active {
        color: #e7431b;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.5rem;
        /* 150% */
      }

      &:hover {
        background: none;
      }
    }
  }

  .mobile-buttons {
    align-items: center;
    display: flex;
    margin-right: 1rem;
  }
}
</style>