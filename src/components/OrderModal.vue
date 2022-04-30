<template>
  <div ref='orderModal' class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-primary" id="exampleModalLabel">{{order?.user?.email}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h5 class='text-secondary my-4 ms-2'>捐款內容</h5>
        <table class="table">
          <thead></thead>
          <tbody>
            <tr v-for='(products, key) in order.products' :key='key+"products"'>
              <td v-for='(product, key) in products' :key='key+"product"'>{{product.title}}</td>
              <td>{{products.qty}}件</td>
              <th>＄{{products.total}}元</th>
            </tr>
          </tbody>
        </table>
        <h6 class='text-secondary mb-3 me-4 float-end'>共捐款 {{order.total}} 元</h6>
        <table class="table">
          <thead>
            <tr>
              <th scope="col"><h5>捐款者資料</h5></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>信箱</td>
              <td>{{order?.user?.email}}</td>
            </tr>
            <tr>
              <td>捐款身份</td>
              <td>{{order?.user?.companyID?'公司行號':'個人'}}</td>
            </tr>
            <tr>
              <td>捐款者手機</td>
              <td>{{order?.user?.tel}}</td>
            </tr>
            <tr>
              <td>捐款者姓名</td>
              <td>{{order?.user?.name}}</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>{{order?.user?.address}}</td>
            </tr>
            <tr v-if='order?.user?.identity==="company"'>
              <td>公司名稱與統編</td>
              <td>{{order?.user?.companyName}} / 統編：{{order?.user?.companyID}}</td>
            </tr>
            <tr v-if='order?.user?.identity==="company"'>
              <td>公司電話</td>
              <td>{{order?.user?.companyPhone}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">關閉</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    order: {}
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal (id) {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.orderModal, { keyboard: false, backdrop: false })
  }
}
</script>
