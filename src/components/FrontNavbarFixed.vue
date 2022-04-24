<template>
  <!-- 前台導覽列 -->
  <nav
    class="navbar navbar-expand-lg navbar-light bg-cream3 shadow-sm fixed-top py-2 py-md-4 py-lg-2"
  >
    <div class="container">
      <router-link to="/" class="text-center me-10">
        <!-- <h1 class="text-green1 fz-7 fz-md-9"><strong>好食遞</strong></h1> -->
        <img style="max-width: 36px" src="../assets/logo.png" alt="好食遞" /><br />
        <span class="text-gray fz-3">HEALTHY DIET</span>
      </router-link>
      <router-link to="/products" class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <span class="material-icons me-2"> restaurant_menu </span>
        <h5>來選好食</h5>
      </router-link>
      <router-link to="/dietInfo" class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <span class="material-icons me-2">emoji_objects</span>
        <h5>食前好思</h5>
      </router-link>
      <router-link to="/aboutShipping" class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <span class="material-icons me-2"> local_shipping </span>
        <h5>如何好遞</h5>
      </router-link>
      <!-- 漢堡 -->
      <button class="navbar-toggler" type="button" @click="toggleNavMenu()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 選單內容 -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarList" ref="navMenu">
        <ul class="navbar-nav py-6 py-md-5 py-lg-0">
          <li
            @click="hideNavMenu()"
            @keydown="enter"
            class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none"
          >
            <router-link to="/products" class="d-flex text-dark nav-link">
              <span class="material-icons me-2"> restaurant_menu </span>
              <h5><strong>來選好食</strong></h5>
            </router-link>
          </li>
          <li
            @click="hideNavMenu()"
            @keydown="enter"
            class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none"
          >
            <router-link to="/dietInfo" class="d-flex text-dark nav-link">
              <span class="material-icons fs-5 text-dark | me-2 me-lg-0"> emoji_objects </span>
              <h5><strong>食前好思</strong></h5>
            </router-link>
          </li>
          <li
            @click="hideNavMenu()"
            @keydown="enter"
            class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none"
          >
            <router-link to="/aboutShipping" class="d-flex text-dark nav-link">
              <span class="material-icons me-2"> local_shipping </span>
              <h5><strong>如何好遞</strong></h5>
            </router-link>
          </li>
          <!-- 收藏我的最愛 -->
          <li
            @click="hideNavMenu()"
            @keydown="enter"
            class="nav-item d-flex align-items-center | my-4 me-8 | position-relative"
          >
            <router-link to="/myFavorite" class="d-flex text-dark nav-link">
              <!-- <i class="bi bi-heart fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i> -->
              <span class="material-icons fz-5 fz-md-6 text-dark | me-2 me-lg-0">
                favorite_border
              </span>
              <h5 class="d-lg-none text-dark">
                <strong>我的收藏</strong>
              </h5>
              <span
                v-if="fav"
                class="position-absolute top-25 start-100 translate-middle
                badge rounded-pill bg-brown1 fz-3 opacity-75 | d-none d-lg-block"
              >
                {{ fav }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </router-link>
          </li>
          <!-- 購物車 -->
          <li
            class="nav-item d-flex align-items-center | my-4 | position-relative"
            @click="
              openCartCanvas();
              hideNavMenu();
            "
            @keydown="enter"
          >
            <i class="bi bi-cart3 fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i>
            <!-- <span class="material-icons fz-5 fz-md-6 text-dark | me-2 me-lg-0">
              shopping_cart
            </span> -->
            <h5 class="d-lg-none text-dark">
              <strong>購物車</strong>
            </h5>
            <span
              v-if="cartsTotal"
              class="position-absolute top-25 start-100 translate-middle
              badge rounded-pill bg-brown1 fz-3 opacity-75 | d-none d-lg-block"
            >
              {{ cartsTotal }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <CanvasCart ref="cartCanvas" />
</template>

<script>
import CanvasCart from '@/components/CanvasCart.vue';
import emitter from '@/methods/mitt';
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  name: 'FrontNavbarFixed',
  data() {
    return {
      carts: [],
      cartsTotal: 0,
      fav: 0,
      navMenu: '',
    };
  },
  components: {
    CanvasCart,
  },
  inject: ['emitter'],
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data;
          this.cartsTotal = this.calcCartsTotal(this.carts.carts);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    calcCartsTotal(arr) {
      let sum = 0;
      arr.forEach((item) => {
        sum += item.qty;
      });
      return sum;
    },
    getFav() {
      if (localStorage.getItem('myFavorite')) {
        const jsonData = JSON.parse(localStorage.getItem('myFavorite'));
        this.calcFav(jsonData);
      }
    },
    calcFav(collection) {
      this.fav = Object.keys(collection).length;
    },
    openCartCanvas() {
      this.$refs.cartCanvas.openCanvas();
    },
    toggleNavMenu() {
      this.navMenu.toggle();
    },
    hideNavMenu() {
      this.navMenu.hide();
    },
  },
  mounted() {
    this.getCart();
    this.getFav();
    // emitter
    emitter.on('get-cart', () => {
      this.getCart();
    });
    emitter.on('get-fav', () => {
      this.getFav();
    });
    // 解決手機版 Menu 無法自動收合問題
    this.navMenu = new Collapse(this.$refs.navMenu, {
      toggle: false,
    });
  },
};
</script>

<style>
.nav-item {
  cursor: pointer;
}
</style>
