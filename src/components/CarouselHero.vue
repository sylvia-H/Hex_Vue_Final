<template>
  <div class="overflow-hidden">
    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-pause="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="5"
          aria-label="Slide 6"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="6"
          aria-label="Slide 7"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="7"
          aria-label="Slide 8"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="8"
          aria-label="Slide 9"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item w-100 h-100 active" data-bs-interval="2800">
          <img
            src="../assets/img/hero01.webp"
            class="w-100 h-100 img-cover"
            alt="Hero1"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-60
              start-30
              translate-middle
            "
          >
            <h2 class="text-brown1 fw-bold fz-6 fz-md-10 | mb-12">
              打造屬於你的餐飲生活
            </h2>
            <h5 class="text-gray fz-5 fz-md-6">簡單 精緻 美好</h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero02.webp"
            class="w-100 h-100 img-cover"
            alt="Hero5"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-60
              start-50
              translate-middle
              bg-gray1
              opacity-75
              h-25
              w-100
              align-middle
            "
          >
            <h2 class="text-cream1 fw-bold fz-6 fz-md-8 fz-lg-10 | my-5">
              好食遞 您的優質餐飲管家
            </h2>
            <!-- <h2 class="text-cream1 fw-bold fz-6 fz-md-10 | mb-10"></h2> -->
            <h5 class="text-light fz-5 | mb-5">協助您安排均衡營養的餐飲生活</h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero03.webp"
            class="w-100 h-100 img-cover"
            alt="Hero9"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-60
              start-70
              translate-middle
            "
          >
            <h2 class="text-gray1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-3">
              嚴選新鮮美味食材
            </h2>
            <h2 class="text-gray1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-12">快速到府</h2>
            <h5 class="text-gray fz-5 fz-md-6">新鮮 健康 乾淨 養生</h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero04.webp"
            class="w-100 h-100 img-cover"
            alt="Hero2"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-65
              start-70
              translate-middle
            "
          >
            <h2 class="text-gray1 fw-bold fz-7 fz-md-10 | mb-8">
              食材就是美味的關鍵
            </h2>
            <h5 class="text-gray fz-5 fz-md-6">每一天 每一餐 每一口 都是享受</h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero05.webp"
            class="w-100 h-100 img-cover"
            alt="Hero3"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-65
              start-70
              translate-middle
            "
          >
            <h2 class="text-purple1 fw-bold fz-7 fz-md-10 | mb-8">
              芳香鮮醇的感官饗宴
            </h2>
            <h5 class="text-brown1 fz-5 fz-md-6">自然鮮甜 味蕾跳舞</h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero06.webp"
            class="w-100 h-100 img-cover"
            alt="Hero4"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-75
              start-50
              translate-middle
              bg-light
              opacity-75
              h-25
              w-50
              align-middle
            "
          >
            <h2
              class="text-dark fw-bold fz-6 fz-md-8 | my-4 my-md-3 d-block d-lg-none"
            >
              均衡的營養
            </h2>
            <h2
              class="text-dark fw-bold fz-6 fz-md-8 | my-4 my-md-3 d-block d-lg-none"
            >
              健康地減重
            </h2>
            <h2
              class="text-dark fw-bold fz-md-10 | my-4 d-none d-lg-block"
            >
              均衡的營養 健康地減重
            </h2>
            <h5 class="text-gray fz-5 fz-md-6 | mb-5 d-none d-lg-block">
              不再單調苦悶的減重日常 計算卡路里也很美好
            </h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero07.webp"
            class="w-100 h-100 img-cover"
            alt="Hero6"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-60
              start-50
              translate-middle
            "
          >
            <h2 class="text-cream1 fw-bold fz-8 fz-md-10 | mb-8">
              靜靜的生活 與自己約會
            </h2>
            <h5 class="text-light fz-5 | mb-2">生活匆忙</h5>
            <h5 class="text-light fz-5">一日三餐是我們與自己的小約會</h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero08.webp"
            class="w-100 h-100 img-cover"
            alt="Hero7"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-60
              start-50
              translate-middle
              bg-light
              opacity-75
              h-25
              w-100
              align-middle
              py-5
            "
          >
            <h2 class="text-brown1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-4">
              簡單 也能有萬千變化
            </h2>
            <h5 class="text-dark fz-5 fz-lg-6">
              與朋友相聚的日子 也可以吃得無負擔且美好
            </h5>
          </div>
        </div>
        <div class="carousel-item w-100 h-100" data-bs-interval="2800">
          <img
            src="../assets/img/hero09.webp"
            class="w-100 h-100 img-cover"
            alt="Hero8"
          />
          <div
            class="
              carousel-caption
              position-absolute
              top-60
              start-50
              translate-middle
              bg-light
              opacity-75
              h-25
              w-100
              align-middle
              py-5
            "
          >
            <h2 class="text-brown1 fw-bold fz-6 fz-md-8 fz-lg-10 | mb-4">
              小變化也有大驚喜
            </h2>
            <h5 class="text-dark fz-5 fz-lg-6">動動手 每一個早晨都有新的期待</h5>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselHero',
};
</script>

<style>
.carousel-inner,
.carousel .item {
  position: relative;
  overflow: hidden;
  height: 90vh;
}
.carousel-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 0;
  padding-bottom: 0;
  text-align: center;
}
</style>
