<template>
  <h2>捐款資料</h2>
  <div class="card mb-3" style="">
    <div class="row g-0">
      <div class="col-md-3">
        <img src="https://images.unsplash.com/photo-1577238057554-2e120f4f63ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">捐款金額</h5>
          <div v-for="(item) in cartData.carts" :key="item.id+'cartForm'">
          <p class="card-text">{{item.product.title}} {{item.qty}} {{item.product.unit}} {{item.total}}元</p>
          </div>
          <p class="card-text h6 text-primary mt-2"><small class="text-muted h6">捐款總金額 </small> {{cartData.total}}</p>
        </div>
      </div>
    </div>
  </div>
  <FormValidate ref="form" v-slot="{ errors }" @submit="clickNext('payment')">
    <fieldset class="row mb-3">
      <legend class="col-form-label col-sm-2 pt-0"><span class="text-danger">*</span> 捐款單位</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <FieldValidate
            class="form-check-input"
            type="radio"
            name="捐款單位"
            id="gridRadios1"
            value="company"
            v-model='userData.user.identity'
            :class="{'is-invalid': errors['捐款單位']}" rules="required"
          ></FieldValidate>
          <label class="form-check-label" for="gridRadios1">
            公司行號
          </label>
        </div>
        <div class="form-check">
          <FieldValidate
            class="form-check-input"
            type="radio"
            name="捐款單位"
            id="gridRadios2"
            value="personal"
            v-model='userData.user.identity'
            :class="{'is-invalid': errors['捐款單位']}" rules="required"
          ></FieldValidate>
          <label class="form-check-label" for="gridRadios2">
            個人
          </label>
          <ErrorMessage name="捐款單位" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
    </fieldset>
    <div class="row mb-3">
      <label for="inputName" class="col-sm-2 col-form-label"><span class="text-danger">*</span> 姓名</label>
      <div class="col-sm-10">
        <FieldValidate name="姓名" :class="{'is-invalid': errors['姓名']}" rules="required"
        type="text" class="form-control" id="inputName" v-model="userData.user.name"></FieldValidate>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.user.identity==="company"'>
      <label for="inputCompany" class="col-sm-2 col-form-label"><span class="text-danger">*</span> 公司名稱</label>
      <div class="col-sm-10">
        <FieldValidate name="公司名稱" :class="{'is-invalid': errors['公司名稱']}" :rules="{'required': userData.user.identity==='company'}"
        type="text" class="form-control" id="inputCompany" v-model="userData.user.companyName"></FieldValidate>
        <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.user.identity==="company"'>
      <label for="inputCompanyID" class="col-sm-2 col-form-label"><span class="text-danger">*</span> 統編</label>
      <div class="col-sm-10">
        <FieldValidate name="統編" :class="{'is-invalid': errors['公司名稱']}" :rules="{'required': userData.user.identity==='company'}"
        type="number" class="form-control" id="inputCompanyID" v-model="userData.user.companyID"></FieldValidate>
        <ErrorMessage name="統編" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3">
      <label for="email" class="col-sm-2 col-form-label"><span class="text-danger">*</span> Email</label>
      <div class="col-sm-10">
        <FieldValidate name="Email" :class="{ 'is-invalid': errors['Email'] }"
        rules="email|required"
        type="email" class="form-control" id="email" v-model="userData.user.email"></FieldValidate>
        <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.user.identity==="company"'>
      <label for="inputPhone" class="col-sm-2 col-form-label"><span class="text-danger">*</span> 公司電話</label
      >
      <div class="col-sm-10">
        <FieldValidate name="公司電話" :class="{ 'is-invalid': errors['公司電話'] }"
        :rules="{'required': userData.user.identity==='company'}"
        type="tel" class="form-control" id="inputPhone" v-model="userData.user.companyPhone"></FieldValidate>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputPhone" class="col-sm-2 col-form-label"><span class="text-danger">*</span> 聯絡電話</label>
      <div class="col-sm-10">
        <FieldValidate name="聯絡電話" :class="{ 'is-invalid': errors['聯絡電話'] }"
        rules='required'
        type="tel" class="form-control" id="inputPhone" v-model="userData.user.tel"></FieldValidate>
        <ErrorMessage name="聯絡電話" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputAddress" class="col-sm-2 col-form-label"
        ><span class="text-danger">*</span>
        捐款收據寄送地址</label
      >
      <div class="col-sm-10">
        <FieldValidate name="捐款收據寄送地址" :class="{ 'is-invalid': errors['捐款收據寄送地址'] }" rules='required'
        type="tel" class="form-control" id="inputAddress" v-model="userData.user.address"></FieldValidate>
        <ErrorMessage name="捐款收據寄送地址" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
  <button type='submit' class="btn btn-primary float-end">下一步 結帳</button>
  </FormValidate>
  <router-link
    type="button"
    class="btn btn-primary"
    to="/cart"
    @click="clickNext('cart')"
    >上一步</router-link>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: {},
      userData: {
        user: {
          identity: '',
          companyPhone: '',
          companyName: '',
          companyID: '',
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    clickNext (text) {
      if (text === 'payment') {
        const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/order`
        this.$http.post(url, { data: this.userData })
          .then(res => {
            console.log(res)
            this.formChack()
            this.$refs.form.resetForm()
            emitter.emit('clickNext', text)
            this.$router.push('/cart/payment')
          })
          .catch(err => {
            console.dir(err)
          })
      } else {
        emitter.emit('clickNext', text)
      }
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.cartData = res.data.data
          if (this.cartData?.carts?.length === 0) {
            this.$router.push('/donate')
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    formChack () {
      if (this.userData.user.identity === 'personal') {
        this.userData.user.companyPhone = ''
        this.userData.user.companyName = ''
        this.userData.user.companyID = ''
      }
    }
  }
}
</script>
