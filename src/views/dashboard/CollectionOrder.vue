<template>
  <div class="row justify-content-center">
    <div class="col-11">
      <button type="button" class="btn btn-outline-secondary css-button mt-5 float-end" @click='deleteAllModal'>刪除全部</button>
      <table class='table mt-4 text-center table-hover'>
        <thead>
          <tr>
            <th>捐款時間</th>
            <th>Email</th>
            <th>捐款方式</th>
            <th>捐款金額</th>
            <th>是否已捐款</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for='(order, key) in orders' :key='key+"order"'>
            <tr>
              <td v-if='order.user.method==="信用卡"'>
                {{order.create_at}}
              </td>
              <td v-else>
                -
              </td>
              <td>
                {{order.user.email}}
              </td>
              <td>
                {{order.user.method}}
              </td>
              <td>
                {{order.total}}
              </td>
              <td>
                {{order.is_paid?'是':'否'}}
              </td>
              <td>
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-gear-fill"></i>
                  </a>
                  <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item text-primary" href="#">編輯</a></li>
                    <li><a class="dropdown-item text-primary" href="#" @click.prevent='deleteThisOrder(order)'>刪除</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <delete-all-modal :environment="order" @get-order='getOrder' ref='deleteOrderAllModal'></delete-all-modal>
  <pagination-page :pages='pagination' @getOrder='getOrder'></pagination-page>
</template>
<style lang="scss" scoped>
  .dropdown-toggle::after {
      display: none;
  }
  .css-button {
    &:hover {
      color: white;
    }
  }
</style>
<script>
import deleteAllModal from '@/components/deleteAllModal.vue'
import paginationPage from '@/components/PaginationElement.vue'
export default {
  components: {
    paginationPage, deleteAllModal
  },
  data () {
    return {
      environment: 'order',
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
          console.log('orders', this.orders)
        })
        .catch(err => {
          console.dir(err)
        })
    },
    deleteThisOrder (order) {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`
      this.$http
        .delete(url)
        .then(res => {
          alert(`已刪除${order.user.email}`)
          this.getOrder()
        })
        .catch(err => {
          console.dir(err)
        })
    },
    deleteAllModal () {
      const deleteAllModal = this.$refs.deleteOrderAllModal
      deleteAllModal.openModal()
    }
  }
}
</script>
