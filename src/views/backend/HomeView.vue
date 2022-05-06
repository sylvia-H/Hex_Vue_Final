<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <BackendNavbar />
  <RouterView v-if="status" />
</template>

<script>
import BackendNavbar from '@/components/backend/BackendNavbar.vue';
import VueLoader from '@/components/LoadingOverlay.vue';

export default {
  components: {
    BackendNavbar,
    VueLoader,
  },
  data() {
    return {
      isLoading: false,
      status: false,
    };
  },
  methods: {
    checkLogin() {
      this.isLoading = true;
      const AUTH_TOKEN = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.isLoading = false;
          this.status = true;
        })
        .catch(() => {
          this.isLoading = false;
          this.$router.push('./');
        });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
