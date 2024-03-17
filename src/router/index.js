
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'Welcome',
  //   component: import('@/views/Welcome.vue')
  // },
  {
    path: '/',
    name: 'SeriesList',
    component: import('@/views/SeriesList.vue')
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
