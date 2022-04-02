<template>
  <frontNavbar></frontNavbar>
<div class="container-fluid  g-0 min-vh-100">
<router-view></router-view>
</div>

</template>

<script>
import frontNavbar from '@/components/FrontNavbar.vue'
export default {
  components: {
    frontNavbar
  }
}
</script>
