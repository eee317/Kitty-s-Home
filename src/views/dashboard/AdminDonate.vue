<template>
  <div class="contianer">
    <div class="row justify-content-center">
      <div class="col-11">
        <button class="btn btn-primary float-end mt-3" @click='openModal("", "new")'>建立捐款物品</button>
        <table class="table text-center">
          <thead>
            <tr>
              <th>名稱</th>
              <th>分類</th>
              <th>捐款額</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(product, key) in products' :key='key+"product"'>
              <td>{{product.title}}</td>
              <td>{{product.category}}</td>
              <td>{{product.origin_price}}</td>
              <td>{{product.is_enabled?'啟用':'不啟用'}}</td>
              <td>
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-gear-fill css-text"></i>
                  </a>
                  <ul
                    class="dropdown-menu text-center"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a
                        class="dropdown-item text-primary"
                        href="#"
                        @click.prevent="openModal(product, 'edit')"
                        >編輯</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item text-primary"
                        href="#"
                        @click.prevent="openModal(product, 'delete')"
                        >刪除</a
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <pagination :pages='paginationData' @get-order='getProducts'></pagination>
  <delete-donate :donate='tempProduct' @get-order='getProducts' ref='deleteDonateModal'></delete-donate>
  <edit-modal :donate='tempProduct' ref='editModal' @get-order='getProducts' :state='state'></edit-modal>
</template>
<style lang="scss" scoped>
  .dropdown-toggle::after {
      display: none;
  }
  .css-text {
    line-height: 45px;
  }
</style>
<script>
import pagination from '@/components/PaginationElement.vue'
import editModal from '@/components/EditDonate.vue'
import deleteDonate from '@/components/deleteThisDonate.vue'
export default {
  components: {
    pagination, deleteDonate, editModal
  },
  data () {
    return {
      paginationData: {},
      products: {},
      tempProduct: {},
      state: true
    }
  },
  methods: {
    getProducts (currentPage = 1) {
      const api = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/products?page=${currentPage}`
      this.$http.get(api)
        .then(res => {
          console.log(res)
          this.products = res.data.products
          this.paginationData = res.data.pagination
        })
        .catch(err => {
          console.log(err)
        })
    },
    openModal (product, state) {
      if (state === 'delete') {
        this.tempProduct = { ...product }
        const deleteDonateModal = this.$refs.deleteDonateModal
        deleteDonateModal.openModal()
      } else if (state === 'edit') {
        this.tempProduct = JSON.parse(JSON.stringify(product))
        const editModal = this.$refs.editModal
        this.state = false
        editModal.openModal()
      } else if (state === 'new') {
        this.tempProduct = {}
        this.state = true
        const editModal = this.$refs.editModal
        editModal.openModal()
      }
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
