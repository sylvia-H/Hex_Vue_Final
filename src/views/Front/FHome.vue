<template>
  <div id="mainLayout">
    <RouterView />
  </div>
  <FrontFooter />
</template>

<script>
import FrontFooter from '@/components/FrontFooter.vue';

export default {
  components: {
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
