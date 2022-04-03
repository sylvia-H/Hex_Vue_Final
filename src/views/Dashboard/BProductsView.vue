<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-10 offset-1">
        <div class="d-flex justify-content-between mx-6 my-8">
          <h2>產品列表</h2>
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="openEditModal(1, null);"
          >
            建立新的產品
          </button>
        </div>
        <table class="table table-hover mt-4 text-center">
          <thead>
            <tr>
              <th>分類</th>
              <th>產品名稱</th>
              <th>原售價（元）</th>
              <th>優惠價（元）</th>
              <th>是否上架</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>
                <p class="badge bg-primary">
                  {{ item.category }}
                </p>
              </td>
              <td>
                {{ item.title }}
              </td>
              <td>
                {{ item.origin_price }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                <span
                  v-if="item.is_enabled"
                  @click="changeStatus(item.id)"
                  @keydown="enter"
                  class="btn btn-success py-2 px-2 rounded"
                >
                  上架
                </span>
                <span
                  v-else
                  @click="changeStatus(item.id)"
                  @keydown="enter"
                  class="btn btn-dark py-2 px-2 rounded"
                >
                  未上架
                </span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <!-- 編輯產品內容 -->
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="openEditModal(0, item)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <!-- 刪除品項 -->
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="delProduct(item)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          目前有 <span>{{ products.length }}</span> 項產品
        </p>

        <br />

        <!-- 分頁元件 -->
        <PaginationProducts
          :pagination = "pagination"
          class = "d-flex justify-content-center"
          @get-products="getProducts"
        ></PaginationProducts>
      </div>

      <!-- Modal 編輯產品 -->
      <ModalEdit
        ref="editProductModal"
        @edit-product = "editProduct"
      >
      </ModalEdit>

      <!-- Modal 刪除產品 -->
      <!-- <ModalDelete
        ref="delProductModal"
        :AUTH_TOKEN = "AUTH_TOKEN"
        @del-product = "delProduct">
      </ModalDelete> -->
    </div>
  </div>
</template>

<script>
import PaginationProducts from '@/components/PaginationProducts.vue';
import ModalEdit from '@/components/ModalEditProduct.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempItemInfo: {
        imagesUrl: [],
      },
      // 是否新增新產品，預設狀態:'0-否'
      is_addNewProduct: 0,
    };
  },
  components: {
    ModalEdit,
    PaginationProducts,
  },
  methods: {
    getProducts(page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${page}`,
        )
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changeStatus(id) {
      this.products.forEach((el) => {
        const item = el;
        if (item.id === id) {
          // item.is_enabled ? (item.is_enabled = 0) : (item.is_enabled = 1);
          if (item.is_enabled) {
            item.is_enabled = 0;
          } else {
            item.is_enabled = 1;
          }
          this.is_addNewProduct = 0;
          this.editProduct(item, id);
        }
      });
    },
    editProduct(item, id) {
      if (item) {
        this.tempItemInfo = item;
      }
      const dataObj = {
        data: this.tempItemInfo,
      };
      let httpStatus = '';
      let url = '';

      if (this.is_addNewProduct) {
        httpStatus = 'post';
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product`;
      } else {
        httpStatus = 'put';
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product/${
          this.tempItemInfo.id || id
        }`;
      }
      this.$http[httpStatus](url, dataObj)
        .then(() => {
          if (httpStatus === 'post') {
            // 成功新增產品，sweetalert 跳出提示訊息視窗
            this.$swal.fire({
              icon: 'success',
              title: '成功！',
              text: `成功新增 ${this.tempItemInfo.title}`,
            });
          } else {
            // 成功更新產品，sweetalert 跳出提示訊息視窗
            this.$swal.fire({
              icon: 'success',
              title: '成功！',
              text: `已更新 ${this.tempItemInfo.title} 的資訊`,
            });
          }
          this.getProducts(this.pagination.current_page);
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
            title: '失敗！請重新輸入資訊。',
            text: msg,
          });
        });

      // 清空上傳圖片區
      this.uploadImgFile = {
        imageUrl: '',
        message: '',
      };
    },
    delProduct(item) {
      if (item) {
        this.tempItemInfo = item;
      }
      const dataID = this.tempItemInfo.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product/${dataID}`;
      this.$swal
        .fire({
          title: `確定要刪除 ${this.tempItemInfo.title} 嗎？`,
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
                  text: `已刪除 ${this.tempItemInfo.title} 的資訊`,
                });
                this.getProducts(this.pagination.current_page);
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
    organizeData(isAddItem, item) {
      this.is_addNewProduct = isAddItem;
      this.tempItemInfo = {
        imagesUrl: [],
      };
      if (item) {
        this.tempItemInfo = JSON.parse(JSON.stringify(item));
        if (!item.imagesUrl) {
          this.tempItemInfo.imagesUrl = [];
        }
      }
    },
    openEditModal(isAddItem, item) {
      // 資料接收與整理
      this.organizeData(isAddItem, item);
      // 開啟 modal 元件
      this.$refs.editProductModal.openModal(isAddItem, item);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
