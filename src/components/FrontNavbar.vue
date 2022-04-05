<template>
  <!-- 前台導覽列 -->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top
    bg-cream3 shadow-sm opacity-75 | py-5 py-md-4 py-lg-2">
    <div class="container">
      <!-- 首頁 logo -->
      <router-link to="/" class="text-center me-10">
        <!-- <i class="bi bi-house-heart-fill fs-4"></i> -->
        <h1 class="text-green1 fz-9"><strong>好食遞</strong></h1>
        <span class="text-gray fz-3">HEALTHY DIET</span>
      </router-link>
      <router-link to="/products"
       class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <!-- <i class="bi bi-boxes fs-4"></i> -->
        <span class="material-icons me-2">
          restaurant_menu
        </span>
        <h5><strong>來選好食</strong></h5>
      </router-link>
      <router-link to="/dietInfo"
       class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <!-- <i class="bi bi-boxes fs-4"></i> -->
        <i class="bi bi-lightbulb-fill me-2"></i>
        <h5><strong>食前好思</strong></h5>
      </router-link>
      <router-link to="/aboutShipping"
       class="d-none d-lg-flex text-dark me-8 | hvr-float-shadow">
        <!-- <i class="bi bi-boxes fs-4"></i> -->
        <span class="material-icons me-2">
          local_shipping
        </span>
        <h5><strong>如何好遞</strong></h5>
      </router-link>
      <!-- 漢堡 -->
      <button
        class="navbar-toggler"
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
          <li class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none">
            <router-link to="/products"
             class="d-flex text-dark nav-link">
              <!-- <i class="bi bi-boxes fs-4"></i> -->
              <span class="material-icons me-2">
                restaurant_menu
              </span>
              <h5><strong>來選好食</strong></h5>
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none">
            <router-link to="/dietInfo" class="d-flex text-dark nav-link">
              <!-- <i class="bi bi-boxes fs-4"></i> -->
              <i class="bi bi-lightbulb-fill fs-5 text-dark | me-2 me-lg-0"></i>
              <h5><strong>食前好思</strong></h5>
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center | my-4 me-4 d-lg-none">
            <router-link to="/aboutShipping" class="d-flex text-dark nav-link">
              <!-- <i class="bi bi-boxes fs-4"></i> -->
              <span class="material-icons me-2">
                local_shipping
              </span>
              <h5><strong>如何好遞</strong></h5>
            </router-link>
          </li>
          <!-- 購物車 -->
          <li class="nav-item d-flex align-items-center | my-4 me-4"
            @click="openCartCanvas" @keydown="canvas">
            <i class="bi bi-cart3 fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i>
            <h5 class="d-lg-none text-dark">
              <strong>購物車</strong>
            </h5>
          </li>
          <!-- 後台管理人員登入 -->
          <li class="nav-item d-flex align-items-center | my-4 me-4"
            @click="openLoginModel" @keydown="login">
            <!-- <router-link to="/login"> -->
              <i class="bi bi-person-circle fz-5 fz-md-6 text-dark | me-2 me-lg-0"></i>
              <h5 class="d-lg-none text-dark">
                <strong>後台管理人員登入</strong>
              </h5>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <CanvasCart ref="cartCanvas" />
  <ModalLogin ref="loginModal" />
</template>

<style>
.nav-item{
  cursor: pointer;
}
</style>

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
  },
};
</script>
