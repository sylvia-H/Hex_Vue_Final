<template>
  <BackendNavbar />
  <RouterView v-if="status" />
</template>

<script>
import BackendNavbar from '@/components/BackendNavbar.vue';

export default {
  components: {
    BackendNavbar,
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    checkLogin() {
      const loader = this.$loading.show();
      const AUTH_TOKEN = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          loader.hide();
          this.status = true;
        })
        .catch(() => {
          loader.hide();
          this.$router.push('./');
        });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
