
import { createRouter, createWebHistory } from 'vue-router'
import SeriesList from '../views/SeriesList.vue'

const routes = [
  {
    path: '/',
    name: 'SeriesList',
    component: SeriesList
  },
  {
    path: '/SeriesDetails/:showId',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/SeriesDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes,
})

export default router
