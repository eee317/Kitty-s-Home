<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class='{disabled: !pages.has_pre}'
      class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('getOrder', 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class='{active:pages.current_page===page}'
      class="page-item" v-for='(page,key) in pages.total_pages' :key='key+"page"'>
        <a class="page-link" href="#" @click.prevent='updatePage(page)'>{{page}}</a>
      </li>
      <li class="page-item" :class='{disabled: !pages.has_next}'>
        <a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('getOrder', pages.total_pages)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('getOrder', page)
    }
  }
}
</script>
