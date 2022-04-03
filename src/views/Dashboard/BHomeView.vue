<template>
  <BackendNavbar />
  <router-view v-if="status" />
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
      const AUTH_TOKEN = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.status = true;
        })
        .catch((err) => {
          console.log(err.response);
          this.$router.push('./');
        });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
