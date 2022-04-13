<template>
  <FrontNavbar />
  <div>
    <RouterView id="mainLayout" />
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

<style>
#mainLayout {
  position: relative;
  min-height: 90vh;
}
</style>
