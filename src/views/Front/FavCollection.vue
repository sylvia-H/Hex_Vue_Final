<template>
  <section class="container | py-20">
    <h2 class="text-center">我的收藏</h2>
    <hr class="my-6" />
    <div class="row text-center">
      <div>
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">品名</th>
              <th scope="col">類別</th>
              <th scope="col">內含份量</th>
              <th scope="col">總熱量</th>
              <th scope="col">總碳水化合物</th>
              <th scope="col">粗脂肪總量</th>
              <th scope="col">粗蛋白總量</th>
              <th scope="col">查看商品細節</th>
              <th scope="col">加入購物車</th>
              <th scope="col">收藏中</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Object.keys(collection)" :key="item">
              <th scope="row" class="align-middle">
                <span class="badge bg-primary mb-2">
                  {{ collection[item].category }}
                </span>
                <br />
                {{ collection[item].title }}
              </th>
              <td class="align-middle">
                <img
                  style="max-width: 100px"
                  :src="collection[item].imageUrl"
                  :alt="collection[item].title"
                />
              </td>
              <td class="align-middle">
                {{ collection[item].number }} {{ collection[item].unit }}
              </td>
              <td class="align-middle">
                {{ (collection[item].calorie * collection[item].number) / 100 }}
                kcal
              </td>
              <td class="align-middle">
                {{
                  (collection[item].carbohydrate * collection[item].number) / 100
                }}
                g
              </td>
              <td class="align-middle">
                {{ (collection[item].crudeFat * collection[item].number) / 100 }}
                g
              </td>
              <td class="align-middle">
                {{ (collection[item].protein * collection[item].number) / 100 }} g
              </td>
              <td class="align-middle">
                <router-link :to="`/product/${collection[item].id}`">
                  <i class="bi bi-zoom-in"></i>
                </router-link>
              </td>
              <td class="align-middle">
                <button
                  @click="addCart(item)"
                  :disabled="item === is_loadingItem"
                  type="button"
                  class="btn btn-dark d-flex align-items-center"
                >
                  <div
                    v-if="item === is_loadingItem"
                    class="spinner-border text-warning"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="d-flex" v-else>
                    <i class="bi bi-cart3 me-1"></i>
                    <span class="d-none d-lg-block"> 想買 </span>
                  </div>
                </button>
              </td>
              <td class="align-middle">
                <button
                  type="button"
                  @click="addCollection(collection[item])"
                  class="btn btn-outline-danger d-flex align-items-center"
                  :class="{ active: collection[item] }"
                >
                  <i class="bi bi-heart"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      is_loadingItem: '',
      collection: {},
    };
  },
  methods: {
    addCollection(item) {
      const fvID = item.id;
      if (this.collection[fvID]) {
        delete this.collection[fvID];
      } else {
        this.collection[fvID] = item;
      }
      localStorage.setItem('myFavorite', JSON.stringify(this.collection));
    },
    getCollection() {
      if (localStorage.getItem('myFavorite')) {
        const jsonData = JSON.parse(localStorage.getItem('myFavorite'));
        this.collection = jsonData;
        console.log(JSON.parse(localStorage.getItem('myFavorite')));
      }
    },
    addCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.is_loadingItem = id;

      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`,
          { data },
        )
        .then((res) => {
          console.log(res.data);
          const name = res.data.data.product.title;
          const msg = res.data.message;
          // SweetAlert：產品成功加入購物車
          this.$swal.fire({
            icon: 'success',
            title: '成功！',
            text: `${name} ${msg}`,
          });
          this.is_loadingItem = '';
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    showLoading() {
      const loader = this.$loading.show();
      setTimeout(() => {
        loader.hide();
      }, 500);
      // this.isLoading = true;
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    },
  },
  mounted() {
    this.showLoading();
    this.getCollection();
  },
};
</script>
