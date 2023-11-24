import { createRouter, createWebHistory } from 'vue-router'

import Leaderboard from '../views/LeaderboardPage.vue'
import Pools from '../views/PoolsPage.vue'

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
      component: Pools
    },
    {
      path: '/leaderboard/:chain?',
      name: 'Leaderboard',
      component: Leaderboard
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
