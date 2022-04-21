<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to='/admin'>後台管理</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to='/admin/donate'>設定捐款項目</router-link>
          </li>
          <li class="nav-item d-flex">
            <a class="nav-link" @click='signout' style="cursor:pointer">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view v-if='checkSuccess'></router-view>
</template>
<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        const api = `${process.env.VUE_APP_API}/api/user/check`
        this.$http.post(api, { api_token: this.token })
          .then(res => {
            this.checkSuccess = true
          })
          .catch(err => {
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      alert('已登出')
      this.$router.push('/login')
    }
  }
}
</script>
