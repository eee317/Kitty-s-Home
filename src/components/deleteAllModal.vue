<template>
  <div class="modal fade" tabindex="-1" ref='deleteAllModal' id="deleteAllModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class='text-center p-4'>
            <h5 class='text-primary'>
              確定要刪除全部？
            </h5>
          </div>
          <div class='d-flex justify-content-between mt-4'>
            <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal" @click='hideModal'>取消</button>
            <button type="button" class="btn btn-primary" @click='isWhere'>確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emitter from '@/libs/emitter'
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: { environment: {} },
  data () {
    return {
      url: ''
    }
  },
  methods: {
    isWhere () {
      if (this.environment === 'cart') {
        this.url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/carts`
      } else {
        this.url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/orders/all`
      }
      this.deleteCartAll()
    },
    deleteCartAll () {
      this.$http.delete(this.url)
        .then(res => {
          if (this.environment === 'cart') {
            this.$emit('get-cart')
            emitter.emit('render-cart')
          } else {
            this.$emit('get-order')
          }
          this.hideModal()
        })
        .catch(err => {
          console.log(err)
        })
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.deleteAllModal, { keyboard: false, backdrop: false })
  }
}
</script>
