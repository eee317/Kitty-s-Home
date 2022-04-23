<template>
  <div class="modal fade" tabindex="-1" ref='deleteOrderModal' id="deleteOrderModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">確定要刪除？</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{order?.user?.email}}的捐款資料</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
          @click="deleteThisOrder"
          data-bs-target="#modalToggle" data-bs-toggle="modal"
          >確定</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalToggle"
  aria-hidden="true" aria-labelledby="modalToggleLabel" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalToggleLabel">刪除成功</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          已刪除 {{order?.user?.email}} 的捐款資料
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" aria-label="Close" data-bs-toggle="modal">確定</button>
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
    hideModal () {
      this.modal.hide()
    },
    deleteThisOrder () {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`
      this.$http
        .delete(url)
        .then(res => {
          this.$emit('get-order')
        })
        .catch(err => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.deleteOrderModal, { keyboard: true, backdrop: false })
  }
}
</script>
