<template>
  <div
    ref="cart_canvas"
    class="offcanvas offcanvas-end bg-light"
    tabindex="-1"
    aria-labelledby="cartLabel"
  >
    <!-- Cart 購物車 offcanvas-header -->
    <div class="offcanvas-header p-6">
      <!-- <h2 id="cartLabel" class="text-green1 fw-bold py-2">購物車列表</h2> -->
      <div></div>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <!-- Cart 購物車 offcanvas-body -->
    <div class="offcanvas-body fashion-scrollbar py-0 px-8 h-100">
      <!-- 營養素資訊 -->
      <div v-if="cartsTotal" class="bg-white border p-4">
        <h6 class="mb-2">
          您所選購的商品<span class="fw-bold ms-2">總熱量</span>：{{ calorie }} kcal(仟卡)
        </h6>
        <div>
          <span class="text-green1 fw-bold">碳水化合物</span> {{ carbohydrate }} g、
          <span class="text-green1 fw-bold">粗蛋白質</span> {{ protein }} g、
          <span class="text-green1 fw-bold">粗脂肪</span> {{ crudeFat }} g
        </div>
      </div>
      <!-- 當購物車沒有品項時 -->
      <div v-else class="d-flex flex-column align-items-center justify-content-center h-100">
        <i class="bi bi-cart4 text-gray fz-24"></i>
        <p class="text-gray fz-5 mb-6">把喜愛的美食加進來吧！</p>
        <RouterLink to="/products" @click="closeCanvas">
          <button type="button" class="btn btn-warning px-4 py-2">來去逛逛</button>
        </RouterLink>
      </div>
      <!-- Card 購物車卡片01 -->
      <div v-for="item in carts.carts" :key="item.id" class="py-6 px-4 mb-3 border-bottom">
        <div class="row g-0">
          <!-- 刪除商品 -->
          <div class="col-2 d-flex justify-content-center align-items-center">
            <button
              @click="openDelCartModal(item.id, item.product.title)"
              class="btn"
              type="button"
            >
              <i class="bi bi-trash3-fill fz-5"></i>
            </button>
          </div>
          <!-- 商品圖片 -->
          <div class="col-4 border">
            <img class="img-cover" :src="item.product.imageUrl" :alt="item.product.title" />
          </div>
          <!-- 商品資訊 -->
          <div class="col-6 ps-4">
            <div class="row">
              <div class="col-12 d-flex flex-column">
                <h5 class="mb-2">
                  {{ item.product.title }}
                </h5>
                <p class="mb-2">
                  NT
                  <span v-if="item.product.origin_price !== item.product.price" class="text-gray">
                    <s>{{ item.product.origin_price }}</s>
                  </span>
                  {{ item.product.price }} 元
                </p>
                <!-- 數量調整按鈕 -->
                <div
                  class="w-75 btn-group d-flex justify-content-around align-items-center"
                  role="group"
                  aria-label="Basic"
                >
                  <button
                    @click="editCart(item.id, item.qty - 1)"
                    :disabled="item.qty - 1 === 0"
                    type="button"
                    class="btn btn-outline-dark fw-bold"
                  >
                    －
                  </button>
                  <!-- eslint-disable-next-line -->
                  <input
                    :value="item.qty"
                    type="text"
                    class="border-dark form-control-plaintext fw-bold text-black text-center"
                  />
                  <button
                    @click="editCart(item.id, item.qty + 1)"
                    type="button"
                    class="btn btn-outline-dark fw-bold"
                  >
                    ＋
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart 購物車 offcanvas-footer -->
    <div v-if="cartsTotal" class="offcanvas-footer bg-cream3 border-2 border-top px-9">
      <div class="d-flex justify-content-end align-items-center py-4">
        <p class="h5 text-dark me-24">總計</p>
        <span class="h5 text-dark ms-2">NT$ {{ carts.total }}</span>
      </div>
      <RouterLink :to="{ name: 'checkoutCart' }" :class="{ 'pe-none': !cartsTotal }">
        <button
          type="button"
          class="w-100 btn btn-green1 rounded-0 py-2 fw-bold"
          :disabled="carts.carts?.length === 0"
          @click="closeCanvas()"
        >
          前往結帳
        </button>
      </RouterLink>
      <div class="text-end">
        <button
          type="button"
          class="btn text-gray py-4 px-0"
          :disabled="carts.carts?.length === 0"
          @click="openDelCartModal()"
        >
          清空購物車
        </button>
      </div>
    </div>
  </div>
  <ModalDelCart ref="delCartModal" />
</template>

<script>
import { Offcanvas } from 'bootstrap';
import ModalDelCart from '@/components/frontend/ModalDelCart.vue';

export default {
  name: 'CanvasCart',
  components: {
    ModalDelCart,
  },
  data() {
    return {
      canvas: '',
      carts: [],
      cartsTotal: 0,
      calorie: 0,
      carbohydrate: 0,
      protein: 0,
      crudeFat: 0,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    calcNutrients() {
      this.calorie = 0;
      this.carbohydrate = 0;
      this.protein = 0;
      this.crudeFat = 0;
      this.carts.carts.forEach((item) => {
        this.calorie += Math.floor(item.product.calorie * (item.product.number / 100) * item.qty);
        this.carbohydrate += Math.floor(
          item.product.carbohydrate * (item.product.number / 100) * item.qty,
        );
        this.protein += Math.floor(item.product.protein * (item.product.number / 100) * item.qty);
        this.crudeFat += Math.floor(item.product.crudeFat * (item.product.number / 100) * item.qty);
      });
    },
    getCart() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data;
          this.cartsTotal = this.calcCartsTotal(this.carts.carts);
          this.calcNutrients();
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    calcCartsTotal(arr) {
      let sum = 0;
      arr.forEach((item) => {
        sum += item.qty;
      });
      return sum;
    },
    openCanvas() {
      this.getCart();
      this.canvas.show();
    },
    closeCanvas() {
      this.canvas.hide();
    },
    editCart(id, qty) {
      this.isLoading = true;
      const data = {
        product_id: id,
        qty,
      };
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`, { data })
        .then(() => {
          this.getCart();
          // 給導覽列使用
          this.emitter.emit('get-cart');
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    openDelCartModal(id, title) {
      this.$refs.delCartModal.openModal(id, title);
    },
  },
  mounted() {
    this.getCart();
    this.canvas = new Offcanvas(this.$refs.cart_canvas);
    // emitter
    this.emitter.on('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
