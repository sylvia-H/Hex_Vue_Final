<template>
  <footer class="bg-dark position-relative">
    <div class="">
      <!-- Copyright -->
      <p class="h6 text-white text-center position-absolute
        top-0 start-0 bottom-0 end-0 m-auto">
        HEALTHY DIET © 2022. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<style>
footer {
  overflow: hidden;
  height: 10vh;
}
footer p {
  /* 須設定高度，才能使用 m-auto 置中 */
  height: 20px;
}
</style>

<script>
export default {
  name: 'FrontFooter',
};
</script>
