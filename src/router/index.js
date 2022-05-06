import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'homeView',
    component: () => import('../views/frontend/IndexView.vue'),
    meta: {
      title: '好食遞 HEALTHY DIET - 您的優質餐飲管家',
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/frontend/HomeView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/frontend/ProductsView.vue'),
        meta: {
          title: '來選好食 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/frontend/ProductID.vue'),
      },
      {
        path: 'dietInfo',
        component: () => import('../views/frontend/DietInfo.vue'),
        meta: {
          title: '食前好思 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'aboutShipping',
        component: () => import('../views/frontend/ShippingView.vue'),
        meta: {
          title: '如何好遞 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'myFavorite',
        component: () => import('../views/frontend/FavCollection.vue'),
        meta: {
          title: '我的收藏 | 好食遞 HEALTHY DIET',
        },
      },
      {
        path: 'checkout',
        component: () => import('../views/frontend/CheckoutView.vue'),
        children: [
          {
            path: 'cart',
            name: 'checkoutCart',
            component: () => import('../views/frontend/CheckoutCart.vue'),
          },
          {
            path: 'order',
            name: 'checkoutOrder',
            component: () => import('../views/frontend/CheckoutOrder.vue'),
          },
          {
            path: 'payment/:id',
            name: 'checkoutPayment',
            component: () => import('../views/frontend/CheckoutPayment.vue'),
          },
          {
            path: 'complete',
            name: 'checkoutComplete',
            component: () => import('../views/frontend/CheckoutComplete.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    name: 'dashboard_home',
    component: () => import('../views/backend/HomeView.vue'),
    meta: {
      title: '管理後台 | 好食遞 HEALTHY DIET',
    },
    children: [
      {
        path: 'products',
        name: 'dashboard_Products',
        component: () => import('../views/backend/ProductsView.vue'),
      },
      {
        path: 'orders',
        name: 'dashboard_Orders',
        component: () => import('../views/backend/OrdersView.vue'),
      },
      {
        path: 'coupon',
        name: 'dashboard_Coupon',
        component: () => import('../views/backend/CouponView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
