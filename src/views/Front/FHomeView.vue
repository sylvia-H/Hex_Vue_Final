<template>
  <CarouselHero />
</template>

<script>
import CarouselHero from '@/components/CarouselHero.vue';

export default {
  components: {
    CarouselHero,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    showLoading() {
      const loader = this.$loading.show();
      setTimeout(() => {
        loader.hide();
      }, 600);
    },
  },
  mounted() {
    this.showLoading();
  },
};
</script>
