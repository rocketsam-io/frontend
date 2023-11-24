import { createRouter, createWebHistory } from 'vue-router'

import Leaderboard from '../views/LeaderboardPage.vue'
import Pools from '../views/PoolsPage.vue'
import { useConfigStore } from '@/stores/config'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/pools'
    },
    {
      path: '/pools/:chain?',
      name: 'Pools',
      component: Pools,
      beforeEnter: (to, from, next) => {
        const { logs, setSiteChain } = useConfigStore()
        if (logs) console.log('Enter by route:', to.params.chain)
        if (to.params.chain) {
          setSiteChain(to.params.chain as string)
        }
        next()
      }
    },
    {
      path: '/leaderboard/:chain?',
      name: 'Leaderboard',
      component: Leaderboard,
      beforeEnter: (to, from, next) => {
        const { logs, setSiteChain } = useConfigStore()
        if (logs) console.log('Enter by route:', to.params.chain)
        if (to.params.chain) {
          setSiteChain(to.params.chain as string)
        }
        next()
      }
    },
    // Fallback route for handling 404s
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: '/'
    }
  ]
})

export default router
