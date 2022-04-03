<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-12">
        <div class="d-flex justify-content-between mx-6 my-8">
          <h2>訂單列表</h2>
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="delOrder()"
          >
            刪除所有訂單
          </button>
        </div>
        <table class="table table-hover mt-4 text-center">
          <thead>
            <tr>
              <th>購買時間</th>
              <th>買家姓名</th>
              <th>購買商品品項</th>
              <th>應付金額</th>
              <th>是否已結帳</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orders" :key="item.id">
              <td>
                  {{ $filters.transferTime(item.create_at) }}
              </td>
              <td>
                {{ item.user.name }}
              </td>
              <td>
                <p v-for="el in Object.keys(item.products)" :key="el">
                  {{ item.products[el].product.title }} －
                  <span><b>數量：{{ item.products[el].qty }}</b></span>
                </p>
              </td>
              <td>
                {{ $filters.toCurrency(item.total) }}
              </td>
              <td>
                <span
                  v-if="item.is_paid"
                  @click="changeStatus(item.id)"
                  @keydown="enter"
                  class="btn btn-success py-2 px-2 rounded"
                >
                  已付款
                </span>
                <span
                  v-else
                  @click="changeStatus(item.id)"
                  @keydown="enter"
                  class="btn btn-dark py-2 px-2 rounded"
                >
                  未付款
                </span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <!-- 編輯產品內容 -->
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="openOrderModal(item)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <!-- 刪除品項 -->
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="delOrder(item)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          目前有 <span>{{ orders.length }}</span> 張訂單
        </p>

        <br />

        <!-- 分頁元件 -->
        <PaginationProducts
          :pagination = "pagination"
          class = "d-flex justify-content-center"
          @get-products="getProducts"
        ></PaginationProducts>

        <!-- Modal 編輯產品 -->
        <ModalOrder
          ref="editOrderModal"
          @edit-order = "editOrder"
        >
        </ModalOrder>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationProducts from '@/components/PaginationProducts.vue';
import ModalOrder from '@/components/ModalOrder.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempItemInfo: {
        products: {},
        user: {},
      },
    };
  },
  components: {
    ModalOrder,
    PaginationProducts,
  },
  methods: {
    getOrders() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders`,
        )
        .then((res) => {
          console.log(res.data);
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changeStatus(id) {
      this.orders.forEach((el) => {
        const item = el;
        if (item.id === id) {
          // item.is_enabled ? (item.is_enabled = 0) : (item.is_enabled = 1);
          if (item.is_paid) {
            item.is_paid = false;
          } else {
            item.is_paid = true;
          }
          this.editOrder(item, id);
        }
      });
    },
    editOrder(item, id) {
      if (item) {
        this.tempItemInfo = item;
      }
      const dataObj = {
        data: this.tempItemInfo,
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/order/${
        id || this.tempItemInfo.id
      }`;
      console.log(url);
      this.$http.put(url, dataObj)
        .then(() => {
          // 成功更新訂單，sweetalert 跳出提示訊息視窗
          this.$swal.fire({
            icon: 'success',
            title: '成功！',
            text: `已更新 ${this.tempItemInfo.id} 訂單資訊`,
          });
          this.getOrders(this.pagination.current_page);
        })
        .catch((err) => {
          console.log(err.response);
          const errMSG = err.response.data.message;
          let msg = '';
          errMSG.forEach((el) => {
            msg += `${el}。\n`;
          });
          // 更新失敗，sweetalert 跳出提示訊息視窗
          this.$swal.fire({
            icon: 'error',
            title: '更新失敗！請重新操作。',
            text: msg,
          });
        });
    },
    delOrder(item) {
      let url;
      let msgTitle;
      let msgText;

      if (item) {
        this.tempItemInfo = item;
        const dataID = this.tempItemInfo.id;
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/order/${dataID}`;
        msgTitle = '訂單';
        msgText = `訂單刪除後將無法恢復。訂單編號：${this.tempItemInfo.id}。買家：${this.tempItemInfo.user.name}`;
      } else {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders/all`;
        msgTitle = '所有訂單';
        msgText = '訂單刪除後將無法恢復。';
      }
      this.$swal
        .fire({
          title: `確定要刪除 ${msgTitle} 嗎？`,
          text: msgText,
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
                  text: `已刪除 ${msgTitle}`,
                });
                this.getProducts(this.pagination.current_page);
              })
              .catch(() => {
                // 刪除失敗，sweetalert 跳出提示訊息視窗
                this.$swal.fire({
                  icon: 'error',
                  title: '刪除失敗！',
                  text: '請再試一次',
                });
              });
          }
        });
    },
    organizeData(item) {
      this.tempItemInfo = {
        products: {},
        user: {},
      };
      if (item) {
        this.tempItemInfo = JSON.parse(JSON.stringify(item));
      }
    },
    openOrderModal(item) {
      // 資料接收與整理
      this.organizeData(item);
      // 開啟 modal 元件
      this.$refs.editOrderModal.openModal(item);
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
