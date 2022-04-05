/* eslint-disable vuejs-accessibility/label-has-for */
<template>
  <!-- 關於健康減重資訊 -->
  <section class="container | py-20">
    <h2 class="text-center">食前好思</h2>
    <hr class="my-8" />
    <div class="row mb-10">
      <div class="col-10 offset-1">
        <h4 class="text-green1 fw-bold mb-5">
          TDEE是什麼？BMR又是什麼？為什麼需要計算這些數值呢？
        </h4>

        <p class="mb-5">
          不管是要增肌、減脂或是維持目前的體重，透過 BMR 跟 TDEE
          就可以了解你一天需要的熱量為多少，對於進一步調整飲食和規劃菜單都有很大的幫助喔！
        </p>

        <ul class="list-style1 text-gray1 ps-10">
          <li class="mb-5">
            <p>
              <strong>基礎代謝 BMR（Basal Metabolic Rate)： </strong><br />
              完全沒有任何活動，平躺在床上一天，身體僅僅維持呼吸、新陳代謝等基本生存活動所需的最低熱量就是
              BMR。
            </p>
          </li>
          <li>
            <p>
              <strong
                >身體每日消耗熱量 TDEE（Total Daily Energy Expenditure）： </strong
              ><br />
              依據不同的活動量，每日的總消耗熱量就會不同，因此，BMR加上活動量，就可以理解為
              TDEE。
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mb-10">
      <div class="col-10 offset-1">
        <h4 class="text-green1 fw-bold mb-5">如何計算 BMR？</h4>

        <ul class="rounded bg-green3 text-gray1 mx-0 px-4 mx-lg-20 px-lg-10 py-4">
          <li class="mb-4">
            <b>BMR(男)</b> = 9.99 × 體重(公斤) + 6.25 × 身高(公分) - 4.92 × 年齡 + 166 - 161
          </li>
          <li>
            <b>BMR(女)</b> = 9.99 × 體重(公斤) + 6.25 × 身高(公分) - 4.92 × 年齡 - 161
          </li>
        </ul>

        <div class="my-5 mx-0 px-4 mx-lg-20 px-lg-10 py-4 bg-light">
          <h5 class="text-brown1 fw-bold mb-5">BMR 計算機</h5>
          <form name="bmrForm" id="bmrForm" @submit.prevent="calcBMR">
            <div class="d-flex align-items-center mb-4">
              <!-- 性別 -->
              <div class="w-50 d-flex align-items-center">
                <div class="form-check me-4">
                  <label class="form-check-label" for="genderM">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderM"
                      value="1"
                      checked
                    />
                    生理男性
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label" for="genderF">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderF"
                      value="2"
                    />
                    生理女性
                  </label>
                </div>
              </div>
              <!-- 年齡 -->
              <div class="w-50">
                <label for="age" class="form-label d-flex align-items-center w-100">
                  <p class="me-5">年齡</p>
                  <input type="number" min=0 max=200 class="w-50 form-control" id="age" require>
                </label>
              </div>
            </div>
            <div class="d-flex align-items-center mb-4">
              <!-- 身高 -->
              <div class="w-50">
                <label for="height" class="form-label d-flex align-items-center w-100">
                  <p class="me-5">身高</p>
                  <input type="number" min=0 max=300 class="w-50 form-control" id="height" require>
                  <p>公分</p>
                </label>
              </div>
              <!-- 體重 -->
              <div class="w-50">
                <label for="height" class="form-label d-flex align-items-center w-100">
                  <p class="me-5">體重</p>
                  <input type="number" min=0 max=300 class="w-50 form-control" id="weight" require>
                  <p>公斤</p>
                </label>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button type="submit" class="btn btn-primary">計算 BMR</button>
              <p v-if="bmr" class="text-green1 fw-bold mx-6">您的 BMR ： {{ bmr}}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row mb-10">
      <div class="col-10 offset-1">
        <h4 class="text-green1 fw-bold mb-5">如何計算 TDEE？</h4>

        <ul class="list-style2 text-gray1 ps-2 ps-lg-10">
          <li>無活動：久坐，TDEE = 1.2 x BMR</li>
          <li>輕量活動：每周運動1-3天(輕鬆)，TDEE = 1.375 x BMR</li>
          <li>
            中度活動量：站走稍多、每周運動3-5天（中強度），TDEE = 1.55 x BMR。
          </li>
          <li>
            高度活動量：站走為主、每周運動6-7天（高強度），TDEE = 1.725 x BMR
          </li>
          <li>
            非常高度活動量：無時無刻都在運動，幾乎整天都做高強度的運動，像是建築工人等勞力型的工作，TDEE
            = 1.9 x BMR
          </li>
        </ul>

        <div class="my-5 mx-0 px-4 mx-lg-20 px-lg-10 py-4 py-4 bg-light">
          <h5 class="text-brown1 fw-bold mb-5">TDEE 計算機</h5>
          <form name="tdeeForm" id="tdeeForm" @submit.prevent="calcTDEE">
            <div class="d-flex align-items-center mb-4">
              <!-- BMR -->
              <div class="w-50">
                <label for="bmr2" class="form-label d-flex align-items-center w-100">
                  <p class="me-5">您的 BMR</p>
                  <input v-model="bmr" name="bmr2" type="number" min=0 max=5000
                    class="w-50 form-control" id="bmr2" require>
                </label>
              </div>
            </div>
            <div class="d-flex align-items-center mb-4">
              <!-- 活動量 -->
              <div class="w-100">
                <div class="form-check mb-4">
                  <label class="form-check-label" for="noAct">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="activity"
                      id="noAct"
                      value="1.2"
                      checked
                    />
                    無活動：久坐
                  </label>
                </div>
                <div class="form-check mb-4">
                  <label class="form-check-label" for="lightAct">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="activity"
                      id="lightAct"
                      value="1.375"
                    />
                    輕量活動：每周運動1-3天（輕鬆）
                  </label>
                </div>
                <div class="form-check mb-4">
                  <label class="form-check-label" for="mediumAct">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="activity"
                      id="mediumAct"
                      value="1.55"
                    />
                    中度活動量：站走稍多、每周運動 3-5 天（中強度）
                  </label>
                </div>
                <div class="form-check mb-4">
                  <label class="form-check-label" for="highAct">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="activity"
                      id="highAct"
                      value="1.725"
                    />
                    高度活動量：站走為主、每周運動 6-7 天（高強度）
                  </label>
                </div>
                <div class="form-check mb-4">
                  <label class="form-check-label" for="strongAct">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="activity"
                      id="strongAct"
                      value="1.9"
                    />
                    非常高度活動量：無時無刻都在運動，幾乎整天都做高強度的運動，像是建築工人等勞力型的工作
                  </label>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button type="submit" class="btn btn-primary">計算 TDEE</button>
              <p v-if="tdee" class="text-green1 fw-bold mx-6">您的 TDEE ： {{ tdee }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row mb-10">
      <div class="col-10 offset-1">
        <h4 class="text-green1 fw-bold mb-5">
          如何吃得少又吃得好？打造專屬於你的智慧健康減重菜單
        </h4>
        <p>以不低於基礎代謝 BMR 來分配每日熱量攝取</p>
        <div class="row my-5">
          <div class="col-12 offset-0 col-lg-10 offset-lg-1">
            <form name="dietPlan" id="dietPlan" @submit.prevent="calcIng">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>
                      三大類營養素每日應攝取份量
                    </th>
                    <th colspan="2" style="width:65%">
                      <label for="bmr2" class="form-label d-flex align-items-center w-100">
                        <p class="me-5">您的 TDEE</p>
                        <input v-model="tdee" name="tdee2" type="number" min=0 max=5000
                          class="w-50 form-control" id="tdee2" require>
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"></th>
                    <td>比例</td>
                    <td>份量（g）</td>
                  </tr>
                  <tr>
                    <th scope="row">蛋白質</th>
                    <td>
                      <label for="protein" class="form-label d-flex align-items-center w-100">
                        <input id="protein" type="number" placeholder="30" value="30"
                        min=0 max=100 class="w-50 form-control" require>
                        <p class="ms-2">%</p>
                      </label>
                    </td>
                    <td>
                      {{ protein }} g
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">油脂類</th>
                    <td>
                      <label for="fat" class="form-label d-flex align-items-center w-100">
                        <input id="fat" type="number" placeholder="25" value="25"
                        min=0 max=100 class="w-50 form-control" require>
                        <p class="ms-2">%</p>
                      </label>
                    </td>
                    <td>
                      {{ fat }} g
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">澱粉醣類</th>
                    <td>
                      <label for="carbo" class="form-label d-flex align-items-center w-100">
                        <input id="carbo" type="number" placeholder="45" value="45"
                        min=0 max=100 class="w-50 form-control" require>
                        <p class="ms-2">%</p>
                      </label>
                    </td>
                    <td>
                      {{ carbo }} g
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-center align-items-center">
                <button type="submit" class="btn btn-primary">計算營養素份量</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
ul.list-style1 {
  list-style-type: disc;
}
ul.list-style2 {
  list-style-type: square;
}
</style>

<script>
export default {
  data() {
    return {
      bmr: 0,
      tdee: 0,
      protein: 0,
      fat: 0,
      carbo: 0,
    };
  },
  methods: {
    calcBMR() {
      const form = document.forms.bmrForm;
      // 性別
      let gender;
      for (let i = 0; i < form.elements.gender.length; i += 1) {
        if (form.gender[i].checked) {
          gender = form.elements.gender[i].value;
        }
      }
      const age = form.elements.age.value;
      const height = form.elements.height.value;
      const weight = form.elements.weight.value;
      if (gender === '1') {
        this.bmr = Math.round(9.99 * weight + 6.25 * height - 4.92 * age + 166 - 161);
      } else {
        this.bmr = Math.round(9.99 * weight + 6.25 * height - 4.92 * age - 161);
      }
    },
    calcTDEE() {
      const form = document.forms.tdeeForm;
      // 活動量
      let activity;
      for (let i = 0; i < form.elements.activity.length; i += 1) {
        if (form.activity[i].checked) {
          activity = form.elements.activity[i].value;
        }
      }
      this.tdee = Math.round(Number(this.bmr) * Number(activity));
    },
    calcIng() {
      const form = document.forms.dietPlan;
      const protein = form.elements.protein.value;
      const fat = form.elements.fat.value;
      const carbo = form.elements.carbo.value;
      this.protein = Math.round(((protein / 100) / 4) * this.tdee);
      this.fat = Math.round(((fat / 100) / 9) * this.tdee);
      this.carbo = Math.round(((carbo / 100) / 4) * this.tdee);
    },
  },
};
</script>
