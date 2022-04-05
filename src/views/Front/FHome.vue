<template>
  <FrontNavbar />
  <!-- <div class="container-fluid position-relative mt-19"> -->
  <div>
    <router-view id="mainLayout" />
  </div>
  <FrontFooter />
</template>

<style>
#mainLayout {
  position: relative;
  min-height: 90vh;
}
</style>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter,
  },
};
</script>
