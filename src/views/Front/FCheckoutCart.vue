<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <div class="container py-18" style="min-height: 90vh;">
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
                  @click="openDelCartModal(item.id, item.product.title)"
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
      <div class="col-12 offset-lg-1 col-lg-4">
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
                <button type="button" class="btn btn-outline-dark w-100">
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
  <ModalDelCart ref="delCartModal" />
</template>

<script>
import VueLoader from '@/components/LoadingOverlay2.vue';
import ModalDelCart from '@/components/ModalDelCart.vue';

export default {
  components: {
    VueLoader,
    ModalDelCart,
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
    openDelCartModal(id, title) {
      this.$refs.delCartModal.openModal(id, title);
    },
  },
  mounted() {
    this.getCart();
    // emitter
    this.emitter.on('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
