import PlayersList from '../pages/Players/PlayersList.vue'
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Players',
    component: PlayersList,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
