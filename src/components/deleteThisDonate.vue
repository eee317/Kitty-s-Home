<template>
  <div class="modal fade" tabindex="-1" ref='deleteDonateModal' id="deleteDonateModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">確定要刪除？</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <p class='mt-3'>刪除「 {{donate.title}} 」捐款資料</p>
        </div>
        <div class="d-flex justify-content-between m-4">
          <button type="button" class="btn btn-secondary float-start text-white" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
          @click="deleteThisDonate"
          >確定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    donate: {}
  },
  methods: {
    openModal () {
      this.modal.show()
      console.log(this.donate)
    },
    hideModal () {
      this.modal.hide()
    },
    deleteThisDonate () {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.donate.id}`
      this.$http
        .delete(url)
        .then(res => {
          this.$emit('get-order')
          this.hideModal()
        })
        .catch(err => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.deleteDonateModal, { keyboard: true, backdrop: false })
  }
}
</script>
