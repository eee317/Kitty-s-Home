<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
  <div class="container-fluid">
      <div class="col-4">
            <img
              style="cursor: pointer;"
              @click='homePage'
              class="img-fluid"
              src="../libs/LOGO.svg"
              alt=""
            />
      </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-link mt-2" to="/about">關於我們</router-link>
        <router-link class="nav-link mt-2" to="/donate">我要捐款</router-link>
        <router-link class="nav-link bi bi-bag-heart-fill fs-4 position-relative" to="/cart">
          <span style='font-size:4px' class="p-1 position-absolute top-20 start-100 translate-middle badge rounded-pill bg-danger" v-for='num in cart' :key="num.id">
          {{cartNum}}</span>
        </router-link>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cart: [],
      cartNum: 0
    }
  },
  methods: {
    homePage () {
      this.$router.push('/')
    },
    renderCart () {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          console.log(res)
          let number = 0
          this.cart = res.data.data.carts
          this.cart.forEach(num => {
            number += num.qty
          })
          this.cartNum = number
        })
        .catch(err => {
          console.log(err)
        })
    },
    runCartNumber (num) {
      this.cartNum = num
    }
  },
  mounted () {
    this.renderCart()
    emitter.on('render-cart', () => {
      this.renderCart()
    })
  }
}
</script>
