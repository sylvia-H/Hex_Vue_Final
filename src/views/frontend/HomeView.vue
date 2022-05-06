<template>
  <FrontNavbarFixed />
  <RouterView />
  <FrontFooter />
</template>

<script>
import FrontNavbarFixed from '@/components/frontend/FrontNavbarFixed.vue';
import FrontFooter from '@/components/frontend/FrontFooter.vue';

export default {
  components: {
    FrontNavbarFixed,
    FrontFooter,
  },
};
</script>
