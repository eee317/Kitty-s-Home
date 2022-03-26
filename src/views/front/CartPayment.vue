<template>
  <p>付款畫面</p>
  <router-link type='button' class="btn btn-primary m-3" to="/cart/form" @click='clickNext("cart")'>上一步</router-link>
  <router-link type='button' class="btn btn-primary m-3" to="/cart/finish" @click='clickNext("finish")'>下一步 完成捐款</router-link>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  methods: {
    clickNext (text) {
      emitter.emit('clickNext', text)
    }
  }
}
</script>
