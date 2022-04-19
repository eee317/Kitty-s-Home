<template>
  <div>
    <LoadingTool
      :active="isLoading"
      loader='dots'
      color='#7B5F3F'
      >
    </LoadingTool>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: Boolean
  }
}
</script>
