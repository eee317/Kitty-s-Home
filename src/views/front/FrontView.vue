<template>
  <frontNavbar></frontNavbar>
  <div class="container-fluid g-0 min-vh-100">
    <router-view></router-view>
  </div>
  <footer class="bg-secondary" style="">
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
        <a class='text-white ms-2 fs-5' href="https://github.com/eee317"><i class="bi bi-github"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
import frontNavbar from '@/components/FrontNavbar.vue'
export default {
  components: {
    frontNavbar
  }
}
</script>
