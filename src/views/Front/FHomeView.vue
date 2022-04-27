<template>
  <VLoading :active="isLoading" :z-index="1000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 首頁 Hero -->
  <section
    class="hero position-relative overflow-hidden"
    data-aos="fade-zoom-in"
    data-aos-easing="linear"
    data-aos-duration="1000"
    data-aos-delay="200"
    data-aos-offset="0"
  >
    <div class="d-none d-xl-block position-absolute top-50 start-25 translate-middle">
      <TextFrame />
    </div>
    <div class="d-none d-lg-block d-xl-none position-absolute top-50 start-30 translate-middle">
      <TextFrame />
    </div>
    <div
      class="d-none d-md-block d-lg-none position-absolute top-50 start-40 translate-middle w-50"
    >
      <TextFrame />
    </div>
    <div
      class="d-none d-sm-block d-md-none position-absolute top-50 start-35 translate-middle w-50"
    >
      <TextFrame />
    </div>
    <div class="d-block d-sm-none position-absolute top-40 start-50 translate-middle w-50">
      <TextFrame />
    </div>
    <!-- ScroolDown -->
    <div
      class="position-absolute top-90 start-50 translate-middle"
      @click="scrollDown()"
      @keydown="enter"
    >
      <span id="scrollDownArrow" class="btn material-icons fz-20 text-gray2 opacity-50">
        expand_more
      </span>
    </div>
  </section>
  <!-- NavBar -->
  <FrontNavbar />
  <!-- 主要內容 - 好食遞介紹 -->
  <section class="container-fluid bg-light1">
    <div class="row py-10">
      <div class="col-10 offset-1 col-md-8 offset-md-2 text-center | mb-10">
        <h1 class="text-green1">好食遞</h1>
        <hr />
        <h4 class="text-green2">您的優質餐飲管家</h4>
      </div>
      <div
        class="col-10 offset-1 col-md-8 offset-md-2 text-center | mb-10"
        data-aos="zoom-in"
        data-aos-easing="linear"
        data-aos-duration="800"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <p class="text-gray mb-4">繁忙的職場生活以及家事育兒日常，讓您忘了疼愛自己嗎？</p>
        <p class="text-gray mb-4 d-none d-md-block">
          想減重減脂，試過各種斷食法、努力揮汗運動，卻還是無法讓成功瘦身嗎？
        </p>
        <p class="text-gray d-none d-md-block">
          減少食量卻忽略營養素攝取，感到精神與體力變得比以前差了嗎？
        </p>
        <p class="text-gray mb-4 d-block d-md-none">
          想減重減脂，試過各種斷食法，卻仍無法讓成功瘦身嗎？
        </p>
        <p class="text-gray d-block d-md-none">
          減少食量卻忽略營養素攝取，感到精神與體力變差了嗎？
        </p>
      </div>
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center">
        <p class="fz-5 text-dark fw-medium mb-4">吃進優質食材，讓味蕾享受食物的美味</p>
        <p class="fz-5 text-dark fw-medium mb-4">維持優雅體態，減重不復胖</p>
        <div class="fz-5 text-dark fw-medium d-flex align-items-center justify-content-center">
          <h2 class="fz-6 fz-lg-8 text-brown1 me-3">好食遞</h2>
          <p class="d-none d-md-block">是值得您信任的優質餐飲管家，為食材與您的健康嚴格把關</p>
          <p class="d-block d-md-none">為食材與您的健康嚴格把關</p>
        </div>
      </div>
    </div>
  </section>
  <!-- 主要內容 - 圖文 -->
  <section class="container-fluid bg-light overflow-hidden">
    <!-- 圖文 1 -->
    <div class="row py-10">
      <div
        class="col-10 offset-1 col-md-5 offset-md-1 heightLimit_banner | mb-12 mb-md-0"
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="600"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <img src="../../assets/img/hero10.webp" class="img-cover" alt="Hero1" />
      </div>
      <div class="col-10 offset-1 col-md-5 offset-md-0 text-center
       d-flex align-items-center justify-content-center">
        <div
          data-aos="fade-left"
          data-aos-easing="linear"
          data-aos-duration="600"
          data-aos-delay="100"
          data-aos-offset="0"
        >
          <h2 class="text-gray1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-3">嚴選新鮮食材</h2>
          <h2 class="text-gray1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-8 mb-lg-10">快速到府</h2>
          <h5 class="text-gray fz-4 fz-md-6">新鮮 健康 乾淨 養生</h5>
        </div>
      </div>
    </div>
    <!-- 圖文 2 -->
    <div class="row py-10 flex-column-reverse flex-md-row">
      <div class="col-10 offset-1 col-md-5 offset-md-1 text-center
       d-flex align-items-center justify-content-center">
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="600"
          data-aos-delay="100"
          data-aos-offset="0"
        >
          <h2 class="text-brown1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-8 mb-lg-10">
            均衡的營養 健康地減重
          </h2>
          <h5 class="text-gray fz-4 fz-md-6 | mb-4">不再單調苦悶的減重日常</h5>
          <h5 class="text-gray fz-4 fz-md-6">計算卡路里也很美好</h5>
        </div>
      </div>
      <div
        class="col-10 offset-1 col-md-5 offset-md-0 heightLimit_banner | mb-12 mb-md-0"
        data-aos="fade-left"
        data-aos-easing="linear"
        data-aos-duration="600"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <img src="../../assets/img/hero08.webp" class="img-cover" alt="Hero2" />
      </div>
    </div>
    <!-- 圖文 3 -->
    <div class="row py-10">
      <div
        class="col-10 offset-1 col-md-5 offset-md-1 heightLimit_banner | mb-12 mb-md-0"
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="600"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <img src="../../assets/img/hero09.webp" class="img-cover" alt="Hero3" />
      </div>
      <div class="col-10 offset-1 col-md-5 offset-md-0 text-center
       d-flex align-items-center justify-content-center | mb-12 mb-md-0">
        <div
          data-aos="fade-left"
          data-aos-easing="linear"
          data-aos-duration="600"
          data-aos-delay="100"
          data-aos-offset="0"
        >
          <h2 class="text-brown1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-8 mb-lg-10">
            小變化也有大驚喜
          </h2>
          <h5 class="text-dark fz-5 fz-lg-6">動動手 每一個早晨都有新的期待</h5>
        </div>
      </div>
    </div>
  </section>
  <section class="subscribe">
    <!-- subscribe 訂閱 -->
    <div class="bg-cover heightLimit_banner">
      <div class="container h-100 d-flex align-items-center" data-aos="fade-up">
        <div class="row w-100">
          <div class="col-12 col-lg-5">
            <h4 class="text-white fw-bold mb-3">
              想收到最新消息嗎？
            </h4>
            <h4 class="text-white fw-bold mb-3">
              快訂閱我們！
            </h4>
            <div class="input-group">
              <label for="subscribeEmail"></label>
              <input
                id="subscribeEmail"
                type="email"
                class="form-control"
                placeholder="請輸入您的電子信箱"
                aria-label="Subscriber's email address"
              />
              <button class="btn btn-primary" type="button">訂閱</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';
import VueLoader from '@/components/LoadingOverlay2.vue';
import TextFrame from '@/components/FrontTextFrame.vue';

export default {
  components: {
    VueLoader,
    TextFrame,
    FrontNavbar,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    scrollDown() {
      window.scrollBy({
        top: window.innerHeight - window.pageYOffset,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    document.addEventListener('scroll', () => {
      if (window.pageYOffset > window.innerHeight) {
        this.emitter.emit('nav-fix');
      } else {
        this.emitter.emit('nav-unfix');
      }
    });
  },
};
</script>

<style>
.heightLimit_banner {
  height: 400px;
}
.hero {
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/img/hero01.webp');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
/* Hero 頁尾 scrollDownArrow 動畫 */
#scrollDownArrow {
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
section.subscribe{
  background-image: url('../../assets/img/hero02.webp');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
