<template>
<div>
  <table class="table">
    <thead>
      <tr class="text-primary">
        <th scope="row"><h2><i class="bi bi-file-earmark-check-fill me-2"></i>捐款內容</h2></th>
        <th scope="col">數量</th>
        <th scope="col">單價</th>
        <th scope="col">金額</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(item) in userProducts' :key='item.id+"userProduct"'>
        <th scope="row" class="text-primary">{{item.product.title}}</th>
        <td scope="col">{{item.qty}} {{item.product.unit}}</td>
        <td scope="col">{{item.product.price}}</td>
        <td scope="col">＄{{item.total}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class='table-light'>
        <th scope="row" class="text-primary">捐款總金額</th>
        <td scope="col"></td>
        <td scope="col"></td>
        <th scope="col" class="text-success">＄{{userOrder.total}}</th>
      </tr>
    </tfoot>
  </table>
  <table class="table my-5">
  <thead>
    <tr>
      <th scope="col" class="text-primary"><h2><i class="bi bi-file-earmark-text-fill me-2"></i>捐款資訊</h2></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" class="text-primary">捐款編號</th>
      <td>{{orderId}}</td>
    </tr>
    <tr>
      <th scope="row" class="text-primary">捐款建立日期</th>
      <td colspan="2">{{creatDate(userOrder.create_at)}}</td>
    </tr>
    <tr>
      <th scope="row" class="text-primary">捐款建立時間</th>
      <td colspan="2">{{creatTime(userOrder.create_at)}}</td>
    </tr>
    <tr>
      <th scope="row" class="text-primary">捐款者</th>
      <td colspan="2">{{userForm.name}}</td>
    </tr>
    <tr v-show="userForm.identity==='company'">
      <th scope="row" class="text-primary">捐款公司</th>
      <td colspan="2">{{userForm.companyName}} 公司統編：{{userForm.companyID}}</td>
    </tr>
    <tr v-show="userForm.identity==='company'">
      <th scope="row" class="text-primary">捐款公司電話</th>
      <td colspan="2">{{userForm.companyPhone}}</td>
    </tr>
    <tr>
      <th scope="row" class="text-primary">信箱</th>
      <td colspan="2">{{userForm.email}}</td>
    </tr>
    <tr>
      <th scope="row" class="text-primary">聯絡電話</th>
      <td colspan="2">{{userForm.tel}}</td>
    </tr>
    <tr>
      <th scope="row" class="text-primary">付款方式</th>
      <td colspan="2">{{userForm.method}}</td>
    </tr>
  </tbody>
</table>
  <FormValidate v-slot="{ errors }" @submit="clickNext('finish')">
  <div class="card" v-if='userForm.method==="信用卡"'>
    <h5 class="card-header text-primary bg-light">信用卡資訊</h5>
    <div class="card-body">
      <h6 class="card-title text-primary">請輸入信用卡卡號</h6>
        <div class="row mt-4">
          <div class="col-2">
            <FieldValidate name="1" :class="{ 'is-invalid': errors['1'] }"
              rules='required'
              type="tel" class="form-control" maxlength="4">
            </FieldValidate>
          </div>
          <div class="col-2">
            <FieldValidate name="2" :class="{ 'is-invalid': errors['2'] }"
            rules='required'
            type="tel" class="form-control" maxlength="4">
            </FieldValidate>
          </div>
          <div class="col-2">
            <FieldValidate name="3" :class="{ 'is-invalid': errors['3'] }"
            rules='required'
            type="tel" class="form-control" maxlength="4">
            </FieldValidate>
          </div>
          <div class="col-2">
            <FieldValidate name="4" :class="{ 'is-invalid': errors['4'] }"
            rules='required'
            type="tel" class="form-control" maxlength="4">
            </FieldValidate>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-2">
            <div class="mb-3">
              <label for="formGroupExampleInput" class="form-label text-secondary">日期</label>
              <FieldValidate
                name="cardDate" :class="{ 'is-invalid': errors['cardDate'] }"
                rules='required'
                type="tel" class="form-control" id="inputPhone" maxlength="5">
              </FieldValidate>
            </div>
          </div>
          <div class="col-2">
            <div class="mb-3">
              <label for="cardEndNumber" class="form-label text-secondary" >末3碼</label>
              <FieldValidate name="cardEndNumber" :class="{ 'is-invalid': errors['cardEndNumber'] }"
                rules='required'
                type="password" class="form-control" id="cardEndNumber" maxlength="3">
              </FieldValidate>
            </div>
          </div>
        </div>
    </div>
  </div>
      <button type='submit' class="btn btn-primary float-end mt-3 mb-3">下一步 完成捐款</button>
      </FormValidate>
</div>
  <router-link type='button' class="btn btn-primary mt-3 mb-3" to="/cart/form" @click='clickNext("cart")'>上一步</router-link>
  <loadingPage :isLoading='isLoading'></loadingPage>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      isLoading: true,
      userOrder: {},
      userForm: {},
      userProducts: {},
      orderId: ''
    }
  },
  methods: {
    clickNext (text) {
      emitter.emit('clickNext', text)
      if (this.userForm.method === '信用卡') {
        this.$router.push('/cart/finish')
      } else if (this.userForm.method === 'ATM') {
        this.$router.push(`/cart/ATM/${this.$route.params.id}`)
      } else {
        this.$router.push(`/cart/supermarket/${this.$route.params.id}`)
      }
      emitter.emit('render-cart')
    },
    getUserOrder () {
      this.isLoading = true
      this.orderId = this.$route.params.id
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url)
        .then(res => {
          this.userOrder = res.data.order
          this.userForm = this.userOrder.user
          this.userProducts = this.userOrder.products
          setTimeout(() => {
            this.isLoading = false
          }, 200)
        })
        .catch(err => {
          console.log(err)
        })
    },
    creatDate (second) {
      const time = new Date(second * 1000)
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      const timeText = `${year} / ${month} / ${day}`
      return timeText
    },
    creatTime (second) {
      const time = new Date(second * 1000)
      const hours = time.getHours()
      const minute = time.getMinutes()
      const getSecond = time.getSeconds()
      const timeText = `${hours} 點 ${minute} 分 ${getSecond} 秒`
      return timeText
    }
  },
  mounted () {
    this.getUserOrder()
    console.log(this.$route.params.id)
  }
}
</script>
