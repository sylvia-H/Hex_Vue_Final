<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <div class="container">
    <div class="row py-3">
      <div class="col-12">
        <div class="d-flex justify-content-between mx-6 my-8">
          <h2>優惠券列表</h2>
          <button type="button" class="btn btn-outline-dark" @click="openCouponModal(1, {})">
            新增優惠券
          </button>
        </div>
        <table class="table table-hover mt-4 text-center">
          <thead>
            <tr>
              <th>優惠券主題</th>
              <th>優惠碼</th>
              <th>折扣百分比</th>
              <th>優惠到期日</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coupons" :key="item.code">
              <td>
                {{ item.title }}
              </td>
              <td>
                {{ item.code }}
              </td>
              <td>{{ item.percent }} %</td>
              <td>
                {{ $filters.transferTime(item.due_date) }}
              </td>
              <td>
                <span
                  v-if="item.is_enabled"
                  @click="changeStatus(item.id)"
                  @keydown="enter"
                  class="btn btn-success py-2 px-2 rounded"
                >
                  啟用
                </span>
                <span
                  v-else
                  @click="changeStatus(item.id)"
                  @keydown="enter"
                  class="btn btn-dark py-2 px-2 rounded"
                >
                  未啟用
                </span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <!-- 編輯優惠券內容 -->
                  <button type="button" class="btn btn-warning" @click="openCouponModal(0, item)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <!-- 刪除優惠券 -->
                  <button type="button" class="btn btn-danger" @click="delCoupon(item)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          目前有 <span>{{ coupons.length }}</span> 種優惠券
        </p>

        <br />

        <!-- 分頁元件 -->
        <PaginationCoupons
          :pagination="pagination"
          class="d-flex justify-content-center"
          @get-coupons="getCoupons"
        ></PaginationCoupons>

        <!-- Modal 編輯產品 -->
        <ModalCoupon
          :coupon="tempItemInfo"
          :is_addNewCoupon="is_addNewCoupon"
          ref="editCouponModal"
          @edit-coupon="editCoupon"
        >
        </ModalCoupon>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationCoupons from '@/components/PaginationCoupons.vue';
import ModalCoupon from '@/components/ModalCoupon.vue';
import VueLoader from '@/components/LoadingOverlay.vue';

export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      pagination: {},
      tempItemInfo: {},
      // 是否新增優惠券，預設狀態:'0-否'
      is_addNewCoupon: 0,
    };
  },
  components: {
    ModalCoupon,
    PaginationCoupons,
    VueLoader,
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=${page}`)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    changeStatus(id) {
      this.coupons.forEach((el) => {
        const item = el;
        if (item.id === id) {
          if (item.is_enabled) {
            item.is_enabled = 0;
          } else {
            item.is_enabled = 1;
          }
          this.is_addNewCoupon = 0;
          this.editCoupon(item, id);
        }
      });
    },
    editCoupon(item, id) {
      this.isLoading = true;
      if (item) {
        this.tempItemInfo = item;
      }
      const dataObj = {
        data: this.tempItemInfo,
      };
      let httpStatus = '';
      let url = '';

      if (this.is_addNewCoupon) {
        httpStatus = 'post';
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
      } else {
        httpStatus = 'put';
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${
          this.tempItemInfo.id || id
        }`;
      }
      this.$http[httpStatus](url, dataObj)
        .then(() => {
          this.isLoading = false;
          this.getCoupons(this.pagination.current_page);
          if (httpStatus === 'post') {
            this.$swal.fire({
              icon: 'success',
              title: '成功！',
              text: `成功新增 ${this.tempItemInfo.title}`,
            });
          } else {
            this.$swal.fire({
              icon: 'success',
              title: '成功！',
              text: `已更新 ${this.tempItemInfo.title} 的資訊`,
            });
          }
        })
        .catch((err) => {
          this.isLoading = false;
          const errMSG = err.response.data.message;
          let msg = '';
          errMSG.forEach((el) => {
            msg += `${el}。\n`;
          });
          this.$swal.fire({
            icon: 'error',
            title: '失敗！請重新輸入資訊。',
            text: msg,
          });
        });
    },
    delCoupon(item) {
      let url;
      let msgTitle;
      let msgText;

      if (item) {
        this.tempItemInfo = item;
        const dataID = this.tempItemInfo.id;
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${dataID}`;
        msgTitle = '優惠券';
        msgText = `優惠券刪除後將無法恢復。優惠券編號：${this.tempItemInfo.id}。`;
      } else {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
        msgTitle = '所有優惠券';
        msgText = '優惠券刪除後將無法恢復。';
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
            this.isLoading = true;
            this.$http
              .delete(url)
              .then(() => {
                this.isLoading = false;
                this.getCoupons(this.pagination.current_page);
                this.$swal.fire({
                  icon: 'success',
                  title: '成功！',
                  text: `已刪除 ${msgTitle}`,
                });
              })
              .catch(() => {
                this.$swal.fire({
                  icon: 'error',
                  title: '刪除失敗！',
                  text: '請再試一次',
                });
              });
          }
        });
    },
    openCouponModal(isNew, item) {
      this.is_addNewCoupon = isNew;
      this.tempItemInfo = item;
      this.$refs.editCouponModal.openModal(item);
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
