<template>
  <!-- NavBar -->
  <FrontNavbar />
  <RouterView id="checkoutLayout" />
</template>

<script>
import emitter from '@/methods/mitt';
import FrontNavbar from '@/components/FrontNavbar.vue';

export default {
  components: {
    FrontNavbar,
  },
  inject: ['emitter'],
  mounted() {
    emitter.emit('nav-fix');
  },
};
</script>

<style>
#checkoutLayout {
  position: relative;
  min-height: 90vh;
}
</style>
