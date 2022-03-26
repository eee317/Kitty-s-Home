<template>
  <p v-if='cartData?.carts?.length===0'>目前尚未加入捐款款項</p>
  <div v-else>
    <button type='button' class="btn btn-primary float-end mt-3" @click="deleteCartAll">刪除全部</button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">捐款品項</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
          <th scope="col">金額</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in cartData.carts" :key="item.product.id">
        <tr>
          <th scope="row">{{index+1}}</th>
          <td>{{item.product.title}}</td>
          <td>
            <a href="#"><span class="bi bi-dash" @click.prevent="editCartItem(item.id, 'reduceOne', item.qty)"></span></a>
            <div class="d-inline p-3">{{item.qty}}</div>
            <a href="#"><span class="bi bi-plus-lg" @click.prevent="editCartItem(item.id, 'addOne', item.qty)"></span></a>
          </td>
          <td>{{item.product.price}}</td>
          <td>{{item.total}}</td>
        </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>捐款總額</td>
        <td>{{cartData.total}}</td>
      </tr>
    </tfoot>
    </table>
  </div>
<router-link type='button' class="btn btn-primary" to="/donate">返回捐款款項</router-link>
<router-link :class="{disabled:cartData?.carts?.length===0}"
type='button' class="btn btn-primary float-end" to="/cart/form" @click='clickNext("form")'>下一步 填寫捐款資料</router-link>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: []
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.cartData = res.data.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editCartItem (id, comments, num) {
      const itemNum = num
      let calculate = {}
      if (comments === 'reduceOne') {
        if (itemNum === 1) {
          return this.deleteCartItem(id)
        } else {
          calculate = itemNum - 1
        }
      } else {
        calculate = itemNum + 1
      }
      const data = {
        product_id: id,
        qty: calculate
      }
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.put(url, { data })
        .then(res => {
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCartItem (id) {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url)
        .then(res => {
          console.log(res)
          alert('已刪除')
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCartAll () {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url)
        .then(res => {
          console.log(res)
          alert('已刪除全部捐款項目')
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickNext (text) {
      emitter.emit('clickNext', text)
    }
  }
}
</script>
