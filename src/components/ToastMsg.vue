<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-6" style="z-index: 1500">
    <div
      v-for="(msg, key) in messages"
      :key="key"
      :class="{
        'bg-cream2': msg.style === 'success',
        'bg-green2': msg.style === 'error',
        'text-dark': msg.style === 'success',
        'text-green1': msg.style === 'error',
      }"
      class="toast show align-items-center border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <img
            v-if="msg.style === 'success'"
            src="../assets/logo.png"
            style="width: 36px; height: 36px"
            alt="logo"
            class="me-2"
          />
          <span>
            <strong>{{ msg.content }}</strong>
          </span>
        </div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="clearToast(key)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastMsg',
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 4500);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    this.emitter.on('toast-msg', (msg) => {
      const { style, content } = msg;
      this.messages.push({ style, content });
      this.toastShow();
    });
  },
};
</script>
