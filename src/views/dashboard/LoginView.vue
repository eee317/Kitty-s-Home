<template>
  <div class="container-fluid bg-light">
    <div class="row justify-content-center align-items-center" style="flex: 1;">
      <div class="col-10 col-6-md">
        <img
              style="cursor: pointer;"
              @click='homePage'
              class="img-fluid mt-5 mb-3"
              src="@/libs/LOGO.svg"
              alt=""
        />
        <FormValidate id="form"  v-slot="{ errors }" @submit="signin" class="form-signin">
          <div class="form-floating mb-3">
            <FieldValidate
              type="email"
              class="form-control text-primary"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              name='Email'
              rules="required"
              :class="{'is-invalid': errors['Email']}"
              v-model="user.username"
            ></FieldValidate>
            <label for="username" class='text-secondary'>Admin's Email</label>
          <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="form-floating">
            <FieldValidate
              type="password"
              class="form-control text-primary"
              id="password"
              placeholder="Password"
              required
              name='Password'
              rules="required"
              :class="{'is-invalid': errors['Password']}"
              v-model="user.password"
            ></FieldValidate>
            <label for="password" class='text-secondary'>Password</label>
            <ErrorMessage name="Password" class="invalid-feedback"></ErrorMessage>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            :disabled='Object.keys(errors).length > 0'
          >
            登入
          </button>
        </FormValidate>
        <p class="mt-5 text-center text-secondary">浪貓之家 2022&copy;</p>
      </div>
    </div>
  </div>
  <footer class="bg-secondary">
    <div
      class="
        p-3 p-md-5
        d-flex
        justify-content-center
        align-items-center
        flex-column
        text-center
        lh-lg
      "
    >
      <div class=''>
        <p class="text-white m-0">
        本站僅供個人作品使用
        </p>
        <a class="text-white me-2 fs-5" href="mailto:eee317@gmail.com"><i class="bi bi-google"></i></a>
        <a class='text-white ms-2 fs-5' href="https://github.com/eee317/Kitty-s-Home"><i class="bi bi-github"></i></a>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.container-fluid {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
      this.$http
        .post(apiUrl, this.user)
        .then(res => {
          console.log('signin', res)
          const { token, expired } = res.data
          document.cookie = `hexTokenHomework=${token}; expires=${new Date(
            expired
          )}; path=/`
          alert(res.data.message)
          this.$router.push('/admin')
        })
        .catch(err => {
          console.dir(err)
          alert('登入失敗，請確認信箱、密碼是否正確')
        })
    }
  }
}
</script>
