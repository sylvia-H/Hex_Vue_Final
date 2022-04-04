<template>
  <div class="container my-20">
    <div class="row mb-6">
      <div class="col-12 col-lg-7">
        <div class="row g-0 | timeline">
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="w-light mt-5">確認訂單</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="fw-light mt-5">填寫訂購資訊</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="fw-light mt-5">填寫付款資訊</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="fw-bold mt-5">完成訂購</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 offset-md-3 col-md-6">
      <p class="text-center | mb-md-5">
        <i class="bi bi-check-circle | fz-30 text-success"></i>
      </p>
      <p class="fz-6 text-success | text-center | mb-md-5">謝謝您！</p>
      <p class="fz-6 text-success | text-center | mb-md-5">訂單成立 已完成付款</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showLoading() {
      const loader = this.$loading.show();
      setTimeout(() => {
        loader.hide();
      }, 500);
      // this.isLoading = true;
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    },
  },
  mounted() {
    this.showLoading();
  },
};
</script>
