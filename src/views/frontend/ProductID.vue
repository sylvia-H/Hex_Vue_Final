<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 產品列表 -->
  <section class="container | py-10">
    <div class="row">
      <div class="d-flex mx-8 mb-10">
        <RouterLink to="../" class="text-gray"> 首頁 </RouterLink>
        <span class="text-miute mx-2">/</span>
        <RouterLink to="../products" class="text-gray"> 來選好食 </RouterLink>
        <span class="text-mute mx-2">/</span>
        <p class="text-green1">
          {{ product.title }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <h2 class="text-center">
          {{ product.title }}
        </h2>
        <div class="col-12">
          <div
            v-if="tempImgUrl"
            class="border overflow-hidden rounded-3 shadow heightLimit_main | m-8"
          >
            <img class="img-cover" :src="tempImgUrl" :alt="product.title" />
          </div>
        </div>
        <div v-if="product.imagesUrl" class="row m-6">
          <div class="col-4">
            <div class="border overflow-hidden rounded-3 heightLimit_thumb">
              <img
                class="img-cover btn p-0"
                :src="product.imageUrl"
                :alt="product.title"
                @click="changeTemp"
                @keydown="enter"
              />
            </div>
          </div>
          <div class="col-4" v-for="(imgUrl, i) in product.imagesUrl" :key="i">
            <div class="border overflow-hidden rounded-3 heightLimit_thumb">
              <img
                class="img-cover btn p-0"
                :src="imgUrl"
                :alt="product.title"
                @click="changeTemp"
                @keydown="enter"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 | pt-15">
        <!-- 產品介紹 product.description -->
        <div class="row | mb-5">
          <p>
            {{ product.description || '' }}
          </p>
        </div>
        <!-- 產品份量 & 價錢 -->
        <div class="row | my-5">
          <div class="col-10 offset-1">
            <hr />
            <div class="d-flex align-items-center">
              <p class="fw-bold">本產品內含份量：</p>
              <span>
                {{ product.number }}
                {{ product.unit }}
              </span>
            </div>
            <div class="d-flex align-items-center">
              <p class="fw-bold text-muted">原價：</p>
              <span class="text-muted" v-cloak>
                <s>{{ $filters.toCurrency(product.origin_price) }}</s> 元
              </span>
              <p class="ms-5">折扣後優惠價：</p>
              <span class="fw-bold text-danger fz-8" v-cloak>
                {{ $filters.toCurrency(product.price) }}
              </span>
              <p>元</p>
            </div>
            <hr />
          </div>
          <div class="col-10 offset-1 d-flex justify-content-between">
            <button
              type="button"
              @click="addCollection(product)"
              class="btn btn-outline-danger d-flex align-items-center"
              :class="{ active: collection[product.id] }"
            >
              <i class="bi bi-heart me-2"></i>
              加入我的最愛
            </button>
            <button
              @click="addCart(product.id)"
              :disabled="product.id === is_loadingItem"
              type="button"
              class="btn btn-dark d-flex align-items-center"
            >
              <div
                v-if="product.id === is_loadingItem"
                class="spinner-border spinner-border-sm text-warning"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <div v-else>
                <i class="bi bi-cart3 me-2"></i>
                馬上加進購物車
              </div>
            </button>
          </div>
        </div>
        <!-- 產品包裝及保存說明 product.content -->
        <div class="row | mb-10">
          <p class="fz-4 text-muted">
            {{ product.content || '' }}
          </p>
        </div>
        <!-- 營養素成份表 -->
        <div v-if="product.is_nutrients" class="row">
          <div class="col-12">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th colspan="4">食材內含主要營養素成份表（每 100g ）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" style="width: 30%">熱量</th>
                  <td style="width: 25%">{{ product.calorie }} kcal</td>
                  <td style="width: 30%">
                    <b>粗蛋白</b>
                  </td>
                  <td>{{ product.protein }} g</td>
                </tr>
                <tr>
                  <th scope="row">總碳水化合物</th>
                  <td>{{ product.carbohydrate }} g</td>
                  <td>
                    <b>膳食纖維</b>
                  </td>
                  <td>{{ product.DietaryFiber }} g</td>
                </tr>
                <tr>
                  <th scope="row">粗脂肪</th>
                  <td>{{ product.crudeFat }} g</td>
                  <td>
                    <b>飽和脂肪</b>
                  </td>
                  <td>{{ product.SaturatedFat }} g</td>
                </tr>
                <tr>
                  <th scope="row">鈉</th>
                  <td>{{ product.sodium }} mg</td>
                  <td>
                    <b>鈣</b>
                  </td>
                  <td>{{ product.calcium }} mg</td>
                </tr>
                <tr>
                  <th scope="row">鉀</th>
                  <td>{{ product.potassium }} mg</td>
                  <td>
                    <b>鋅</b>
                  </td>
                  <td>{{ product.zinc }} mg</td>
                </tr>
                <tr>
                  <th scope="row">鎂</th>
                  <td>{{ product.magnesium }} mg</td>
                  <td>
                    <b>鐵</b>
                  </td>
                  <td>{{ product.iron }} mg</td>
                </tr>
              </tbody>
            </table>
            <p class="text-start fz-3">
              ✵ 依據衛生福利部食品藥物管理署所公佈<a
                href="https://data.gov.tw/dataset/8543"
                target="_blank"
                >「食品營養成分資料集」</a
              >資料內容
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-12" />
    <!-- Swiper 推薦同類別商品 -->
    <div>
      <h3 class="mb-8 ms-8">這些你也會喜歡...</h3>
      <SwiperRecommend
        class="ms-8"
        :products="products"
        :collection="collection"
        @add-collection="addCollection"
      />
    </div>
  </section>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay2.vue';
import SwiperRecommend from '@/components/frontend/SwiperRecommend.vue';

export default {
  data() {
    return {
      is_navFixTop: true,
      product: {
        origin_price: '',
        price: '',
      },
      products: [],
      tempImgUrl: '',
      is_loadingItem: '',
      carts: [],
      collection: {},
      isLoading: false,
    };
  },
  components: {
    VueLoader,
    SwiperRecommend,
  },
  inject: ['emitter'],
  methods: {
    getProduct(id) {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.getTemp();
          this.getProducts(res.data.product.id, res.data.product.category);
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getProducts(id, category) {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products.filter(
            (item) => item.id !== id && item.category === category,
          );
        })
        .catch((err) => {
          const msg = err.response.data.message || '出現錯誤，請重試一次！';
          this.emitter.emit('toast-msg', {
            style: 'error',
            content: `${msg}`,
          });
        });
    },
    getTemp() {
      this.tempImgUrl = this.product.imageUrl;
    },
    changeTemp(e) {
      this.tempImgUrl = e.target.src;
    },
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`)
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
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`, { data })
        .then((res) => {
          const name = res.data.data.product.title;
          const msg = res.data.message;
          this.emitter.emit('toast-msg', {
            style: 'success',
            content: `${name} ${msg}`,
          });
          this.getCart();
          this.is_loadingItem = '';
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
    addCollection(item) {
      const fvID = item.id;
      if (this.collection[fvID]) {
        delete this.collection[fvID];
        this.emitter.emit('toast-msg', {
          style: 'success',
          content: `${item.title} 從我的收藏中移除囉！`,
        });
      } else {
        this.collection[fvID] = item;
        this.emitter.emit('toast-msg', {
          style: 'success',
          content: `${item.title} 加入我的收藏囉！`,
        });
      }
      localStorage.setItem('myFavorite', JSON.stringify(this.collection));
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
  watch: {
    $route() {
      const { id } = this.$route.params;
      this.getProduct(id);
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getProduct(id);
    this.getCart();
    this.getCollection();
  },
};
</script>

<style>
.heightLimit_main {
  height: 350px;
}
.heightLimit_thumb {
  height: 100px;
}
[v-cloak] {
  display: none !important;
}
</style>
