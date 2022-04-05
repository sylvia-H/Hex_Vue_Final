<template>
  <div class="container py-18">
    <div class="row mb-6">
      <div class="col-12 col-lg-7">
        <div class="row g-0 | timeline">
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="fw-bold mt-5">確認訂單</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer-undone">
              <h6 class="fw-light mt-5">填寫訂購資訊</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer-undone">
              <h6 class="fw-light mt-5">填寫付款資訊</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer-undone">
              <h6 class="fw-light mt-5">完成訂購</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row flex-column-reverse flex-md-row">
      <!-- 訂單內容 -->
      <div class="col-12 col-lg-7">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" width="20%"></th>
              <th scope="col" class="text-center">品名</th>
              <th scope="col" width="10%" class="text-center">單價</th>
              <th scope="col" width="20%" class="text-center">數量</th>
              <th scope="col" width="8%" class="text-end">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts.carts" :key="item.id" class="align-middle">
              <td>
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.title"
                  class="img-cover w-100 h-100"
                />
              </td>
              <td>
                <p>{{ item.product.title }}</p>
              </td>
              <td>
                <p class="fw-bold me-6">NT${{ item.product.price }}</p>
              </td>
              <td>
                <div
                  class="
                    btn-group
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                  role="group"
                  aria-label="Basic"
                >
                  <button
                    @click="editCart(item.id, item.qty - 1)"
                    :disabled="item.qty - 1 === 0"
                    type="button"
                    class="btn btn-warning fw-bold d-none d-md-block"
                  >
                    －
                  </button>
                  <label :for="item.id">
                    <input
                      :id="item.id"
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
                  </label>
                  <button
                    @click="editCart(item.id, item.qty + 1)"
                    type="button"
                    class="btn btn-warning fw-bold d-none d-md-block"
                  >
                    ＋
                  </button>
                </div>
              </td>
              <td class="text-end">
                <button
                  @click="delCart(item.id, item.product.title)"
                  class="btn-close"
                  type="button"
                  aria-label="Close"
                ></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Info -->
      <div class="col-12 offset-lg-1 col-lg-4 | mb-16 mb-md-0">
        <div class="mb-10">
          <!-- subtotal -->
          <div class="bg-light p-5">
            <div class="d-flex justify-content-between">
              <p>小計</p>
              <p>NT$ {{ carts.total }} 元</p>
            </div>
          </div>
          <div class="row d-flex justify-content-end | my-8 my-md-4">
            <!-- 返回 & 下一步 -->
            <div class="col-6">
              <router-link :to="{ name : 'products' }">
                <button class="btn btn-outline-primary w-100">
                  返回
                </button>
              </router-link>
            </div>
            <div class="col-6">
              <router-link :to="{ name : 'checkoutOrder' }">
                <button
                  type="button"
                  :disabled="carts.carts?.length === 0"
                  class="btn btn-danger w-100"
                >
                  下一步
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
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
        .then((res) => {
          console.log(res.data);
          this.getCart();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    delCart(id, title) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`;

      this.$swal
        .fire({
          title: `確定要將${title}刪除嗎？`,
          text: '商品刪除後將無法恢復。',
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
              .catch(() => {
                // 刪除失敗，sweetalert 跳出提示訊息視窗
                this.$swal.fire({
                  icon: 'error',
                  title: '失敗！',
                  text: '請再試一次',
                });
              });
          }
        });
    },
    submitOrder() {
      const data = this.formData;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order`,
          { data },
        )
        .then((res) => {
          console.log(res.data);
          this.$refs.form.resetForm();
          this.$swal
            .fire('成功！', `已送出訂單！總金額 NT$ ${res.data.total} 元`, {
              icon: 'success',
            })
            .then((check) => {
              if (check) {
                this.$router.push('/');
              }
            });
        })
        .catch((err) => {
          console.log(err.response);
          // 刪除失敗，sweetalert 跳出提示訊息視窗
          this.$swal.fire('失敗！', '送出訂單失敗，請再試一次！', {
            icon: 'error',
          });
        });
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
    this.getCart();
    this.showLoading();
  },
};
</script>
