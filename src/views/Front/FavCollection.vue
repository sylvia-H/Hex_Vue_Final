<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- NavBar -->
  <FrontNavbarFixed />
  <section class="container | my-20" style="min-height: 90vh;">
    <h2 class="text-center">我的收藏</h2>
    <hr class="my-8" />
    <div class="row text-center">
      <div v-if="Object.keys(collection).length"
       class="col-12 table-responsive py-6">
        <!-- 我的收藏列表 lg 以上電腦版本 -->
        <table class="table table-hover | d-none d-lg-block">
          <thead>
            <tr>
              <th scope="col">品名</th>
              <th scope="col">類別</th>
              <th scope="col">內含份量</th>
              <th scope="col">總熱量</th>
              <th scope="col">總碳水化合物</th>
              <th scope="col">粗脂肪總量</th>
              <th scope="col">粗蛋白總量</th>
              <th scope="col">查看商品細節</th>
              <th scope="col">加入購物車</th>
              <th scope="col">收藏中</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Object.keys(collection)" :key="item">
              <th scope="row" class="align-middle">
                <span class="badge bg-primary mb-2">
                  {{ collection[item].category }}
                </span>
                <br />
                {{ collection[item].title }}
              </th>
              <td class="align-middle">
                <img class="max-w-100px"
                  :src="collection[item].imageUrl"
                  :alt="collection[item].title"
                />
              </td>
              <td class="align-middle">
                {{ collection[item].number }} {{ collection[item].unit }}
              </td>
              <td class="align-middle">
                {{ (collection[item].calorie * collection[item].number) / 100 }}
                kcal
              </td>
              <td class="align-middle">
                {{
                  (collection[item].carbohydrate * collection[item].number) / 100
                }}
                g
              </td>
              <td class="align-middle">
                {{ (collection[item].crudeFat * collection[item].number) / 100 }}
                g
              </td>
              <td class="align-middle">
                {{ (collection[item].protein * collection[item].number) / 100 }} g
              </td>
              <td class="align-middle">
                <router-link :to="`/product/${collection[item].id}`">
                  <i class="bi bi-zoom-in"></i>
                </router-link>
              </td>
              <td class="align-middle">
                <button
                  @click="addCart(item)"
                  :disabled="item === is_loadingItem"
                  type="button"
                  class="btn btn-dark d-flex align-items-center"
                >
                  <div
                    v-if="item === is_loadingItem"
                    class="spinner-border text-warning"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div v-else class="d-flex w-100">
                    <i class="bi bi-cart3 me-1"></i>
                    <span class="d-none d-xl-block"> 加入購物車 </span>
                    <span class="d-none d-lg-block d-xl-none"> 想買 </span>
                  </div>
                </button>
              </td>
              <td class="align-middle">
                <button
                  type="button"
                  @click="addCollection(collection[item])"
                  class="btn btn-outline-danger d-flex align-items-center"
                  :class="{ active: collection[item] }"
                >
                  <i class="bi bi-heart"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 我的收藏列表 md 平板版本 -->
        <table class="table table-hover | d-none d-md-block d-lg-none">
          <thead>
            <tr>
              <th scope="col">品名</th>
              <th scope="col">類別</th>
              <th scope="col">內含份量</th>
              <th scope="col">總熱量</th>
              <th scope="col">查看商品細節</th>
              <th scope="col">加入購物車</th>
              <th scope="col">收藏中</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Object.keys(collection)" :key="item">
              <th scope="row" class="align-middle">
                <span class="badge bg-primary mb-2">
                  {{ collection[item].category }}
                </span>
                <br />
                {{ collection[item].title }}
              </th>
              <td class="align-middle">
                <img class="max-w-100px"
                  :src="collection[item].imageUrl"
                  :alt="collection[item].title"
                />
              </td>
              <td class="align-middle">
                {{ collection[item].number }} {{ collection[item].unit }}
              </td>
              <td class="align-middle">
                {{ (collection[item].calorie * collection[item].number) / 100 }}
                kcal
              </td>
              <td class="align-middle">
                <router-link :to="`/product/${collection[item].id}`">
                  <i class="bi bi-zoom-in"></i>
                </router-link>
              </td>
              <td class="align-middle">
                <button
                  @click="addCart(item)"
                  :disabled="item === is_loadingItem"
                  type="button"
                  class="btn btn-dark d-flex align-items-center"
                >
                  <div
                    v-if="item === is_loadingItem"
                    class="spinner-border text-warning"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="d-flex" v-else>
                    <i class="bi bi-cart3 me-1"></i>
                    <span class="d-none d-md-block"> 想買 </span>
                  </div>
                </button>
              </td>
              <td class="align-middle">
                <button
                  type="button"
                  @click="addCollection(collection[item])"
                  class="btn btn-outline-danger d-flex align-items-center"
                  :class="{ active: collection[item] }"
                >
                  <i class="bi bi-heart"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 我的收藏列表 md 以下手機版本 -->
        <table class="table table-hover | d-block d-md-none">
          <thead>
            <tr>
              <th scope="col">品名</th>
              <th scope="col">類別</th>
              <th scope="col">內含份量</th>
              <th scope="col">查看商品細節</th>
              <th scope="col">加入購物車</th>
              <th scope="col">收藏中</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Object.keys(collection)" :key="item">
              <th scope="row" class="align-middle">
                <span class="badge bg-primary mb-2">
                  {{ collection[item].category }}
                </span>
                <br />
                {{ collection[item].title }}
              </th>
              <td class="align-middle">
                <img class="max-w-100px"
                  :src="collection[item].imageUrl"
                  :alt="collection[item].title"
                />
              </td>
              <td class="align-middle">
                {{ collection[item].number }} {{ collection[item].unit }}
              </td>
              <td class="align-middle">
                <router-link :to="`/product/${collection[item].id}`">
                  <i class="bi bi-zoom-in"></i>
                </router-link>
              </td>
              <td class="align-middle">
                <button
                  @click="addCart(item)"
                  :disabled="item === is_loadingItem"
                  type="button"
                  class="btn btn-dark d-flex align-items-center"
                >
                  <div
                    v-if="item === is_loadingItem"
                    class="spinner-border text-warning"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="d-flex" v-else>
                    <i class="bi bi-cart3 me-1"></i>
                    <span class="d-none d-lg-block"> 想買 </span>
                  </div>
                </button>
              </td>
              <td class="align-middle">
                <button
                  type="button"
                  @click="addCollection(collection[item])"
                  class="btn btn-outline-danger d-flex align-items-center"
                  :class="{ active: collection[item] }"
                >
                  <i class="bi bi-heart"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="col-12 py-6">
        <p class="text-orange1 fz-6 mb-4">
          再多逛逛，把喜愛的商品收藏起來吧！
        </p>
        <i class="bi bi-search-heart text-orange1 fz-25"></i>
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
      isLoading: false,
      is_loadingItem: '',
      collection: {},
    };
  },
  components: {
    VueLoader,
    FrontNavbarFixed,
  },
  inject: ['emitter'],
  methods: {
    addCollection(item) {
      const fvID = item.id;
      if (this.collection[fvID]) {
        delete this.collection[fvID];
      } else {
        this.collection[fvID] = item;
      }
      localStorage.setItem('myFavorite', JSON.stringify(this.collection));
      // 給導覽列使用
      this.emitter.emit('get-fav');
    },
    getCollection() {
      if (localStorage.getItem('myFavorite')) {
        this.isLoading = true;
        const jsonData = JSON.parse(localStorage.getItem('myFavorite'));
        this.collection = jsonData;
        this.isLoading = false;
      }
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
  },
  mounted() {
    this.getCollection();
  },
};
</script>

<style>
.max-w-100px {
  max-width: 100px;
}
</style>
