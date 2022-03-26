<template>
  <h2>購物車</h2>
  <cartNavtabs></cartNavtabs>
  <router-view></router-view>
</template>
<script>
import cartNavtabs from '@/components/CartNavtabs.vue'
export default {
  components: {
    cartNavtabs
  }
}
</script>
