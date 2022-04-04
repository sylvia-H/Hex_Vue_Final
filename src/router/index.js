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
    meta: {
      title: '好食遞 HEALTHY DIET - 您的優質餐飲管家',
    },
    children: [
      {
        path: '/',
        name: 'homeView',
        component: () => import('../views/Front/FHomeView.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Front/FProductsView.vue'),
        meta: {
          title: '來選好食 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'product/:id',
        component: () => import('../views/Front/FProductID.vue'),
      },
      {
        path: 'dietInfo',
        component: () => import('../views/Front/FDietInfo.vue'),
        meta: {
          title: '食前好思 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'aboutShipping',
        component: () => import('../views/Front/FShippingView.vue'),
        meta: {
          title: '如何好遞 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'checkout',
        component: () => import('../views/Front/FCheckout.vue'),
        children: [
          {
            path: 'cart',
            name: 'checkoutCart',
            component: () => import('../views/Front/FCheckoutCart.vue'),
          },
          {
            path: 'order',
            name: 'checkoutOrder',
            component: () => import('../views/Front/FCheckoutOrder.vue'),
          },
          {
            path: 'payment/:id',
            name: 'checkoutPayment',
            component: () => import('../views/Front/FCheckoutPayment.vue'),
          },
          {
            path: 'complete',
            name: 'checkoutComplete',
            component: () => import('../views/Front/FCheckoutComplete.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    name: 'dashboard_home',
    component: () => import('../views/Dashboard/BHomeView.vue'),
    meta: {
      title: '管理後台 | 好食遞 HEALTHY DIET',
    },
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

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
