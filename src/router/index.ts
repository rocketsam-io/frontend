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
        const { logs, setCurrentSiteChain } = useConfigStore()
        if (logs) console.log('Enter by route:', to.params.chain)
        if (to.params.chain) {
          setCurrentSiteChain(to.params.chain as string)
        }
        return next()
      }
    },
    {
      path: '/leaderboard/:chain?',
      name: 'Leaderboard',
      component: Leaderboard,
      beforeEnter: (to, from, next) => {
        const { logs, setCurrentSiteChain } = useConfigStore()
        if (logs) console.log('Enter by route:', to.params.chain)
        if (to.params.chain) {
          setCurrentSiteChain(to.params.chain as string)
        }
        return next()
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
