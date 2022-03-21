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
          <select class="form-select" :id="item.id+'selectModel'" @change="buttonStatus(item.id, 'buttonModel')">
            <option selected disabled>請選擇</option>
            <option :value="num" v-for='num in 20' :key='`${num}${item.id}selectModel`'>{{num}}</option>
          </select>
          <button type="button" class="btn btn-primary" :id='item.id+"buttonModel"' disabled @click='addCart(item.id, "model")'>加入捐款項目</button>
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
    hideModal (id) {
      this.modal.hide()
      const button = document.querySelector(`#${id}buttonModel`)
      const select = document.querySelector(`#${id}selectModel`)
      button.disabled = true
      select.value = '請選擇'
    },
    addCart (id, comments) {
      this.$emit('add-cart', id, comments)
    },
    buttonStatus (id, comments) {
      this.$emit('button-status', id, comments)
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, { keyboard: false })
  }
}
</script>
