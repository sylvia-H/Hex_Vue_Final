<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <div class="container py-20">
    <div class="row mb-6">
      <div class="col-12 col-lg-7">
        <div class="row g-0 | timeline">
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="fw-light mt-5">確認訂單</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="timeline-pointer">
              <h6 class="fw-bold mt-5">填寫訂購資訊</h6>
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
    <div class="row flex-column flex-md-row">
      <!-- 訂單內容 -->
      <div class="col-12 col-lg-7 | mb-6">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" width="20%"></th>
              <th scope="col" class="text-center">品名</th>
              <th scope="col" width="10%" class="text-center">單價</th>
              <th scope="col" width="20%" class="text-center">數量</th>
              <th scope="col" width="8%" class="text-end"></th>
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
                    d-flex
                    justify-content-center
                    align-items-center
                  ">
                  <p class="fw-bold text-black text-center">
                    {{ item.qty }}
                  </p>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Info -->
      <div class="col-12 offset-lg-1 col-lg-4">
        <div class="border border-dark p-6">
          <h5>訂購人資訊</h5>
          <div class="row my-5">
            <div class="col-4">
              <hr />
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center">
              <div class="fz-3">
                <span class="text-danger mx-1">*</span>
                為必填欄位
              </div>
            </div>
            <div class="col-4">
              <hr />
            </div>
          </div>
          <div class="mb-10">
            <VForm ref="form" v-slot="{ errors }" @submit="submitOrder">
              <div class="form-floating mb-5">
                <VField
                  rules="email|required"
                  class="form-control"
                  v-model="formData.user.email"
                  id="femail"
                  name="E-mail"
                  type="email"/>
                <label for="femail">
                  Email
                  <span class="text-danger ms-1">*</span>
                </label>
                <ErrorMessage
                  name="E-mail"
                  class="d-block text-end invalid-feedback"/>
              </div>
              <div class="form-floating mb-5">
                <VField
                  rules="required"
                  class="form-control"
                  v-model="formData.user.name"
                  type="text"
                  id="fname"
                  name="收件人姓名"/>
                <label for="fname">
                  收件人姓名
                  <span class="text-danger ms-1">*</span>
                </label>
                <ErrorMessage
                  name="收件人姓名"
                  class="d-block text-end invalid-feedback"/>
              </div>
              <div class="form-floating mb-5">
                <VField
                  rules="required|min:8|max:10"
                  class="form-control"
                  v-model="formData.user.tel"
                  type="tel"
                  id="fphone"
                  name="收件人電話"/>
                <label for="fphone">
                  收件人電話
                  <span class="text-danger ms-1">*</span>
                </label>
                <ErrorMessage
                  name="收件人電話"
                  class="d-block text-end invalid-feedback"/>
              </div>
              <div class="form-floating mb-5">
                <VField
                  rules="required"
                  class="form-control"
                  v-model="formData.user.address"
                  type="text"
                  id="faddress"
                  name="收件人地址"/>
                <label for="faddress">
                  收件人地址
                  <span class="text-danger ms-1">*</span>
                </label>
                <ErrorMessage
                  name="收件人地址"
                  class="d-block text-end invalid-feedback"/>
              </div>
              <div class="form-floating mb-5">
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
                  value=""/>
              </div>
              <!-- subtotal -->
              <div class="bg-light p-5 mb-5">
                <div class="d-flex justify-content-between | mb-6">
                  <p class="fw-500">小計</p>
                  <p class="fw-light">NT$ {{ carts.total }} 元</p>
                </div>
                <div class="d-flex justify-content-between | mb-6">
                  <p class="fw-500">折扣</p>
                  <p class="fw-light">
                    NT$ {{ carts.total - carts.final_total }} 元
                  </p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fz-5">總金額</p>
                  <p class="fz-5 fw-bold">NT$ {{ carts.final_total }} 元</p>
                </div>
              </div>
              <div class="row d-flex justify-content-end | my-8 my-md-4">
                <!-- 返回 & 下一步 -->
                <div class="col-6">
                  <RouterLink :to="{ name : 'checkoutCart' }">
                    <button type="button" class="btn btn-outline-dark w-100">
                      返回
                    </button>
                  </RouterLink>
                </div>
                <div class="col-6">
                  <button
                    type="submit"
                    :disabled="
                      Object.keys(errors).length > 0 || carts.carts?.length === 0 ||
                      !formData.user.name || !formData.user.email || !formData.user.tel ||
                      !formData.user.address
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
  </div>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay2.vue';

export default {
  components: {
    VueLoader,
  },
  data() {
    return {
      isLoading: false,
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
  inject: ['emitter'],
  methods: {
    getCart() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`,
        )
        .then((res) => {
          this.carts = res.data.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    editCart(id, qty) {
      this.isLoading = true;
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
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    submitOrder() {
      this.isLoading = true;
      const data = this.formData;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order`,
          { data },
        )
        .then((res) => {
          this.$refs.form.resetForm();
          this.isLoading = false;
          this.emitter.emit('toast-msg', {
            style: 'success',
            content: `已成功送出訂單！總金額 NT$ ${res.data.total} 元`,
          });
          // 給導覽列使用
          this.emitter.emit('get-cart');
          this.$router.push(`./payment/${res.data.orderId}`);
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('toast-msg', {
            style: 'error',
            content: '送出訂單失敗，請再試一次！',
          });
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
