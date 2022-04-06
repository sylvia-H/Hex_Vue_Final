<template>
  <!-- 產品列表 -->
  <section class="container | py-20">
    <h2 class="text-center">來選好食</h2>
    <hr class="my-6" />
    <!-- 品項分類按鈕 -->
    <div class="row">
      <div v-for="(item, i) in Object.keys(categories)" :key="i"
       class="col-4 col-sm-3 col-lg-2">
        <button type="button"
         class="btn btn-outline-blue2 fw-bold text-blue1 w-100 py-2 mb-4"
         :class="{ active: item===showCategory }"
         @click="filterCategory(item)">
          {{ item }}
          <span class="text-blue1">
            {{ categories[item] ? `（${categories[item]}）` : '' }}
          </span>
        </button>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="row">
      <!-- 第一張卡片 -->
      <div
        v-for="item in products"
        :key="item.id"
        :class="{ 'd-none': item.category !== showCategory && showCategory !== '全部商品' }"
        class="col-12 col-sm-6 col-md-4 col-lg-3 | mb-6"
      >
        <div class="card rounded-4 overflow-hidden shadow w-100">
          <div class="ratio ratio-4x3">
            <img :src="item.imageUrl" class="w-100 h-100 img-cover" alt='' />
          </div>
          <div class="card-body">
            <h4 class="fz-6 fz-md-5 fz-lg-6 mb-2">
              {{ item.title }}
            </h4>
            <div class="d-flex align-items-center justify-content-between | mb-4">
              <p class="fw-bold">
                好食價 <sapn class="fz-5 text-danger">{{ item.price }}</sapn> 元
              </p>
              <p class="fz-4 text-muted">
                <s>原價 {{ item.origin_price }} 元</s>
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <router-link :to="`/product/${item.id}`">
                <button type="button"
                  class="btn btn-outline-gray d-flex align-items-center"
                >
                  <i class="bi bi-eye-fill me-1"></i>
                  <span class="d-block d-sm-none d-lg-block">
                    看更多
                  </span>
                  <span class="d-none d-sm-block d-lg-none">
                    詳細
                  </span>
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
                <div class="d-flex" v-else>
                  <i class="bi bi-cart3 me-1"></i>
                  <span class="d-block d-sm-none d-lg-block">
                    加入購物車
                  </span>
                  <span class="d-none d-sm-block d-lg-none">
                    購物車
                  </span>
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
      categories: {
        全部商品: '',
      },
      showCategory: '全部商品',
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
          this.products.forEach((item) => {
            if (!this.categories[item.category]) {
              this.categories[item.category] = 1;
            } else {
              this.categories[item.category] += 1;
            }
          });
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
    filterCategory(category) {
      this.showCategory = category;
    },
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
    this.getProducts();
    this.getCart();
  },
};
</script>
