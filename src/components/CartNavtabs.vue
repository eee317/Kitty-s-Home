<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a :class="cart?'active':''"
      class="nav-link" aria-current="page" href="#">捐款項目</a>
    </li>
    <li class="nav-item">
      <a :class="form?'active':''"
      class="nav-link" href="#">填寫表單</a>
    </li>
    <li class="nav-item">
      <a :class='payment?"active":""'
      class="nav-link" href="#">結帳</a>
    </li>
    <li class="nav-item">
      <a :class='finish?"active":""'
      class="nav-link" href="#">完成捐款</a>
    </li>
  </ul>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cart: 1,
      form: 0,
      payment: 0,
      finish: 0,
      orderId: this.$route.path
    }
  },
  mounted () {
    emitter.on('clickNext', (text) => {
      if (text === 'form') {
        this.cart = 0
        this.form = 1
        this.payment = 0
        this.finish = 0
      } else if (text === 'payment') {
        this.cart = 0
        this.form = 0
        this.payment = 1
        this.finish = 0
      } else if (text === 'cart') {
        this.cart = 1
        this.form = 0
        this.payment = 0
        this.finish = 0
      } else if (text === 'finish') {
        this.cart = 0
        this.form = 0
        this.payment = 0
        this.finish = 1
      }
    })
    if (this.$route.path === '/cart') {
      this.cart = 1
      this.form = 0
      this.payment = 0
      this.finish = 0
    } else if (this.$route.path === '/cart/form') {
      this.cart = 0
      this.form = 1
      this.payment = 0
      this.finish = 0
    } else if (this.$route.path === `/cart/supermarket/${this.$route.params.id}` || this.$route.path === `/cart/ATM/${this.$route.params.id}`) {
      this.cart = 0
      this.form = 0
      this.payment = 0
      this.finish = 1
    } else if (this.$route.path === '/cart/finish') {
      this.cart = 0
      this.form = 0
      this.payment = 0
      this.finish = 1
    } else if (this.$route.path === this.orderId) {
      this.cart = 0
      this.form = 0
      this.payment = 1
      this.finish = 0
    }
  }
}
</script>
