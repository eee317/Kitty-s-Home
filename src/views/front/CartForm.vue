<template>
  <div class="card mb-5 ms-3 bg-light">
    <div class="card-body">
      <h5 class="card-title text-primary">捐款金額</h5>
      <div v-for="(item) in cartData.carts" :key="item.id+'cartForm'">
        <p class="card-text text-secondary">{{item.product.title}} {{item.qty}} {{item.product.unit}} {{item.total}}元</p>
      </div>
      <p class="card-text h6 text-primary mt-2"><small class="text-muted h6">捐款總金額 </small> {{cartData.total}}</p>
    </div>
  </div>
  <FormValidate ref="form" v-slot="{ errors }" @submit="clickNext('payment')" class='text-primary ms-3'>
    <fieldset class="row mb-3">
      <legend class="col-form-label col-sm-2 pt-0">捐款單位 <span class="text-danger">*</span></legend>
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
      <label for="inputName" class="col-sm-2 col-form-label">姓名 <span class="text-danger">*</span></label>
      <div class="col-sm-10">
        <FieldValidate name="姓名" :class="{'is-invalid': errors['姓名']}" rules="required"
        type="text" class="form-control" id="inputName" v-model="userData.user.name"></FieldValidate>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.user.identity==="company"'>
      <label for="inputCompany" class="col-sm-2 col-form-label">公司名稱 <span class="text-danger">*</span></label>
      <div class="col-sm-10">
        <FieldValidate name="公司名稱" :class="{'is-invalid': errors['公司名稱']}" :rules="{'required': userData.user.identity==='company'}"
        type="text" class="form-control" id="inputCompany" v-model="userData.user.companyName"></FieldValidate>
        <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.user.identity==="company"'>
      <label for="inputCompanyID" class="col-sm-2 col-form-label">統編 <span class="text-danger">*</span></label>
      <div class="col-sm-10">
        <FieldValidate name="統編" :class="{'is-invalid': errors['公司名稱']}" :rules="{'required': userData.user.identity==='company'}"
        type="number" class="form-control" id="inputCompanyID" v-model="userData.user.companyID"></FieldValidate>
        <ErrorMessage name="統編" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3">
      <label for="email" class="col-sm-2 col-form-label">Email <span class="text-danger">*</span></label>
      <div class="col-sm-10">
        <FieldValidate name="Email" :class="{ 'is-invalid': errors['Email'] }"
        rules="email|required"
        type="email" class="form-control" id="email" v-model="userData.user.email"></FieldValidate>
        <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.user.identity==="company"'>
      <label for="inputPhone" class="col-sm-2 col-form-label">公司電話 <span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <FieldValidate name="公司電話" :class="{ 'is-invalid': errors['公司電話'] }"
        :rules="{'required': userData.user.identity==='company'}"
        type="tel" class="form-control" id="inputPhone" v-model="userData.user.companyPhone"></FieldValidate>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputPhone" class="col-sm-2 col-form-label">聯絡電話 <span class="text-danger">*</span></label>
      <div class="col-sm-10">
        <FieldValidate name="聯絡電話" :class="{ 'is-invalid': errors['聯絡電話'] }"
        rules='required'
        type="tel" class="form-control" id="inputPhone" v-model="userData.user.tel"></FieldValidate>
        <ErrorMessage name="聯絡電話" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputAddress" class="col-sm-2 col-form-label"
        >捐款收據寄送地址 <span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <FieldValidate name="捐款收據寄送地址" :class="{ 'is-invalid': errors['捐款收據寄送地址'] }" rules='required'
        type="tel" class="form-control" id="inputAddress" v-model="userData.user.address"></FieldValidate>
        <ErrorMessage name="捐款收據寄送地址" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
    <div class="row mb-3">
      <label for="method" class="col-sm-2 col-form-label"
        >捐款方式 <span class="text-danger">*</span></label
      >
      <div class='col-sm-10'>
        <FieldValidate v-model='userData.user.method'
        as="select" name='捐款方式' :class="{ 'is-invalid': errors['捐款方式'] }" rules='required'
        class="form-select text-primary" aria-label="Default select example" id="method">
          <option selected value=''>捐款方式</option>
          <option value="信用卡">信用卡</option>
          <option value="ATM">ATM</option>
          <option value="超商代碼捐款">超商代碼捐款</option>
        </FieldValidate>
      <ErrorMessage name="捐款方式" class="invalid-feedback"></ErrorMessage>
      </div>
    </div>
  <router-link
    type="button"
    class="btn btn-primary mb-5"
    to="/cart"
    @click="clickNext('cart')"
    >上一步</router-link>
  <button type='submit' class="btn btn-primary float-end mb-5">下一步 結帳</button>
  </FormValidate>
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
          address: '',
          method: ''
        },
        message: ''
      },
      orderID: ''
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
            this.$router.push(`/cart/payment/${res.data.orderId}`)
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
