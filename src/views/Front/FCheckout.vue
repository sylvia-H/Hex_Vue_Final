<template>
  <!-- NavBar -->
  <FrontNavbarFixed />
  <RouterView id="checkoutLayout" />
</template>

<script>
import emitter from '@/methods/mitt';
import FrontNavbarFixed from '@/components/FrontNavbarFixed.vue';

export default {
  components: {
    FrontNavbarFixed,
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
