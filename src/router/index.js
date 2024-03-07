
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
    component: () => import(/* webpackChunkName: "about" */ '../views/SeriesDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
