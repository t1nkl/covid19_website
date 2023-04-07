import { createRouter, createWebHistory } from 'vue-router'
import ElementorLayout from '@/layouts/ElementorLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ElementorLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
        },
        {
          path: '/details',
          name: 'details',
          component: () => import(/* webpackChunkName: "details" */ '@/views/DetailsView.vue')
        },
        {
          path: '/details/:country_name',
          name: 'details_country_name',
          component: () =>
            import(/* webpackChunkName: "details_country" */ '@/views/details/[country_name].vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404View.vue')
    }
  ]
})

export default router
