<template>
  <!-- 產品列表 -->
  <section class="container | my-20">
    <div class="row">
      <div class="col-12 col-md-6">
        <h2 class="text-center">
          {{ product.title }}
        </h2>
        <div class="col-12">
          <div class="border overflow-hidden rounded-3 shadow | m-8">
            <img class="w-100 heightLimit1 img-cover" :src="tempImgUrl" :alt="product.title">
          </div>
        </div>
        <div class="row m-6">
          <div class="col-4">
            <div class="border overflow-hidden rounded-3">
              <img class="w-100 heightLimit2 img-cover" :src="product.imageUrl" :alt="product.title"
                @click="changeTemp" @keydown="enter">
            </div>
          </div>
          <div class="col-4" v-for="(imgUrl, i) in product.imagesUrl" :key="i">
            <div class="border overflow-hidden rounded-3">
              <img class="w-100 heightLimit2 img-cover" :src="imgUrl" :alt="product.title"
                @click="changeTemp" @keydown="enter">
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
            <hr/>
            <div class="d-flex align-items-center">
              <p class="fw-bold">
                本產品內含份量：
              </p>
              <span>
                {{ product.number }}
                {{ product.unit }}
              </span>
            </div>
            <div class="d-flex align-items-center">
              <p class="fw-bold text-muted">
                原價：
              </p>
              <span class="text-muted">
                <s>{{ $filters.toCurrency(product.origin_price) }}</s> 元
              </span>
              <p class="ms-5">
                折扣後優惠價：
              </p>
              <span class="fw-bold text-danger fz-8">
                {{ $filters.toCurrency(product.price) }}
              </span>
              <p> 元</p>
            </div>
            <hr/>
          </div>
          <div class="col-10 offset-1">
            <button
              @click="addCart(product.id)"
              :disabled="product.id === is_loadingItem"
              type="button"
              class="btn btn-danger d-flex align-items-center ms-auto"
            >
              <div
                v-if="product.id === is_loadingItem"
                class="spinner-border text-warning"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <div v-else>
                <i class="bi bi-cart3 me-2"></i>
                馬上加入購物車
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
                  <th colspan="4">
                    食材內含主要營養素成份表（每 100g ）
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" style="width:30%">
                    熱量
                  </th>
                  <td style="width:25%">
                    {{ product.calorie }} kcal
                  </td>
                  <td style="width:30%">
                    <b>粗蛋白</b>
                  </td>
                  <td>
                    {{ product.protein }} g
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    總碳水化合物
                  </th>
                  <td>
                    {{ product.carbohydrate }} g
                  </td>
                  <td>
                    <b>膳食纖維</b>
                  </td>
                  <td>
                    {{ product.DietaryFiber }} g
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    粗脂肪
                  </th>
                  <td>
                    {{ product.crudeFat }} g
                  </td>
                  <td>
                    <b>飽和脂肪</b>
                  </td>
                  <td>
                    {{ product.SaturatedFat }} g
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    鈉
                  </th>
                  <td>
                    {{ product.sodium }} mg
                  </td>
                  <td>
                    <b>鈣</b>
                  </td>
                  <td>
                    {{ product.calcium }} mg
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    鉀
                  </th>
                  <td>
                    {{ product.potassium }} mg
                  </td>
                  <td>
                    <b>鋅</b>
                  </td>
                  <td>
                    {{ product.zinc }} mg
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    鎂
                  </th>
                  <td>
                    {{ product.magnesium }} mg
                  </td>
                  <td>
                    <b>鐵</b>
                  </td>
                  <td>
                    {{ product.iron }} mg
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="text-start fz-3">
              ✵ 依據衛生福利部食品藥物管理署所公佈<a href="https://data.gov.tw/dataset/8543" target="_blank">「食品營養成分資料集」</a>資料內容
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.heightLimit1 {
  height: 350px;
}
.heightLimit2 {
  height: 100px;
}

</style>

<script>
export default {
  data() {
    return {
      product: [],
      tempImgUrl: '',
      is_loadingItem: '',
      carts: [],
      isLoading: false,
    };
  },
  methods: {
    getProduct(id) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`,
        )
        .then((res) => {
          console.log(res.data);
          this.product = res.data.product;
          this.getTemp();
        })
        .catch((err) => {
          console.log(err.response);
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
    const { id } = this.$route.params;
    this.getProduct(id);
    this.getCart();
    this.showLoading();
  },
};
</script>
