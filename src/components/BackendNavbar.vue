<template>
  <!-- 後台導覽列 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark | py-4">
    <div class="container">
      <router-link to="/" class="text-light me-8">
        <i class="bi bi-box-arrow-left fs-4 me-1"></i>
        返回前台
      </router-link>
      <router-link to="./products" class="text-light me-8">
        <i class="bi bi-boxes fs-4 me-1"></i>
        產品列表
      </router-link>
      <router-link to="./orders" class="text-light me-8">
        <i class="bi bi-clipboard-data fs-4 me-1"></i>
        訂單列表
      </router-link>
      <router-link to="./coupon" class="text-light me-8">
        <i class="bi bi-ticket-perforated fs-4 me-1"></i>
        優惠券管理
      </router-link>
      <!-- 漢堡 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarList"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 選單內容 -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarList">
        <ul class="navbar-nav">
          <!-- 後台管理人員登入 -->
          <li class="btn nav-item d-flex align-items-center"
           @click="openLoginModel" @keydown="login">
            <i class="bi bi-person-circle fs-4 text-light | me-2 me-lg-0"></i>
            <p class="d-lg-none text-light">後台管理人員登入</p>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ModalLogin ref="loginModal" />
</template>

<script>
import ModalLogin from '@/components/ModalLogin.vue';

export default {
  name: 'BackendNavbar',
  components: {
    ModalLogin,
  },
  methods: {
    openLoginModel() {
      this.$refs.loginModal.openModal();
    },
  },
};
</script>
