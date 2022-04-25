<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- NavBar -->
  <FrontNavbarFixed />
  <!-- 產品列表 -->
  <section class="container my-16 my-lg-20">
    <h2 class="text-center">來選好食</h2>
    <hr class="mt-8 mb-10" />
    <div class="row">
      <!-- 品項分類按鈕 -->
      <div class="col-12 col-lg-3 mb-10">
        <div class="row g-2 g-sm-1 g-md-3 g-lg-4 | pe-0 pe-lg-10">
          <div v-for="(item, i) in Object.keys(categories)" :key="i"
          class="col-4 col-md-3 col-lg-12">
            <button type="button"
            class="btn btn-outline-gray1 fw-bold w-100 p-2 mb-1"
            :class="{ active: item===showCategory }"
            @click="filterCategory(item)">
              {{ item }}
              <span class="fz-3 fz-md-4">
                {{ categories[item] ? `（${categories[item]}）` : '' }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="col-12 col-lg-9">
        <div class="row">
          <!-- 第一張卡片 -->
          <div
            v-for="item in products"
            :key="item.id"
            :class="{ 'd-none': item.category !== showCategory && showCategory !== '全部商品' }"
            class="col-6 col-md-4 col-lg-6 col-xl-4 | p-lg-6 p-xl-4 | mb-8"
          >
            <div class="card rounded-4 overflow-hidden w-100">
              <router-link :to="`/product/${item.id}`">
                <div class="ratio ratio-4x3 hoverMask hvr-grow">
                  <i class="bi bi-zoom-in"></i>
                  <img :src="item.imageUrl" class="img-cover" :alt='item.title' />
                </div>
              </router-link>
              <div class="card-body">
                <h4 class="d-none d-lg-block | fz-6 mb-2">
                  {{ item.title }}
                </h4>
                <h4 class="d-block d-lg-none | fz-4 fz-md-5 mb-2 text-center">
                  {{ item.title }}
                </h4>
                <div class="d-none d-lg-flex | mb-4
                 align-items-center justify-content-between">
                  <p class="fw-bold">
                    好食價 <span class="fz-5 text-danger">{{ item.price }}</span> 元
                  </p>
                  <p class="fz-4 text-muted">
                    <s>原價 {{ item.origin_price }} 元</s>
                  </p>
                </div>
                <div class="d-md-block d-lg-none | mb-4
                 text-center">
                  <p class="fw-bold">
                    NT
                    <span class="fz-5 text-danger mx-2">{{ item.price }}</span>
                    <s class="fz-4 fw-normal text-muted">{{ item.origin_price }}</s>
                    元
                  </p>
                </div>
                <div class="d-flex justify-content-between">
                  <button type="button"
                    @click="addCollection(item)"
                    class="btn btn-outline-danger d-flex align-items-center"
                    :class="{ active: collection[item.id] }"
                  >
                    <i class="bi bi-heart"></i>
                    <span class="d-none d-md-block | ms-2">
                      收藏
                    </span>
                  </button>
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
                      <span class="d-none d-md-block">
                        加入購物車
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay2.vue';
import FrontNavbarFixed from '@/components/FrontNavbarFixed.vue';

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
      collection: {},
    };
  },
  inject: ['emitter'],
  components: {
    VueLoader,
    FrontNavbarFixed,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
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
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
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
          console.dir(err);
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
          const name = res.data.data.product.title;
          const msg = res.data.message;
          this.emitter.emit('toast-msg', {
            style: 'success',
            content: `${name} ${msg}`,
          });
          this.is_loadingItem = '';
          this.getCart();
          // 給導覽列使用
          this.emitter.emit('get-cart');
        })
        .catch((err) => {
          const msg = err.response.data.message || '出現錯誤，請重試一次！';
          this.emitter.emit('toast-msg', {
            style: 'error',
            content: `${msg}`,
          });
          this.is_loadingItem = '';
        });
    },
    filterCategory(category) {
      this.showCategory = category;
    },
    addCollection(item) {
      const fvID = item.id;
      if (this.collection[fvID]) {
        delete this.collection[fvID];
      } else {
        this.collection[fvID] = item;
      }
      localStorage.setItem('myFavorite', JSON.stringify(this.collection));
      this.emitter.emit('toast-msg', {
        style: 'success',
        content: `${item.title} 加入我的收藏囉！`,
      });
      // 給導覽列使用
      this.emitter.emit('get-fav');
    },
    getCollection() {
      if (localStorage.getItem('myFavorite')) {
        const jsonData = JSON.parse(localStorage.getItem('myFavorite'));
        this.collection = jsonData;
      }
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
    this.getCollection();
    this.emitter.emit('nav-fix');
  },
};
</script>

<style>
.card:hover {
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 25%);
}
</style>
