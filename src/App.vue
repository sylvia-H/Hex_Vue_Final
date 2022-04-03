<template>
  <router-view/>
</template>

<style lang="scss">
@import './assets/main';
@import 'bootstrap-icons/font/bootstrap-icons.css';
@import 'material-design-icons/iconfont/material-icons.css';
@import 'sweetalert2/dist/sweetalert2.min.css';
@import 'vue-loading-overlay/dist/vue-loading.css';
</style>

<script>
import emitter from '@/methods/mitt';

export default {
  provide() {
    return {
      emitter,
    };
  },
};
</script>
