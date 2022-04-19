<template>
  <div class="container-fluid animated fadeIn">
    <div class="position-relative img-fluid" style='height:400px; background-size: cover; background-position: center;
    background-image:url("https://images.unsplash.com/photo-1545529468-42764ef8c85f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80")'>
      <div class='position-absolute top-50 start-50 translate-middle'>
        <div class="d-flex justify-content-center">
          <h1 style='color: white; text-shadow: black 0.0em 0.05em 0.2em;'
          class="fs-4 fs-md-3 ls-md-5 fw-normal text-center"
          >
          你的關懷，可以讓牠們看到明天的陽光
          </h1>
        </div>
        <div class='d-flex justify-content-center'>
          <button @click='clickDonateItemPage'
          style='width:200px;'
          class="css-button btn btn-outline-secondary mt-4 p-2"
          >捐款</button>
        </div>
      </div>
    </div>
    <div class="container g-3">
      <h3 class='d-flex justify-content-center m-5 text-primary'>您給予支持，我用心扶養</h3>
      <div class="row mb-5">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid"
            src="https://images.unsplash.com/photo-1571570703598-39eb580a0329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
            alt=""
          />
        </div>
        <div
          class="
            col-12 col-md-6
            p-3 p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg
          "
        >
          <h4 class="fs-5 text-secondary">給予安心的環境</h4>
          <p class='text-secondary'>使用善款安排舒服的環境
          <br />
          給予貓咪適合的生活空間
          <br />
          新舊貓咪和諧相處</p>
        </div>
      </div>
      <div class="row g-3 mb-5 flex-md-row-reverse">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid"
            src="https://media.istockphoto.com/photos/veterinarian-at-vet-clinic-listens-to-tabby-cute-kitten-with-sad-picture-id1261819679?k=20&m=1261819679&s=612x612&w=0&h=_cNUr0Bec79VF9jLqQ7_yzxFQKX7XwfP0yPkt577UJE="
            alt=""
          />
        </div>
        <div
          class="
            col-12 col-md-6
            p-3 p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg
          "
        >
          <h4 class="fs-5 text-secondary">善款金額不浪費</h4>
          <p class='text-secondary'>不浪費每一分捐款
          <br />
          妥善地用來醫治浪貓
          <br />
          並且為他們安排健康的環境</p>
        </div>
      </div>
    </div>
  </div>
  <loadingPage :isLoading='isLoading'></loadingPage>
</template>
<style lang="scss" scoped>
.css-button {
  &:hover {
    color: white;
    -webkit-animation: pulse 1s;
    animation: pulse 1s;
  }
}
</style>
<script>
export default {
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    clickDonateItemPage () {
      this.$router.push('/donate')
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 800)
  }
}
</script>
