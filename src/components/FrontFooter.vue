<template>
  <footer ref="footer" class="bg-dark text-white">
    <div class="h-100 position-relative">
      <div class="d-flex justify-content-center align-items-center
        position-absolute top-0 start-0 bottom-0 end-0 m-auto fz-4">
        <p class="d-none d-md-block">
          HEALTHY DIET © 2022. All Rights Reserved.
        </p>
        <p class="d-block d-md-none">
          HEALTHY DIET © 2022.
        </p>
        <span class="mx-4"> | </span>
        <!-- 後台管理人員登入 -->
        <div class="btn text-white fz-4 p-0 m-0" @click="openLoginModel()" @keydown="enter">
          後台
        </div>
      </div>
    </div>
  </footer>
  <ModalLogin ref="loginModal" />
</template>

<script>
import ModalLogin from '@/components/ModalLogin.vue';

export default {
  name: 'FrontFooter',
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

<style>
footer {
  overflow: hidden;
  height: 10vh;
}
footer p {
  /* 須設定高度，才能使用 m-auto 置中 */
  height: 20px;
}
</style>
