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
        component: () => import('../views/front/CartLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('../views/front/CartView.vue')
          },
          {
            path: 'form',
            component: () => import('../views/front/CartForm.vue')
          },
          {
            path: 'payment/:id',
            component: () => import('../views/front/CartPayment.vue')
          },
          {
            path: 'supermarket/:id',
            component: () => import('../views/front/CartPaySupermarket.vue')
          },
          {
            path: 'ATM/:id',
            component: () => import('../views/front/CartPayATM.vue')
          },
          {
            path: 'finish',
            component: () => import('../views/front/CartPayFinish.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/dashboard/CollectionOrder.vue')
      },
      {
        path: 'donate',
        component: () => import('../views/dashboard/AdminDonate.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/dashboard/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
