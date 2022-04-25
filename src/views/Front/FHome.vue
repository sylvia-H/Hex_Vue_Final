<template>
  <RouterView />
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
