import { createApp } from 'vue';
// Bootstrap 5
import 'bootstrap';
// iconfont
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.min.css';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
// vee-validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// 自定義 methods
import { transferTime, transferToDate, toCurrency } from './methods/filters';

// 載入 router & APP
import router from './router';
import App from './App.vue';

// vee-validate：加入全部規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// vee-validate：設定
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

// vee-validate：設定預設語系
setLocale('zh_TW');

// 初始化 AOS
AOS.init();

const app = createApp(App);
app.config.globalProperties.$filters = {
  transferTime,
  transferToDate,
  toCurrency,
};
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.component('VLoading', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
