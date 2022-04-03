<template>
  <FrontNavbar />
  <!-- <div class="container-fluid position-relative mt-19"> -->
  <div>
    <router-view />
  </div>
  <FrontFooter />
</template>

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
