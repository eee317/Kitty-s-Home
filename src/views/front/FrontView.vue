<template>
  <frontNavbar></frontNavbar>
<div class="container">
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
