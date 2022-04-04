<template>
  <div
    id="editModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productEditModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 圖檔上傳區 -->
            <div class="col-sm-4">
              <div class="bg-secondary text-light rounded p-4 mb-4">
                <h4 class="mb-3">圖檔上傳區</h4>
                <label for="btnUploadImg">
                  <input
                    type="file"
                    class="form-control mb-3"
                    @change="uploadProductImg"
                    id="btnUploadImg"
                    placeholder="請輸入圖片連結"
                  />
                </label>
                <p v-if="is_uploadImg" class="text-danger fw-bolder mb-3">
                  圖片上傳中...請靜待回傳結果
                </p>
                <p v-else class="mb-3">圖檔網址回傳結果：</p>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="imgFileLink"
                    v-model="uploadImgFile.imageUrl"
                    aria-label="圖檔連結位址"
                    placeholder="圖檔連結位址"
                  />
                  <button
                    type="button"
                    class="input-group-text"
                    id="btn_copyLink"
                    @click="copyText()"
                    data-clipboard-target="#imgFileLink"
                  >
                    <!-- 複製位址 -->
                    <span class="material-icons"> content_copy </span>
                  </button>
                </div>
                <p v-text="uploadImgFile.message"></p>
              </div>
              <div class="mb-2">
                <div class="mb-3">
                  <h4 class="mb-3">產品主圖</h4>
                  <div class="border mb-8">
                    <input
                      type="text"
                      class="form-control mb-3"
                      aria-label="請輸入圖片網址或上傳圖檔"
                      aria-describedby="button-addon2"
                      placeholder="請輸入圖片連結位址"
                      v-model="tempItem.imageUrl"
                    />
                    <div class="p-8">
                      <img
                        :src="tempItem.imageUrl"
                        :alt="tempItem.title + '主圖'"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="mb-3">新增其他附圖</h4>
                <template v-for="(imgUrl, i) in tempItem.imagesUrl" :key="i">
                  <div class="border mb-8">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        aria-label="請輸入圖片網址"
                        aria-describedby="button-addon2"
                        placeholder="請輸入圖片連結位址或上傳圖檔"
                        v-model="tempItem.imagesUrl[i]"
                      />
                      <button
                        class="btn btn-danger"
                        type="button"
                        @click="tempItem.imagesUrl.splice(i, 1)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                    <div class="p-8">
                      <img
                        :src="imgUrl"
                        :alt="tempItem.title + '附圖' + (Number(i) + 1)"
                      />
                    </div>
                  </div>
                </template>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="tempItem.imagesUrl.push('')"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <!-- 產品細節 -->
            <div class="col-sm-8">
              <!-- 產品名稱、類別 -->
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="title" class="form-label w-100">
                    產品名稱
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品名稱"
                      v-model="tempItem.title"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label w-100">
                    類別
                    <input
                      id="category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品類別"
                      v-model="tempItem.category"
                    />
                  </label>
                </div>
              </div>
              <!-- 內含產品數量、單位 -->
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="number" class="form-label w-100">
                    內含產品數量
                    <input
                      id="number"
                      type="number"
                      class="form-control"
                      placeholder="請輸入數量"
                      v-model.number="tempItem.number"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label w-100">
                    單位
                    <input
                      id="unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                      v-model="tempItem.unit"
                    />
                  </label>
                </div>
              </div>
              <!-- 原價、優惠價 -->
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label w-100">
                    原價
                    <input
                      id="origin_price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入產品原價"
                      v-model.number="tempItem.origin_price"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label w-100">
                    優惠價
                    <input
                      id="price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入折扣優惠價"
                      v-model.number="tempItem.price"
                    />
                  </label>
                </div>
              </div>
              <hr />
              <!-- 產品描述 -->
              <div class="mb-3">
                <label for="description" class="form-label w-100">
                  產品描述
                  <textarea
                    id="description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                    v-model="tempItem.description"
                  >
                  </textarea>
                </label>
              </div>
              <!-- 說明內容 -->
              <div class="mb-3">
                <label for="content" class="form-label w-100">
                  說明內容
                  <textarea
                    id="content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入說明內容"
                    v-model="tempItem.content"
                  >
                  </textarea>
                </label>
              </div>
              <!-- 是否上架 -->
              <div class="mb-3">
                <div class="form-check">
                  <label class="form-check-label" for="is_enabled">
                    是否上架
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempItem.is_enabled"
                    />
                  </label>
                </div>
              </div>
              <hr />
              <!-- 產品內含營養素成分 -->
              <div class="row">
              <!-- 是否啟用營養成分表 -->
              <div class="mb-3">
                <div class="form-check">
                  <label class="form-check-label" for="is_nutrients">
                    是否啟用營養成分表
                    <input
                      id="is_nutrients"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempItem.is_nutrients"
                    />
                  </label>
                </div>
              </div>
                <div class="mb-3 col-md-4">
                  <label for="calorie" class="form-label w-100">
                    熱量
                    <input
                      id="calorie"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g熱量"
                      v-model.number="tempItem.calorie"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="carbohydrate" class="form-label w-100">
                    總碳水化合物
                    <input
                      id="carbohydrate"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="每100g總碳水化合物"
                      v-model.number="tempItem.carbohydrate"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="crudeFat" class="form-label w-100">
                    粗脂肪
                    <input
                      id="crudeFat"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="每100g粗脂肪"
                      v-model.number="tempItem.crudeFat"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="SaturatedFat" class="form-label w-100">
                    飽和脂肪
                    <input
                      id="SaturatedFat"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="每100g飽和脂肪"
                      v-model.number="tempItem.SaturatedFat"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="protein" class="form-label w-100">
                    粗蛋白
                    <input
                      id="protein"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="每100g粗蛋白"
                      v-model.number="tempItem.protein"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="DietaryFiber" class="form-label w-100">
                    膳食纖維
                    <input
                      id="DietaryFiber"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="每100g膳食纖維"
                      v-model.number="tempItem.DietaryFiber"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="sodium" class="form-label w-100">
                    鈉
                    <input
                      id="sodium"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g含鈉(mg)"
                      v-model.number="tempItem.sodium"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="calcium" class="form-label w-100">
                    鈣
                    <input
                      id="calcium"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g含鈣(mg)"
                      v-model.number="tempItem.calcium"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="potassium" class="form-label w-100">
                    鉀
                    <input
                      id="potassium"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g含鉀(mg)"
                      v-model.number="tempItem.potassium"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="zinc" class="form-label w-100">
                    鋅
                    <input
                      id="zinc"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g含鋅(mg)"
                      v-model.number="tempItem.zinc"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="magnesium" class="form-label w-100">
                    鎂
                    <input
                      id="magnesium"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g含鎂(mg)"
                      v-model.number="tempItem.magnesium"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="iron" class="form-label w-100">
                    鐵
                    <input
                      id="iron"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="每100g含鐵(mg)"
                      v-model.number="tempItem.iron"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="is_addNew"
            type="button"
            class="btn btn-primary"
            @click="closeModal();$emit('editProduct', tempItem);"
          >
            建立新產品
          </button>
          <button
            v-else
            type="button"
            class="btn btn-success"
            @click="closeModal();$emit('editProduct', tempItem);"
          >
            更新產品內容
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Clipboard from 'clipboard';

