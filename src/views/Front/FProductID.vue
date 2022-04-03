<template>
  <!-- 產品列表 -->
  <section class="container | my-20">
    <div class="row">
      <div class="col-12 col-md-6">
        <h2 class="text-center">
          {{ product.title }}
        </h2>
        <div class="border overflow-hidden rounded-3 shadow | m-8">
          <img class="w-100 h-100 img-cover" :src="product.imageUrl" alt="product.title">
        </div>
      </div>
      <div class="col-12 col-md-6 | pt-15">
        <div class="row | mb-5">
          <p>
            {{ product.description || '' }}
          </p>
        </div>
        <div class="row | mb-5">
          <p>
            {{ product.content || '' }}
          </p>
        </div>
        <div class="row">
          <div class="col-8 offset-2">
            <table class="table table-hover table-borderless text-center">
              <!-- <thead>
                <tr>
                  <th colspan="2">
                    {{ product.title }} 產品細節
                  </th>
                </tr>
              </thead> -->
              <tbody>
                <tr>
                  <th scope="row">產品內含份量</th>
                  <td>
                    {{ product.number }}
                    {{ product.unit }}
                  </td>
                </tr>
                <tr>
                  <th scope="row">原價</th>
                  <td>
                    {{ $filters.toCurrency(product.origin_price) }} 元
                  </td>
                </tr>
                <tr>
                  <th scope="row">優惠價</th>
                  <td>
                    {{ $filters.toCurrency(product.price) }} 元
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.isFixed{
  position: fixed;
  top: 0;
}
</style>

<script>
export default {
  data() {
    return {
      product: [],
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
    const { id } = this.$route.params;
    this.getProduct(id);
    this.getCart();
    this.showLoading();
  },
};
</script>
