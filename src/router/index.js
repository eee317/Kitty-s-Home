import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: '/donate',
        component: () => import('../views/front/DonateItem.vue')
      },
      {
        path: '/about',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: '/cart',
        component: () => import('../views/front/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
