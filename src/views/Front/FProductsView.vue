<template>
  <!-- 產品列表 -->
  <section class="container | my-20">
    <h2 class="text-center">來選好食</h2>
    <hr class="my-6" />
    <div class="row">
      <!-- 第一張卡片 -->
      <div
        v-for="item in products"
        :key="item.id"
        class="col-12 col-lg-4 | mb-6"
      >
        <div class="card rounded-4 overflow-hidden shadow w-100">
          <div class="ratio ratio-4x3">
            <img :src="item.imageUrl" class="card-img-top img-cover" alt='' />
          </div>
          <div class="card-body">
            <div class="mb-4">
              <h4 class="mb-2">{{ item.title }}</h4>
              <p>原價：{{ item.origin_price }}</p>
              <p>優惠價：{{ item.price }}</p>
            </div>
            <div class="d-flex justify-content-between">
                <router-link :to="`/product/${item.id}`">
                  <button type="button"
                    class="btn btn-outline-gray d-flex align-items-center"
                  >
                    <i class="bi bi-eye-fill me-2"></i>
                    詳細內容
                  </button>
                </router-link>
              <button
                @click="addCart(item.id)"
                :disabled="item.id === is_loadingItem"
                type="button"
                class="btn btn-dark d-flex align-items-center"
              >
                <div
                  v-if="item.id === is_loadingItem"
                  class="spinner-border text-warning"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                  <i class="bi bi-cart3 me-2"></i>
                  加入購物車
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      is_loadingItem: '',
      carts: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`,
        )
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getCart() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`,
        )
        .then((res) => {
          this.carts = res.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.is_loadingItem = id;

      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`,
          { data },
        )
        .then((res) => {
          console.log(res.data);
          const name = res.data.data.product.title;
          const msg = res.data.message;
          // SweetAlert：產品成功加入購物車
          this.$swal.fire({
            icon: 'success',
            title: '成功！',
            text: `${name} ${msg}`,
          });
          this.getCart();
          this.is_loadingItem = '';
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    showLoading() {
      const loader = this.$loading.show();
      setTimeout(() => {
        loader.hide();
      }, 1000);
      // this.isLoading = true;
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
    this.showLoading();
  },
};
</script>
