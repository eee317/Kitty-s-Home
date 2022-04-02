<template>
  <div class="container">
    <h1>捐款項目</h1>
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-4" v-for="product in products" :key='product.id'>
        <div class="card border-light mb-3 h-100" style="max-width: 18rem;">
        <!-- <img :src="product.imageUrl" class="card-img-top" :alt="product.title"> -->
        <div class='position-relative d-grid gap-2'
        :style="{backgroundImage:`url(${product.imageUrl})`}"
        style="height: 200px; background-size: cover; background-position: center">
        <button @click='openModal(product)'
        type='button' style="text-decoration:none; text-shadow: 0.0em 0.0em 0.2em black;"
        class="btn btn-link text-white position-absolute bottom-0 start-50 translate-middle-x">查看更多</button>
        </div>
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">NT$ {{product.price}}</p>
          </div>
          <div class="input-group">
            <select class="form-select" :id="product.id+'select'" @change="buttonStatus(product.id, 'original')">
                            <!-- option的標籤加入:selected="item.qty===num" 選擇當前的值，num迴圈有20個，如果qty數量跟num一樣時，就選擇這個值；但之後這行被刪了，因為有select標籤綁定v-model綁定 -->
                            <option selected disabled>請選擇</option>
                            <option :value="num" v-for='num in 20' :key='`${num}${product.id}select`'>{{num}}</option>
                          </select>
          </div>
        <button href="#" class="btn btn-primary d-inline" @click='addCart(product.id, "original")' :disabled="buttonDisabled" :id='product.id+"button"'>加入捐款項目</button>
      </div>
      </div>
    </div>
    <donateModal :item="product" ref="productModal" @button-status='buttonStatus' @add-cart='addCart'></donateModal>
  </div>
</template>

<script>
import donateModal from '@/components/DonateModal.vue'
export default {
  data () {
    return {
      buttonDisabled: true,
      products: [],
      product: {}
    }
  },
  components: {
    donateModal
  },
  methods: {
    test (id, comments) {
      let button = {}
      if (comments === 'button') {
        button = document.querySelector(`#${id}button`)
      } else if (comments === 'buttonModel') {
        button = document.querySelector(`#${id}buttonModel`)
      }
      console.log(button)
      const select = document.querySelector(`#${id}`)
      const selectNum = select.selectedIndex
      if (selectNum > 0) {
        console.log(button)
        button.disabled = false
      }
    },
    getProducts () {
      this.$http(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
          console.log(res)
        })
    },
    openModal (product) {
      this.product = { ...product }
      console.log(this.product)
      const productModal = this.$refs.productModal
      productModal.openModal()
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
    addCart (id, comment) {
      let select = {}
      let selectNum = {}
      if (comment === 'original') {
        select = document.querySelector(`#${id}select`)
        selectNum = select.selectedIndex
        this.addCartRunApi(id, selectNum)
      } else {
        select = document.querySelector(`#${id}selectModel`)
        selectNum = select.selectedIndex
        this.addCartRunApi(id, selectNum)
        this.$refs.productModal.hideModal(id)
      }
    },
    addCartRunApi (id, selectNum) {
      if (selectNum > 0) {
        const data = {
          product_id: id,
          qty: selectNum
        }
        const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        this.$http.post(url, { data })
          .then(res => {
            console.log(res)
            alert('已加入捐款項目')
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
