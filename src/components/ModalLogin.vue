<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body text-center | py-8">
          <h2 class="fw-bold text-green1 | mb-3">
            好食遞
          </h2>
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/sylviah/1649313622566.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=eaP3G7k7oveDkzEmK8P660klrEd0CkisflI1l63DLRmnAcfcAVGaWlgCN2MiN5%2Bfbrq77jpO5tLTrdk71OV6ZjKM2CqPIW6G2eeNT2OuG8V%2FW9CmrsfKdI%2BNOdKfsQPxt28oEJy2g5KQMIZA%2B81FcQCcUdUKbkUdudoPu8Bcr084Tln0OZgWU9W7uk8ZMQT8NTmmD%2BUq6HdrEpPdN8j0PttcHonogdikfeRZJJmVCXooeDC76AOOMIx2xYKxk%2BsAnzur2WIMZXIKCHf86eWUtUa3Oy2o3UOxkZYJGbayCki%2BAVZfGda5leYS8vyZmeroPrGO%2FUqnElfxpDmTaeh1hQ%3D%3D"
           alt="Healthy-Diet LOGO" class="mb-3">
          <h4 class="text-green1 | mb-4">
            HEALTHY DIET
          </h4>
          <form id="form">
            <div class="form-floating mb-4">
              <input
                v-model="userInfo.username"
                type="email"
                id="username"
                class="form-control"
                placeholder="name@example.com"
                required
              />
              <label for="username" class="text-brown1 fw-bold">Email address</label>
            </div>
            <div class="form-floating mb-4">
              <input
                v-model="userInfo.password"
                type="password"
                id="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <label for="password" class="text-brown1 fw-bold">Password</label>
            </div>
            <button
              @click="loginIn"
              class="btn btn-lg btn-green2 text-white fw-bold w-100 mt-4"
              type="button"
            >
              登 入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'ModalLogin',
  data() {
    return {
      modal: '',
      userInfo: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    loginIn() {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.userInfo)
        .then((res) => {
          const { token, expired } = res.data;
          // 用 cookie 儲存資料，myToken 是自定義名稱
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          this.closeModal();
          this.$router.push({
            name: 'dashboard_Products',
          });
        })
        .catch((err) => {
          const errTitle = err.response.data.message;
          const errMSG = err.response.data.error.message;
          this.$swal.fire({
            icon: 'error',
            title: `${errTitle}！`,
            text: errMSG,
          });
        });
    },
  },
  mounted() {
    this.modal = new Modal(document.getElementById('loginModal'));
  },
};
</script>
