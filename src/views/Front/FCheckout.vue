<template>
  <!-- NavBar -->
  <FrontNavbarFixed />
  <RouterView />
</template>

<script>
import FrontNavbarFixed from '@/components/FrontNavbarFixed.vue';

export default {
  components: {
    FrontNavbarFixed,
  },
};
</script>
