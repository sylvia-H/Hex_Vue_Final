<template>
  <div
    class="modal fade border-0"
    id="delCartModal"
    tabindex="-1"
    aria-labelledby="delCartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span v-if="itemInfo.title">
              刪除 {{ itemInfo.title }}
            </span>
            <span v-else>
              清空購物車
            </span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body fz-5">
          <p v-if="itemInfo.title">
            是否刪除 <strong class="text-danger">{{ itemInfo.title }}</strong> ？<br />
            (刪除後將無法恢復)
          </p>
          <p v-else>
            <strong class="text-danger">確定要清空購物車嗎</strong> ？<br />
            (刪除後將無法恢復)
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"
           @click="closeModal()">
            取消
          </button>
          <button type="button" class="btn btn-danger"
           @click="delCart();">
             確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'ModalDelCart',
  data() {
    return {
      modal: '',
      itemInfo: {},
    };
  },
  inject: ['emitter'],
  methods: {
    openModal(id, title) {
      if (id && title) {
        this.itemInfo.id = id;
        this.itemInfo.title = title;
      }
      this.modal.show();
    },
    closeModal() {
      this.itemInfo = {};
      this.modal.hide();
    },
    delCart() {
      let url = '';
      if (this.itemInfo.id) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${this.itemInfo.id}`;
        this.$http
          .delete(url)
          .then(() => {
            this.emitter.emit('toast-msg', {
              style: 'success',
              content: `您已將${this.itemInfo.title}刪除了！`,
            });
            this.closeModal();
            // 給導覽列使用
            this.emitter.emit('get-cart');
            this.itemInfo = {};
          })
          .catch((err) => {
            const msg = err.response.data.message || '刪除失敗，請再試一次！';
            this.emitter.emit('toast-msg', {
              style: 'error',
              content: `${msg}`,
            });
            this.closeModal();
            this.itemInfo = {};
          });
      } else {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/carts`;
        this.$http
          .delete(url)
          .then(() => {
            this.emitter.emit('toast-msg', {
              style: 'success',
              content: '您已將購物車清空了！',
            });
            this.closeModal();
            // 給導覽列使用
            this.emitter.emit('get-cart');
            this.itemInfo = {};
          })
          .catch((err) => {
            const msg = err.response.data.message || '刪除失敗，請再試一次！';
            this.emitter.emit('toast-msg', {
              style: 'error',
              content: `${msg}`,
            });
            this.closeModal();
            this.itemInfo = {};
          });
      }
    },
  },
  mounted() {
    this.modal = new Modal(document.getElementById('delCartModal'));
  },
};
</script>
