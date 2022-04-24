<template>
  <!-- 首頁 banner 文字 -->
  <div class="textFrame d-flex flex-wrap">
    <div class="box box1"
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="1500"
      data-aos-offset="0">
    </div>
    <div class="box box2 position-relative"
      data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="3000"
      data-aos-offset="0">
      <div class="position-absolute top-0 start-50 translate-middle w-100 text-center">
        <h2 class="d-none d-sm-block fz-6 fz-lg-8 text-gray1">
          HEALTHY DIET
        </h2>
        <h2 class="d-sm-none fz-5 text-gray1">
          HEALTHY DIET
        </h2>
      </div>
    </div>
    <div class="box box3"
      data-aos="fade-left"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="1500"
      data-aos-offset="0">
    </div>
    <div class="box box4"
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="1500"
      data-aos-offset="0">
    </div>
    <div class="box box5 d-flex justify-content-center align-items-center"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1200"
      data-aos-delay="2600"
      data-aos-offset="0">
      <h1 class="d-none d-sm-block text-green1 fz-20 fz-lg-25 fw-normal">
        好食遞
      </h1>
      <h1 class="d-sm-none text-green1 fz-16 fw-normal">
        好<br>食<br>遞
      </h1>
    </div>
    <div class="box box6 position-relative"
      data-aos="fade-left"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="1500"
      data-aos-offset="0">
      <div class="position-absolute top-75 start-0 translate-middle w-100 text-center">
        <h3 class="d-sm-none text-gray1 fz-4 fw-light">
          協助您打造專屬餐飲生活
        </h3>
      </div>
    </div>
    <div class="box box7"
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="1500"
      data-aos-offset="0">
    </div>
    <div class="box box8 position-relative">
      <div class="position-absolute top-100 start-50 translate-middle w-100 text-center"
      data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="3000"
      data-aos-offset="0">
        <h3 class="d-none d-sm-block text-gray1 fz-6 fz-lg-7 fw-normal mb-1">
          您的優質餐飲管家
        </h3>
        <h4 class="d-sm-none text-gray2 fz-4 fw-normal">
          您的優質餐飲管家
        </h4>
        <h4 class="d-none d-sm-block text-gray2 fz-3 fz-lg-4 fw-light">
          協助您打造專屬的餐飲生活
        </h4>
      </div>
    </div>
    <div class="box box9"
      data-aos="fade-left"
      data-aos-easing="linear"
      data-aos-duration="1000"
      data-aos-delay="1500"
      data-aos-offset="0">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextFrame',
};
</script>

<style>
@media only screen and (min-width: 960px) {
  .textFrame {
    width: 400px;
    height: 225px;
  }
  .box1 {
    border-top: 3px solid #999;
    border-left: 3px solid #999;
    width: 12.5%;
    height: 16.7%;
  }
  .box2 {
    width: 62.5%;
    height: 16.7%;
  }
  .box3 {
    position: relative;
    border-top: 3px solid #999;
    border-right: 3px solid #999;
    width: 25%;
    height: 16.7%;
  }
  .box3:after {
    position: absolute;
    top: -1.25rem;
    right: -1.25rem;
    content: '';
    /* border-top: 3px solid #ccc;
    border-right: 3px solid #ccc; */
    border: 3px solid #ccc;
    width: 50%;
    height: 100%;
  }
  .box4 {
    border-left: 3px solid #999;
    width: 12.5%;
    height: 66.6%;
  }
  .box5 {
    width: 75%;
    height: 66.6%;
  }
  .box6 {
    border-right: 3px solid #999;
    width: 12.5%;
    height: 66.6%;
  }
  .box7 {
    position: relative;
    border-bottom: 3px solid #999;
    border-left: 3px solid #999;
    width: 25%;
    height: 16.7%;
  }
  .box7:after {
    position: absolute;
    bottom: -1.25rem;
    left: -1.25rem;
    content: '';
    /* border-bottom: 3px solid #ccc;
    border-left: 3px solid #ccc; */
    border: 3px solid #ccc;
    width: 50%;
    height: 100%;
  }
  .box8 {
    width: 68.75%;
    height: 16.7%;
  }
  .box9 {
    border-bottom: 3px solid #999;
    border-right: 3px solid #999;
    width: 6.25%;
    height: 16.7%;
  }
}

@media only screen and (max-width: 960px) and (min-width: 576px) {
  .textFrame {
    width: 320px;
    height: 180px;
  }
  .box1 {
    border-top: 3px solid #999;
    border-left: 3px solid #999;
    width: 12.5%;
    height: 16.7%;
  }
  .box2 {
    width: 62.5%;
    height: 16.7%;
  }
  .box3 {
    position: relative;
    border-top: 3px solid #999;
    border-right: 3px solid #999;
    width: 25%;
    height: 16.7%;
  }
  .box3:after {
    position: absolute;
    top: -1rem;
    right: -1rem;
    content: '';
    border-top: 3px solid #ccc;
    border-right: 3px solid #ccc;
    width: 50%;
    height: 100%;
  }
  .box4 {
    border-left: 3px solid #999;
    width: 12.5%;
    height: 66.6%;
  }
  .box5 {
    width: 75%;
    height: 66.6%;
  }
  .box6 {
    border-right: 3px solid #999;
    width: 12.5%;
    height: 66.6%;
  }
  .box7 {
    position: relative;
    border-bottom: 3px solid #999;
    border-left: 3px solid #999;
    width: 25%;
    height: 16.7%;
  }
  .box7:after {
    position: absolute;
    bottom: -1rem;
    left: -1rem;
    content: '';
    border-bottom: 3px solid #ccc;
    border-left: 3px solid #ccc;
    width: 50%;
    height: 100%;
  }
  .box8 {
    width: 68.75%;
    height: 16.7%;
  }
  .box9 {
    border-bottom: 3px solid #999;
    border-right: 3px solid #999;
    width: 6.25%;
    height: 16.7%;
  }
}

@media only screen and (max-width: 575px) {
  .textFrame {
    width: 225px;
    height: 360px;
  }
  .box1 {
    border-top: 3px solid #999;
    border-left: 3px solid #999;
    width: 12.5%;
    height: 16.7%;
  }
  .box2 {
    width: 62.5%;
    height: 16.7%;
  }
  .box3 {
    position: relative;
    border-top: 3px solid #999;
    border-right: 3px solid #999;
    width: 25%;
    height: 16.7%;
  }
  .box3:after {
    position: absolute;
    top: -1rem;
    right: -1rem;
    content: '';
    border-top: 3px solid #ccc;
    border-right: 3px solid #ccc;
    width: 50%;
    height: 100%;
  }
  .box4 {
    border-left: 3px solid #999;
    width: 12.5%;
    height: 66.6%;
  }
  .box5 {
    width: 75%;
    height: 66.6%;
  }
  .box6 {
    border-right: 3px solid #999;
    width: 12.5%;
    height: 66.6%;
  }
  .box6 .position-absolute{
    background-color: rgba(255,255,255,0.1);
  }
  .box7 {
    position: relative;
    border-bottom: 3px solid #999;
    border-left: 3px solid #999;
    width: 25%;
    height: 16.7%;
  }
  .box7:after {
    position: absolute;
    bottom: -1rem;
    left: -1rem;
    content: '';
    border-bottom: 3px solid #ccc;
    border-left: 3px solid #ccc;
    width: 50%;
    height: 100%;
  }
  .box8 {
    width: 68.75%;
    height: 16.7%;
  }
  .box9 {
    border-bottom: 3px solid #999;
    border-right: 3px solid #999;
    width: 6.25%;
    height: 16.7%;
  }
}
</style>
