<template>
  <div class="modal" tabindex="-1" ref="modal" id="donateModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{item.title}}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
          :style="{backgroundImage:`url(${item.imageUrl})`}"
          style="height: 300px; background-size: cover; background-position: center"></div>
          <p>{{item.content}}</p>
          <p>{{item.description}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">加入捐款項目</button>
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
    this.modal = new Modal(this.$refs.modal, { keyboard: false })
  }
}
</script>
