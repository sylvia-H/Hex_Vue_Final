import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Front/FHome.vue'),
    children: [
      {
        path: '/',
        name: 'homeView',
        component: () => import('../views/Front/FHomeView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Front/FProductsView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/Front/FProductID.vue'),
      },
      {
        path: 'aboutShipping',
        component: () => import('../views/Front/FShippingView.vue'),
      },
      {
        path: 'dietInfo',
        component: () => import('../views/Front/FDietInfo.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/Front/FCheckoutOrder.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'dashboard_home',
    component: () => import('../views/Dashboard/BHomeView.vue'),
    children: [
      {
        path: 'products',
        name: 'dashboard_Products',
        component: () => import('../views/Dashboard/BProductsView.vue'),
      },
      {
        path: 'orders',
        name: 'dashboard_Orders',
        component: () => import('../views/Dashboard/BOrdersView.vue'),
      },
      {
        path: 'coupon',
        name: 'dashboard_Coupon',
        component: () => import('../views/Dashboard/BCouponView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
