<template>
  <ul class="justify-content-center d-flex justify-content-center align-items-center
  list-unstyled mb-4 text-black-50">
    <li>
      <p :class="cart?'active bg-light text-success':''"
      class="" aria-current="page">捐款項目</p>
    </li>
    <li>
      <p :class="form?'active bg-light text-success':''"
      class="">填寫表單</p>
    </li>
    <li>
      <p :class='payment?"active bg-light text-success":""'
      class="" href="#">結帳</p>
    </li>
    <li>
      <p :class='finish?"active bg-light text-success":""'
      class="">完成捐款</p>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
li {
  padding: 10px;
}
.active {
  font-size: 24px;
  padding: 10px 20px 10px 20px;
  border-style:solid;
  border-width:0.1px;
}
.css-line {
  border-style:solid;
  border-width:0.1px;
}
</style>
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
