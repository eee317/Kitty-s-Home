<template>
  <div class="modal fade" tabindex="-1" ref='addModal' id="addDonateModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{item}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class='text-center'>已加入捐款項目</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click='hideModal'>我知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    item: {}
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.addModal, { keyboard: false, backdrop: false })
  }
}
</script>
