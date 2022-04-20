<template>
  <div class='container-fluid animated fadeIn'>
    <div class="img-fluid
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center" style='height:250px; background-size: cover; background-position: 50% 35%;
    background-image:url("https://images.unsplash.com/photo-1516007049085-2a9077b4b512?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")'>
      <h1 style='text-shadow: black 0.0em 0.05em 0.2em;'
      class='text-white'>捐款項目</h1>
      <p class='text-white'>請選先選擇數量，再加入捐款</p>
    </div>
  </div>
    <div class="container g-4">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 my-4" v-for="product in products" :key='product.id'>
          <div class="card text-dark border-0">
            <!-- <img :src="product.imageUrl" class="card-img-top" :alt="product.title"> -->
            <div class='position-relative d-grid gap-2'
            :style="{backgroundImage:`url(${product.imageUrl})`}"
            style="height: 200px; background-size: cover; background-position: center">
            <button @click='openModal(product)'
            type='button' style="text-decoration:none; text-shadow: 0.0em 0.0em 0.2em black;"
            class="btn btn-link text-white position-absolute bottom-0 start-50 translate-middle-x">查看更多</button>
            </div>
            <div class="card-body">
              <h5 class="card-title text-primary">{{product.title}}</h5>
              <p class="card-text text-primary fw-light">NT$ {{product.price}}</p>
            </div>
            <div class='d-flex justify-content-between'>
              <div class="input-group">
                <select class="form-select text-primary border-0"
                style=''
                :id="product.id+'select'" @change="buttonStatus(product.id, 'original')">
                                <!-- option的標籤加入:selected="item.qty===num" 選擇當前的值，num迴圈有20個，如果qty數量跟num一樣時，就選擇這個值；但之後這行被刪了，因為有select標籤綁定v-model綁定 -->
                                <option selected disabled>請選擇</option>
                                <option :value="num" v-for='num in 20' :key='`${num}${product.id}select`'>{{num}}</option>
                              </select>
              </div>
              <button href="#" style="width:100%"
            class="btn btn-secondary text-white"
            @click='addCart(product.id, "original", product.title)'
              :disabled="buttonDisabled" :id='product.id+"button"'>加入捐款</button>
            </div>
          </div>
        </div>
      </div>
      <donateModal :item="product" ref="productModal" @button-status='buttonStatus' @add-cart='addCart'></donateModal>
      <addDonateModal :item="productTitle" ref='addDonateModal'></addDonateModal>
      <loadingPage :isLoading='isLoading'></loadingPage>
    </div>
</template>
<style lang="scss" scoped>
.btn-outline-secondary {
  &:hover {
    color: white;
  }
}
</style>
<script>
import donateModal from '@/components/DonateModal.vue'
import addDonateModal from '@/components/addDonateModal.vue'
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      buttonDisabled: true,
      products: [],
      product: {},
      productTitle: {},
      isLoading: false
    }
  },
  components: {
    donateModal, addDonateModal
  },
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        })
    },
    openModal (product) {
      this.product = { ...product }
      console.log(this.product)
      const productModal = this.$refs.productModal
      productModal.openModal()
    },
    openAddModal (title) {
      this.productTitle = title
      const addDonateModal = this.$refs.addDonateModal
      addDonateModal.openModal()
    },
    buttonStatus (id, comments) {
      let button = {}
      let select = {}
      if (comments === 'original') {
        button = document.querySelector(`#${id}button`)
        select = document.querySelector(`#${id}select`)
      } else {
        button = document.querySelector(`#${id}buttonModel`)
        select = document.querySelector(`#${id}selectModel`)
      }
      const selectNum = select.selectedIndex
      if (selectNum > 0) {
        console.log(button)
        button.disabled = false
      }
    },
    addCart (id, comment, title) {
      let select = {}
      let selectNum = {}
      if (comment === 'original') {
        select = document.querySelector(`#${id}select`)
        selectNum = select.selectedIndex
        this.addCartRunApi(id, selectNum, title)
      } else {
        select = document.querySelector(`#${id}selectModel`)
        selectNum = select.selectedIndex
        this.addCartRunApi(id, selectNum, title)
        this.$refs.productModal.hideModal(id)
      }
    },
    addCartRunApi (id, selectNum, title) {
      if (selectNum > 0) {
        const data = {
          product_id: id,
          qty: selectNum
        }
        const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        this.$http.post(url, { data })
          .then(res => {
            console.log(res)
            this.openAddModal(title)
            emitter.emit('render-cart')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
