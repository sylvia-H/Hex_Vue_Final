<template>
  <!-- 關於健康減重資訊 -->
  <section class="container | my-20">
    <h2 class="text-center">食前好思</h2>
    <hr class="my-6" />
    <div class="row">
      <h4 class="mb-5">
        TDEE是什麼？BMR又是什麼？為什麼需要計算這些數值呢？
      </h4>

      <p class="mb-5">
        不管是要增肌、減脂或是維持目前的體重，透過 BMR 跟 TDEE 就可以了解你一天需要的熱量為多少，對於進一步調整飲食和規劃菜單都有很大的幫助喔！
      </p>

      <ul class="list-style1">
        <li class="mb-5">
          <p>
            <strong>基礎代謝 BMR（Basal Metabolic Rate)： </strong><br>
            完全沒有任何活動，平躺在床上一天，身體僅僅維持呼吸、新陳代謝等基本生存活動所需的最低熱量就是 BMR。
          </p>
        </li>
        <li>
          <p>
            <strong>身體每日消耗熱量 TDEE（Total Daily Energy Expenditure）： </strong><br>
            依據不同的活動量，每日的總消耗熱量就會不同，因此，BMR加上活動量，就可以理解為 TDEE。
          </p>
        </li>
      </ul>
    </div>
    <div class="row">
      <ul>
        <li>
          無活動：久坐，TDEE = 1.2x BMR
        </li>
        <li>
          輕量活動：每周運動1-3天(輕鬆)，TDEE = 1.375 x BMR
        </li>
        <li>
          中度活動量：站走稍多、每周運動3-5天（中強度），TDEE = 1.55 x BMR。
        </li>
        <li>
          高度活動量：站走為主、每周運動6-7天（高強度），TDEE = 1.725 x BMR
        </li>
        <li>
          非常高度活動量：無時無刻都在運動，幾乎整天都做高強度的運動，像是建築工人等勞力型的工作，TDEE = 1.9 x BMR
        </li>
      </ul>
    </div>
    <div class="row">
      <p>
        不低於 BMR 的每日熱量攝取分配：
      </p>
    </div>
  </section>
</template>

<style>
ul.list-style1{
    list-style-type: disc;
}
ul.list-style2{
    list-style-type: square;
}
</style>

<script>
export default {};
</script>
