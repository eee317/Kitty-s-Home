<template>
  <h2>購物車</h2>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">捐款項目</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">填寫表單</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">結帳</a>
    </li>
  </ul>
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
      <td>{{item.qty}}</td>
      <td>{{item.product.price}}</td>
      <td>{{item.total}}</td>
    </tr>
  </tbody>
</table>

</template>
<script>
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
    }
  }
}
</script>
