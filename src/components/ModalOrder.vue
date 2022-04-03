<template>
  <div
    id="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="bg-secondary text-light rounded p-4 mb-4">
                <h4 class="mb-3">買家資料</h4>
                <div class="mb-3 col-12">
                  <label for="userName" class="form-label w-100">
                    客戶姓名
                    <input
                      id="userName"
                      type="text"
                      class="form-control"
                      v-model="tempItem.user.name"
                    />
                  </label>
                </div>
                <div class="mb-3 col-12">
                  <label for="userEmail" class="form-label w-100">
                    Email
                    <input
                      id="userEmail"
                      type="text"
                      class="form-control"
                      v-model="tempItem.user.email"
                    />
                  </label>
                </div>
                <div class="mb-3 col-12">
                  <label for="userTel" class="form-label w-100">
                    電話
                    <input
                      id="userTel"
                      type="text"
                      class="form-control"
                      v-model="tempItem.user.tel"
                    />
                  </label>
                </div>
                <div class="mb-3 col-12">
                  <label for="userAddress" class="form-label w-100">
                    地址
                    <input
                      id="userAddress"
                      type="text"
                      class="form-control"
                      v-model="tempItem.user.address"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div class="row p-4">
                <h4 class="mb-3">訂單細節</h4>
                <div class="mb-3 col-12">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <th style="width: 100px">訂單編號</th>
                        <td>{{ tempItem.id }}</td>
                      </tr>
                      <tr>
                        <th>下單時間</th>
                        <td>{{ $filters.transferTime(tempItem.create_at) }}</td>
                      </tr>
                      <tr>
                        <th>付款狀態</th>
                        <td>
                          <label class="form-check-label" for="checkPaid">
                            <input id="checkPaid" type="checkbox"
                              class="form-check-input me-2"
                              v-model="tempItem.is_paid"
                            />
                            <span v-if="tempItem.is_paid" class="text-success">
                              <b>已付款</b>
                            </span>
                            <span v-else class="text-danger">未付款</span>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <th>總金額</th>
                        <td>
                          {{ $filters.toCurrency(tempItem.total) }} 元
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row p-4">
                <div class="mb-3 col-12">
                  <h4 class="mb-3">訂單品項細節</h4>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">品名</th>
                        <th scope="col">下單數量</th>
                        <th scope="col">單品項總金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tempItem.products" :key="item.id">
                        <th>
                          {{ item.product.title }}
                        </th>
                        <td width="30%">
                          <label for="productNum" class="form-label d-flex">
                            <input
                              id="productNum"
                              type="number"
                              class="form-control"
                              v-model="item.qty"
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          {{ $filters.toCurrency(item.final_total) }} 元
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="closeModal();$emit('editOrder', tempItem);"
          >
            更新訂單資訊
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'ModalOrder',
  data() {
    return {
      modal: '',
      tempItem: {
        products: {},
        user: {},
      },
    };
  },
  methods: {
    openModal(item) {
      this.organizeData(item);
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    organizeData(item) {
      this.tempItem = {
        products: {},
        user: {},
      };
      if (item) {
        this.tempItem = JSON.parse(JSON.stringify(item));
      }
    },
  },
  mounted() {
    // 建立 modal 實體
    this.modal = new Modal(document.getElementById('orderModal'));
  },
};
</script>
