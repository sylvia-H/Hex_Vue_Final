<template>
  <div
    ref="cart_canvas"
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    aria-labelledby="cartLabel"
  >
    <!-- Cart 購物車 offcanvas-header -->
    <div class="offcanvas-header ps-8">
      <h2 id="cartLabel" class="text-white py-2">購物車列表</h2>
    </div>

    <!-- Cart 購物車 offcanvas-body -->
    <div class="offcanvas-body fashion-scrollbar ps-8 pt-1 h-100">
      <!-- 營養素資訊 -->
      <h6 v-if="is_cart" class="text-white mb-4">
        您所選購的商品<span class="text-green2">總熱量</span>：{{calorie}} kcal(仟卡)
      </h6>
      <h6 v-if="is_cart" class="text-white mb-4">
        共含<span class="text-warning">碳水化合物</span>總量 {{carbohydrate}} g、
        <span class="text-warning">粗脂肪</span>總量 {{protein}} g、
        <span class="text-warning">粗蛋白質</span>總量 {{crudeFat}} g
      </h6>
      <!-- Card 購物車卡片01 -->
      <div
        v-for="item in carts.carts"
        :key="item.id"
        class="card rounded-2 py-6 px-4 mb-3 position-relative"
      >
        <button
          @click="delCart(item.id, item.product.title)"
          class="btn-close position-absolute top-0 end-0 m-2"
          type="button"
          aria-label="Close"
        ></button>
        <div class="row g-0 align-items-center">
          <div class="col-3">
            <img
              class="img-cover w-100 h-100"
              :src="item.product.imageUrl"
              alt="..."
            />
          </div>
          <div class="col-9 ps-4">
            <div class="row">
              <div
                class="
                  col-7
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-center
                "
              >
                <h5 class="card-title mb-4">
                  {{ item.product.title }}
                </h5>
                <p class="card-text">
                  單價 NT
                  <span
                    v-if="item.product.origin_price !== item.product.price"
                    class="text-gray"
                  >
                    <s>{{ item.product.origin_price }}</s>
                  </span>
                  {{ item.product.price }} 元
                </p>
              </div>
              <div class="col-5 d-flex align-items-end">
                <div
                  class="
                    btn-group
                    d-flex
                    justify-content-around
                    align-items-center
                  "
                  role="group"
                  aria-label="Basic"
                >
                  <button
                    @click="editCart(item.id, item.qty - 1)"
                    :disabled="item.qty - 1 === 0"
                    type="button"
                    class="btn btn-warning fw-bold"
                  >
                    －
                  </button>
                  <!-- eslint-disable-next-line -->
                  <input
                    :value="item.qty"
                    type="text"
                    class="
                      form-control-plaintext
                      p-0
                      border-0
                      fw-bold
                      text-black text-center
                    "
                  />
                  <button
                    @click="editCart(item.id, item.qty + 1)"
                    type="button"
                    class="btn btn-warning fw-bold"
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
    <div
      class="
        offcanvas-footer
        d-flex
        justify-content-between
        align-items-center
        py-6
        px-8
      "
    >
      <div class="d-flex ai-c">
        <p class="h5 text-white me-24">小計</p>
        <span class="h5 text-white">NT$ {{ carts.total }}</span>
      </div>
      <div class="d-flex ai-c">
        <button
          @click="delCart(null)"
          :disabled="carts.carts?.length === 0"
          class="btn btn-outline-danger px-4 py-2 me-6"
        >
          清空購物車
        </button>
        <router-link :to="{ name: 'checkoutCart'}">
          <button
            type="button"
            class="btn btn-danger px-4 py-2"
            @click="closeCanvas()"
            :disabled="carts.carts?.length === 0"
          >
            前往結帳
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Offcanvas } from 'bootstrap';

export default {
  name: 'CanvasCart',
  data() {
    return {
      canvas: '',
      carts: [],
      is_cart: 0,
      calorie: 0,
      carbohydrate: 0,
      protein: 0,
      crudeFat: 0,
    };
  },
  methods: {
    calcNutrients() {
      this.calorie = 0;
      this.carbohydrate = 0;
      this.protein = 0;
      this.crudeFat = 0;
      this.carts.carts.forEach((item) => {
        this.calorie += Math.floor(item.product.calorie * (item.product.number / 100));
        this.carbohydrate += Math.floor(item.product.carbohydrate * (item.product.number / 100));
        this.protein += Math.floor(item.product.protein * (item.product.number / 100));
        this.crudeFat += Math.floor(item.product.crudeFat * (item.product.number / 100));
      });
    },
    getCart() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`,
        )
        .then((res) => {
          this.carts = res.data.data;
          this.is_cart = this.carts.carts.length;
          this.calcNutrients();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    openCanvas() {
      this.getCart();
      this.canvas.show();
    },
    closeCanvas() {
      this.canvas.hide();
    },
    editCart(id, qty) {
      const data = {
        product_id: id,
        qty,
      };
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`,
          { data },
        )
        .then(() => {
          this.getCart();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    delCart(id, title) {
      let url = '';
      if (id) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`;
        this.$swal
          .fire({
            title: `確定要將${title}刪除嗎？`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '確定刪除！',
            cancelButtonText: '取消',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$http
                .delete(url)
                .then(() => {
                  // 成功刪除產品，sweetalert 跳出提示訊息視窗
                  this.$swal.fire({
                    icon: 'success',
                    title: '成功！',
                    text: `您已將${title}刪除了！`,
                  });
                  this.getCart();
                })
                .catch((err) => {
                  console.log(err.response);
                  // 刪除失敗，sweetalert 跳出提示訊息視窗
                  this.$swal.fire({
                    icon: 'error',
                    title: '刪除失敗！',
                    text: '請再試一次',
                  });
                });
            }
          });
      } else {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/carts`;

        this.$swal
          .fire({
            title: '確定要清空購物車嗎？',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '確定刪除！',
            cancelButtonText: '取消',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$http
                .delete(url)
                .then(() => {
                  // 成功刪除產品，sweetalert 跳出提示訊息視窗
                  this.$swal.fire({
                    icon: 'success',
                    title: '成功！',
                    text: '您已將購物車清空了！',
                  });
                  this.getCart();
                })
                .catch((err) => {
                  console.log(err.response);
                  // 刪除失敗，sweetalert 跳出提示訊息視窗
                  this.$swal.fire({
                    icon: 'error',
                    title: '刪除失敗！',
                    text: '請再試一次',
                  });
                });
            }
          });
      }
    },
  },
  mounted() {
    this.getCart();
    this.canvas = new Offcanvas(this.$refs.cart_canvas);
  },
};
</script>
