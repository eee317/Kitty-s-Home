<template>
  <div
    class="modal fade"
    ref="editModal"
    id="editModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="state">新增</span>
            <span v-else>編輯</span>
            {{ donate.title }}
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
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="tempDonate.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <img class="img-fluid" :src="tempDonate.imageUrl" alt="" />
              <div v-if="Array.isArray(tempDonate.imagesUrl)">
                <template
                  v-for="(img, key) in tempDonate.imagesUrl"
                  :key="key + 'img'"
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempDonate.imagesUrl[key]"
                  />
                  <img
                    class="img-fluid"
                    :src="tempDonate.imagesUrl[key]"
                    alt=""
                  />
                </template>
                <button
                  v-if="
                    !tempDonate.imagesUrl.length ||
                    tempDonate.imagesUrl[tempDonate.imagesUrl.length - 1]
                  "
                  @click="tempDonate.imagesUrl.push('')"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                >
                  新增圖片
                </button>
                <button
                  v-if="tempDonate.imagesUrl.length"
                  @click="tempDonate.imagesUrl.pop('')"
                  class="btn btn-outline-danger btn-sm d-block w-100"
                >
                  刪除圖片
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="creatImg"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempDonate.title"
                />
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    v-model="tempDonate.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempDonate.unit"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="tempDonate.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    v-model="tempDonate.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                v-model="tempDonate.description"
                placeholder="請輸入產品描述"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                v-model="tempDonate.content"
                placeholder="請輸入說明內容"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  id="is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempDonate.is_enabled"
                />
                <label class="form-check-label" for="is_enabled"
                  >是否啟用</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-secondary css-button"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click='updateDonate'>上傳</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.css-button {
  color: white;
}
</style>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    donate: {},
    state: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempDonate: {
        imagesUrl: []
      }
    }
  },
  methods: {
    openModal () {
      this.editModal.show()
      console.log(this.state)
    },
    hideModal () {
      this.editModal.hide()
    },
    updateDonate () {
      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product`
      let apiAction = 'post'
      console.log(this.tempDonate)
      if (this.state === false) {
        url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempDonate.id}`
        apiAction = 'put'
      }
      this.$http[apiAction](url, { data: this.tempDonate })
        .then(res => {
          this.hideModal()
          this.$emit('get-order')
          console.log(this.state)
        })
        .catch(err => {
          console.dir(err)
        })
    }
  },
  watch: {
    donate () {
      this.tempDonate = JSON.parse(JSON.stringify(this.donate))
    }
  },
  mounted () {
    this.editModal = new Modal(this.$refs.editModal, {
      keyboard: false,
      backdrop: false
    })
  }
}
</script>
