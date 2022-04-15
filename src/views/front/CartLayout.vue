<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
          <cartNavtabs></cartNavtabs>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-11">
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
