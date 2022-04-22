<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <CarouselHero />
</template>

<script>
import CarouselHero from '@/components/CarouselHero.vue';
import VueLoader from '@/components/LoadingOverlay2.vue';

export default {
  components: {
    CarouselHero,
    VueLoader,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1200);
  },
};
</script>
