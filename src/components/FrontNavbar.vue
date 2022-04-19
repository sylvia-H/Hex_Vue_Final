<template>
  <!-- 前台導覽列 -->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top
    bg-cream3 shadow-sm opacity-75 | py-2 py-md-4 py-lg-2">
    <div class="container">
      <router-link to="/" class="text-center me-10">
        <h1 class="text-green1 fz-7 fz-md-9"><strong>好食遞</strong></h1>
        <span class="text-gray fz-3">HEALTHY DIET</span>
      </router-link>
      <router-link to="/products"
      class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <span class="material-icons me-2">
          restaurant_menu
        </span>
        <h5><strong>來選好食</strong></h5>
      </router-link>
      <router-link to="/dietInfo"
      class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <i class="bi bi-lightbulb-fill me-2"></i>
        <h5><strong>食前好思</strong></h5>
      </router-link>
      <router-link to="/aboutShipping"
      class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <span class="material-icons me-2">
          local_shipping
        </span>
        <h5><strong>如何好遞</strong></h5>
      </router-link>
      <!-- 漢堡 -->
      <button
        class="navbar-toggler"
        ref="btnToggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarList"
        aria-controls="navbarList"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 選單內容 -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarList">
        <ul class="navbar-nav py-6 py-md-5 py-lg-0">
          <li @click="autoCollapse()" @keydown="enter"
           class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none">
            <router-link to="/products"
             class="d-flex text-dark nav-link">
              <span class="material-icons me-2">
                restaurant_menu
              </span>
              <h5><strong>來選好食</strong></h5>
            </router-link>
          </li>
          <li @click="autoCollapse()" @keydown="enter"
           class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none">
            <router-link to="/dietInfo" class="d-flex text-dark nav-link">
              <i class="bi bi-lightbulb-fill fs-5 text-dark | me-2 me-lg-0"></i>
              <h5><strong>食前好思</strong></h5>
            </router-link>
          </li>
          <li @click="autoCollapse()" @keydown="enter"
           class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none">
            <router-link to="/aboutShipping" class="d-flex text-dark nav-link">
              <span class="material-icons me-2">
                local_shipping
              </span>
              <h5><strong>如何好遞</strong></h5>
            </router-link>
          </li>
          <!-- 收藏我的最愛 -->
          <li @click="autoCollapse()" @keydown="enter"
           class="nav-item d-flex align-items-center | my-4 me-5">
            <router-link to="/myFavorite" class="d-flex text-dark nav-link">
              <i class="bi bi-heart fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i>
              <h5 class="d-lg-none text-dark">
                <strong>我的收藏</strong>
              </h5>
            </router-link>
          </li>
          <!-- 購物車 -->
          <li class="nav-item d-flex align-items-center | my-4 me-5 | position-relative"
            @click="openCartCanvas();autoCollapse();" @keydown="enter">
            <i class="bi bi-cart3 fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i>
            <h5 class="d-lg-none text-dark">
              <strong>購物車</strong>
            </h5>
            <!-- <span v-if="is_cart" class="position-absolute top-25 start-75 translate-middle
              badge rounded-pill bg-orange1 opacity-75 fz-3">
              {{is_cart}}
              <span class="visually-hidden">unread messages</span>
            </span> -->
          </li>
          <!-- 後台管理人員登入 -->
          <li class="nav-item d-flex align-items-center | my-4"
            @click="openLoginModel();autoCollapse();" @keydown="enter">
            <i class="bi bi-person-circle fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i>
            <h5 class="d-lg-none text-dark">
              <strong>後台管理人員登入</strong>
            </h5>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <CanvasCart ref="cartCanvas" />
  <ModalLogin ref="loginModal" />
</template>

<script>
import CanvasCart from '@/components/CanvasCart.vue';
import ModalLogin from '@/components/ModalLogin.vue';

export default {
  name: 'FrontNavbar',
  components: {
    CanvasCart,
    ModalLogin,
  },
  methods: {
    openLoginModel() {
      this.$refs.loginModal.openModal();
    },
    openCartCanvas() {
      this.$refs.cartCanvas.openCanvas();
    },
    autoCollapse() {
      if (this.$refs.btnToggler.getAttribute('aria-expanded') !== false) {
        this.$refs.btnToggler.click();
      }
    },
  },
};
</script>

<style>
.nav-item{
  cursor: pointer;
}
</style>
