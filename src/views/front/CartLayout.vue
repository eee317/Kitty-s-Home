<template>
  <div class="container mt-5">
    <cartNavtabs></cartNavtabs>
    <div class="row justify-content-around">
      <div class="col-10">
      <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import cartNavtabs from '@/components/CartNavtabs.vue'
export default {
  components: {
    cartNavtabs
  }
}
</script>
