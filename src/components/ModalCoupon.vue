<template>
  <div
    id="couponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>新增優惠券</span>
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
            <div class="col-12">
              <div class="row">
                <div class="col-10 offset-1">
                  <div class="bg-secondary text-light text-center rounded p-4 mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h5 class="mb-3 me-3">優惠券代碼亂數產生器</h5>
                      <button type="button" class="btn btn-dark mb-3" @click="genRandom">
                        產生亂數代碼
                      </button>
                    </div>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="textRandom"
                        v-model="textRandom"
                        aria-label="亂數代碼回傳結果"
                        placeholder="亂數代碼回傳結果"
                      />
                      <button
                        type="button"
                        class="input-group-text"
                        id="btn_copyLink"
                        @click="copyText()"
                        data-clipboard-target="#textRandom"
                      >
                        <!-- 複製位址 -->
                        <span class="material-icons"> content_copy </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <label for="title" class="form-label w-100 mb-4">
                    優惠券主題名稱
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入優惠券名稱"
                      v-model="tempItem.title"
                      required
                    />
                  </label>
                  <label for="code" class="form-label w-100 mb-4">
                    優惠券代碼
                    <input
                      id="code"
                      type="text"
                      class="form-control"
                      placeholder="請輸入優惠券代碼"
                      v-model="tempItem.code"
                      required
                    />
                  </label>
                  <label for="percent" class="form-label w-100 mb-4">
                    優惠折扣百分比
                    <input
                      id="percent"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="請輸入 0 ~ 100 %"
                      v-model="tempItem.percent"
                      required
                    />
                  </label>
                  <label for="due_date" class="form-label w-100 mb-4">
                    優惠到期日
                    <input
                      id="due_date"
                      type="datetime-local"
                      class="form-control"
                      v-model="tempDate"
                      required
                    />
                  </label>
                  <label for="check_enabled" class="form-check-label w-100 mb-4">
                    <input id="check_enabled" type="checkbox"
                      class="form-check-input me-2"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempItem.is_enabled"
                    />
                    <span v-if="tempItem.is_enabled" class="text-success">
                      <b>已啟用</b>
                    </span>
                    <span v-else class="text-danger">未啟用</span>
                  </label>
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
            v-if="is_addNewCoupon"
            type="button"
            class="btn btn-primary"
            @click="closeModal();$emit('editCoupon', tempItem);"
          >
            新增優惠券
          </button>
          <button
            v-else
            type="button"
            class="btn btn-success"
            @click="closeModal();$emit('editCoupon', tempItem);"
          >
            修改優惠券內容
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Clipboard from 'clipboard';

export default {
  name: 'ModalCoupon',
  props: ['coupon', 'is_addNewCoupon'],
  watch: {
    coupon() {
      this.tempItem = JSON.parse(JSON.stringify(this.coupon));
      if (!this.tempItem.is_enabled) {
        this.tempItem.is_enabled = 0;
      }
      this.tempDate = this.$filters.transferToDate(this.tempItem.due_date);
    },
    tempDate() {
      // 將時間格式轉回數字格式
      this.tempItem.due_date = +new Date(this.tempDate) / 1000;
    },
  },
  data() {
    return {
      modal: '',
      tempItem: {
        is_enabled: 0,
      },
      tempDate: '',
      textRandom: '',
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    genRandom() {
      const number = '0123456789';
      const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const symbol = '#$*_';
      const str = (number + letters + symbol).split('');
      let result = '';
      for (let i = 0; i < 10; i += 1) {
        result += str[Math.floor(Math.random() * str.length)];
      }
      this.textRandom = result;
    },
    copyText() {
      const clipboard = new Clipboard('#btn_copyLink');

      clipboard.on('success', (e) => {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        // 取消選取
        e.clearSelection();
      });

      clipboard.on('error', (e) => {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    },
    organizeData() {
      this.tempItem = this.coupon;
      if (!this.tempItem.is_enabled) {
        this.tempItem.is_enabled = 0;
      }
      if (this.tempItem.due_date) {
        this.tempDate = this.$filters.transferToDate(this.tempItem.due_date);
      }
    },
  },
  mounted() {
    // 建立 modal 實體
    this.modal = new Modal(document.getElementById('couponModal'));
    // this.organizeData();
  },
};
</script>
