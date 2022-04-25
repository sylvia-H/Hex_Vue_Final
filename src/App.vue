<template>
  <RouterView />
  <ToastMsg />
</template>

<script>
import emitter from '@/methods/mitt';
import ToastMsg from '@/components/ToastMsg.vue';

export default {
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMsg,
  },
};
</script>

<style lang="scss">
@import './assets/main';
</style>
