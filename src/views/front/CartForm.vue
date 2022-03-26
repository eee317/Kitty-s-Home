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
  <From>
     <ul class="list-unstyled">
            <li class="mb-3">
              <label for="email" class="form-label">
                <span class="text-danger">*</span>
                Email
              </label>
              <Field type="email" id="email" name="Email"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['Email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                inputmode="email"
                v-model="user.email"></Field>
              <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
            </li>
     </ul>
  </From>
  <form>
    <fieldset class="row mb-3">
      <legend class="col-form-label col-sm-2 pt-0">捐款單位</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gridRadios"
            id="gridRadios1"
            value="company"
            v-model='userData.identity'
          />
          <label class="form-check-label" for="gridRadios1">
            公司行號
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gridRadios"
            id="gridRadios2"
            value="personal"
            v-model='userData.identity'
          />
          <label class="form-check-label" for="gridRadios2">
            個人
          </label>
        </div>
      </div>
    </fieldset>
    <div class="row mb-3">
      <label for="inputName" class="col-sm-2 col-form-label">姓名</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputName" v-model="userData.user"/>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.identity==="company"'>
      <label for="inputCompany" class="col-sm-2 col-form-label">公司名稱</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputCompany" v-model="userData.companyName"/>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.identity==="company"'>
      <label for="inputCompanyID" class="col-sm-2 col-form-label">統編</label>
      <div class="col-sm-10">
        <input type="number" class="form-control" id="inputCompanyID" v-model="userData.companyID"/>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail3" v-model="userData.email"/>
      </div>
    </div>
    <div class="row mb-3" v-show='userData.identity==="company"'>
      <label for="inputPhone" class="col-sm-2 col-form-label"
        >公司電話</label
      >
      <div class="col-sm-10">
        <input type="tel" class="form-control" id="inputPhone" v-model="userData.companyPhone"/>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputPhone" class="col-sm-2 col-form-label"
        >聯絡電話</label
      >
      <div class="col-sm-10">
        <input type="tel" class="form-control" id="inputPhone" v-model="userData.tel"/>
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputAddress" class="col-sm-2 col-form-label"
        ><span class="text-danger">*</span>
        捐款收據寄送地址</label
      >
      <div class="col-sm-10">
        <input type="tel" class="form-control" id="inputAddress" v-model="userData.address"/>
      </div>
    </div>
  </form>
  <router-link
    type="button"
    class="btn btn-primary"
    to="/cart/form"
    @click="clickNext('cart')"
    >上一步</router-link
  >
  <router-link
    type="button"
    class="btn btn-primary float-end"
    to="/cart/payment"
    @click="clickNext('payment')"
    >下一步 結帳</router-link
  >
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: {},
      userData: {
        identity: '',
        companyPhone: '',
        companyName: '',
        companyID: '',
        user: '',
        email: '',
        tel: '',
        address: ''
      }
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    clickNext (text) {
      this.formChack()
      emitter.emit('clickNext', text)
    },
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
    formChack () {
      if (this.userData.identity === 'personal') {
        this.userData.companyPhone = ''
        this.userData.companyName = ''
        this.userData.companyID = ''
      }
    }
  }
}
</script>
