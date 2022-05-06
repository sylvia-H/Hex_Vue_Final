<template>
  <hr class="my-12" />
  <div class="mb-8">
    <table class="table m-0" style="max-width: 475px">
      <thead>
        <tr>
          <th colspan="8" scope="col">
            <h4 class="card-title">單人一天份推薦菜單</h4>
          </th>
        </tr>
        <tr class="text-center">
          <th scope="col">粗蛋白</th>
          <th scope="col">碳水化合物</th>
          <th scope="col">粗脂肪</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td>{{ menuInfo.protein }} g</td>
          <td>{{ menuInfo.carbohydrate }} g</td>
          <td>{{ menuInfo.crudeFat }} g</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Swiper class="py-5" :modules="modules" :breakpoints="swiper.breakpoints">
    <SwiperSlide v-for="item in menuProducts" :key="item.id">
      <div class="card rounded-0 mb-3 position-relative" style="max-width: 475px">
        <div
          @click="$emit('add-collection', item)"
          @keydown="enter"
          class="badgeFav position-absolute translate-middle-y top-3 end-0 fz-8"
        >
          <i v-if="collection[item.id]" class="bi bi-bookmark-heart-fill text-danger"></i>
          <i v-else class="bi bi-bookmark-heart-fill text-light4"></i>
        </div>
        <div class="row g-0">
          <div class="col-lg-5 d-flex flex-column justify-content-between">
            <div class="card-img">
              <RouterLink :to="{ name: 'product', params: { id: item.id } }">
                <img
                  :src="item.imageUrl"
                  class="img-cover"
                  :alt="item.title"
                />
              </RouterLink>
            </div>
            <div class="align-items-center justify-content-center">
              <p class="fz-4 fw-bold text-center">
                好食價
                <span class="fz-5 text-danger">{{ item.price }}</span>
                <span class="fz-4 text-muted mx-1">
                  <s>{{ item.origin_price }}</s> </span
                >元
              </p>
            </div>
            <div class="d-flex justify-content-center px-4 pb-4">
              <button
                @click="addCart(item.id)"
                :disabled="item.id === is_loadingItem"
                type="button"
                class="btn btn-dark d-flex align-items-center justify-content-center w-100"
              >
                <div
                  v-if="item.id === is_loadingItem"
                  class="spinner-border spinner-border-sm text-warning"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="d-flex" v-else>
                  <i class="bi bi-cart3 me-1"></i>
                  <span> 加入購物車 </span>
                </div>
              </button>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="card-body align-self-end">
              <table class="table m-0">
                <thead>
                  <tr>
                    <th colspan="2" scope="col">
                      <h5 class="card-title">{{ item.title }}</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">份量</th>
                    <td>
                      <span> {{ item.number }} 公克 </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">粗蛋白</th>
                    <td>{{ ((item.protein * item.number) / 100).toFixed(1) }} g</td>
                  </tr>
                  <tr>
                    <th scope="row">碳水化合物</th>
                    <td>{{ ((item.carbohydrate * item.number) / 100).toFixed(1) }} g</td>
                  </tr>
                  <tr>
                    <th scope="row">粗脂肪</th>
                    <td>{{ ((item.crudeFat * item.number) / 100).toFixed(1) }} g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
// swiper bundle styles
import 'swiper/swiper-bundle.min.css';
// swiper core styles
import 'swiper/swiper.min.css';
// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

// Import Swiper styles
export default {
  data() {
    return {
      is_loadingItem: '',
      modules: [Navigation, Pagination],
      swiper: {
        breakpoints: {
          0: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
        },
      },
      menuProducts: [],
      menuInfo: {
        number: 0,
        protein: 0,
        carbohydrate: 0,
        crudeFat: 0,
      },
      menuCategory: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  inject: ['emitter'],
  props: ['products', 'collection'],
  methods: {
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
    selectMenu(info) {
      this.menuProducts = [];
      this.menuCategory = [];
      this.menuInfo = {
        protein: 0,
        carbohydrate: 0,
        crudeFat: 0,
      };
      const { protein, carbo, fat } = info;
      let proteinSum = 0;
      let carboSum = 0;
      let fatSum = 0;
      let item;
      while (proteinSum < protein || carboSum < carbo || fatSum < fat) {
        item = this.products[Math.floor(Math.random() * this.products.length)];
        if (!this.menuCategory.includes(item.category)) {
          proteinSum += (item.protein * item.number) / 100;
          carboSum += (item.carbohydrate * item.number) / 100;
          fatSum += (item.crudeFat * item.number) / 100;
          this.menuProducts.push(item);
          this.menuCategory.push(item.category);
        }
      }
      this.menuInfo = {
        protein: proteinSum.toFixed(2),
        carbohydrate: carboSum.toFixed(2),
        crudeFat: fatSum.toFixed(2),
      };
    },
  },
  mounted() {
    this.emitter.on('select-menu', (info) => {
      this.selectMenu(info);
    });
  },
};
</script>

<style>
.badgeFav {
  cursor: pointer;
}

.badgeFav .text-light4:hover {
  color: #666 !important;
}

@media only screen and (max-width: 991px) {
  .card-img{
    height: 180px;
  }
  .card .badgeFav {
    top: 2% !important;
  }
}

@media only screen and (min-width: 992px) {
  .card-img{
    height: 120px;
  }
}
</style>
