<template>
  <div class="contianer">
    <div class="row justify-content-center">
      <div class="col-11">
        <button class="btn btn-primary float-end mt-3">建立捐款物品</button>
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
                        @click.prevent="openModal(order, 'edit')"
                        >編輯</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item text-primary"
                        href="#"
                        @click.prevent="openModal(order, 'delete')"
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
export default {
  components: {
    pagination
  },
  data () {
    return {
      paginationData: {},
      products: {}
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
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