export default {
  name: 'ModalEdit',
  data() {
    return {
      modal: '',
      is_uploadImg: 0,
      uploadImgFile: {
        imageUrl: '',
        message: '',
      },
      tempItem: {
        imagesUrl: [],
      },
      is_addNew: 0,
    };
  },
  methods: {
    openModal(isAddItem, item) {
      this.organizeData(isAddItem, item);
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    uploadProductImg() {
      // 圖片上傳中
      this.is_uploadImg = 1;
      // 清空預設
      this.uploadImgFile = {
        imageUrl: '',
        message: '',
      };

      const btnUploadImg = document.querySelector('#btnUploadImg');

      const file = btnUploadImg.files[0];
      console.dir(file); // 先對 input 內容進行觀察

      const formData = new FormData();
      // 建立表單格式的物件
      // 對應平台 API 格式：<input type='file' name='file-to-upload'>
      formData.append('file-to-upload', file);

      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/upload`, formData)
        .then((res) => {
          console.log(res.data.imageUrl);
          this.uploadImgFile.imageUrl = res.data.imageUrl;
          // 圖片上傳完成
          this.is_uploadImg = 0;
          // 清空上傳檔案
          btnUploadImg.value = '';
        })
        .catch((err) => {
          console.log(err.response.message);
          this.uploadImgFile.message = err.response.message;
          // 圖片上傳失敗，重設狀態
          this.is_uploadImg = 0;
        });
    },
    copyText() {
      const clipboard = new Clipboard('#btn_copyLink');

      clipboard.on('success', (e) => {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        // 取消選取
        e.clearSelection();
      });

      clipboard.on('error', (e) => {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    },
    organizeData(isAddItem, item) {
      this.is_addNew = isAddItem;
      this.tempItem = {
        imagesUrl: [],
      };
      if (item) {
        this.tempItem = JSON.parse(JSON.stringify(item));
        if (!item.imagesUrl) {
          this.tempItem.imagesUrl = [];
        }
      }
    },
  },
  mounted() {
    // 建立 modal 實體
    this.modal = new Modal(document.getElementById('editModal'));
  },
};
</script>
