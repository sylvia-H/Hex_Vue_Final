<template>
  <div class="container my-20">
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
        <h5>訂購人資訊</h5>
        <div class="oderder-info mb-10">
          <VForm ref="form" v-slot="{ errors }">
            <div class="mt-5">
              <span class="mb-2">Email</span>
              <VField
                rules="email|required"
                class="form-control"
                v-model="formData.user.email"
                id="femail"
                name="E-mail"
                type="email"
                placeholder="example@gmail.com"
              ></VField>
              <ErrorMessage
                name="E-mail"
                class="d-block text-end invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mt-5">
              <span class="mb-2">收件人姓名</span>
              <VField
                rules="required"
                class="form-control"
                v-model="formData.user.name"
                type="text"
                id="fname"
                name="收件人姓名"
                placeholder="請輸入姓名"
              ></VField>
              <ErrorMessage
                name="收件人姓名"
                class="d-block text-end invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mt-5">
              <span class="mb-2">收件人電話</span>
              <VField
                rules="required|min:8|max:10"
                class="form-control"
                v-model="formData.user.tel"
                type="tel"
                id="fphone"
                name="收件人電話"
                placeholder="請輸入電話"
              ></VField>
              <ErrorMessage
                name="收件人電話"
                class="d-block text-end invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mt-5">
              <span class="mb-2">收件人地址</span>
              <VField
                rules="required"
                class="form-control"
                v-model="formData.user.address"
                type="text"
                id="faddress"
                name="收件人地址"
                placeholder="請輸入地址"
              ></VField>
              <ErrorMessage
                name="收件人地址"
                class="d-block text-end invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mt-5">
              <span class="mb-4">留言</span><br />
              <VField
                as="textarea"
                v-model="formData.message"
                class="form-control"
                cols="10"
                rows="5"
                type="text"
                id="fmsg"
                name="留言"
                placeholder="請輸入留言"
                value=""
              ></VField>
            </div>
            <!-- subtotal -->
            <div class="bg-light p-5 mt-5">
              <div class="d-flex jc-sb | mb-6">
                <p class="fw-500">小計</p>
                <p class="fw-light">NT$ {{ carts.total }} 元</p>
              </div>
              <div class="d-flex jc-sb | mb-6">
                <p class="fw-500">折扣</p>
                <p class="fw-light">
                  NT$ {{ carts.total - carts.final_total }} 元
                </p>
              </div>
              <div class="d-flex jc-sb">
                <p class="fs-5 fw-500">總金額</p>
                <p class="fs-5 fw-light">NT$ {{ carts.final_total }} 元</p>
              </div>
            </div>
            <div class="row d-flex justify-content-end | my-8 my-md-4">
              <!-- 返回 & 下一步 -->
              <div class="col-6">
                <router-link to="./">
                  <button class="btn btn-outline-primary w-100">
                    返回
                  </button>
                </router-link>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  @click="submitOrder"
                  :disabled="
                    Object.keys(errors).length > 0 || carts.carts?.length === 0
                  "
                  class="btn btn-danger w-100"
                >
                  送出訂單
                </button>
              </div>
            </div>
          </VForm>
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
      }, 1000);
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
