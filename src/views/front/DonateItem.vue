<template>
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
      <a href="#" class="btn btn-primary d-inline">加入捐款項目</a>
    </div>
    </div>
  </div>
  <donateModal :item="product" ref="productModal"></donateModal>
</template>

<script>
import donateModal from '@/components/DonateModal.vue'
export default {
  data () {
    return {
      products: [],
      product: {}
    }
  },
  components: {
    donateModal
  },
  methods: {
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
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
