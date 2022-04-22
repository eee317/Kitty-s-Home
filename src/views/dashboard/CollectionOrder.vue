<template>
  <table class='table mt-4'>
    <thead>
      <tr>
        <th>捐款時間</th>
        <th>Email</th>
        <th>捐款款項</th>
        <th>捐款金額</th>
        <th>是否已捐款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template>
        <tr>
          <td>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <pagination-page :pages='pagination' @getOrder='getOrder'></pagination-page>
</template>
<script>
import paginationPage from '@/components/PaginationElement.vue'
export default {
  components: {
    paginationPage
  },
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {}
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    getOrder (currentPage = 1) {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.$http
        .get(url)
        .then(res => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          console.log(res)
        })
        .catch(err => {
          console.dir(err)
        })
    }
  }
}
</script>
