<template>
  <div ref='orderModal' class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{order?.user?.email}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
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
              <td>123</td>
            </tr>
            <tr>
              <td>捐款身份</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>捐款者手機</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>捐款者姓名</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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
