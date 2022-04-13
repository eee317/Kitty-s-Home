<template>
<div class="container">
  <div class='p-4 bg-light mb-4'>
          <div class="border p-4 text-primary lh-lg text-center">
          <div>
            請至ATM匯款完成捐款
          </div>
          </div>
  </div>
  <div class="mb-4">
    <h2 class='text-primary'>ATM轉帳資訊</h2>
    <table class="table">
  <thead>
  </thead>
  <tbody>
    <tr>
      <th scope="row">銀行代碼</th>
      <td>004</td>
    </tr>
    <tr>
      <th scope="row">轉帳帳號</th>
      <td>TestAccount12345</td>
    </tr>
    <tr>
      <th scope="row">付款金額</th>
      <td>NT$400元</td>
    </tr>
    <tr>
      <th scope="row">有效繳費期限</th>
      <td>{{dateConversion()}} 23:59:59</td>
    </tr>
    <tr>
      <th scope="row">訂單編號</th>
      <td>20220401151635Er9y8rrvrm</td>
    </tr>
    <tr>
      <th scope="row">交易序號</th>
      <td>{{Date.now()}}</td>
    </tr>
  </tbody>
  </table>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    dateConversion () {
      const someDate = new Date()
      const numberOfDaysToAdd = 7
      someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
      const dd = someDate.getDate()
      const mm = someDate.getMonth() + 1
      const y = someDate.getFullYear()
      const someFormattedDate = y + ' / ' + mm + ' / ' + dd
      return someFormattedDate
    }
  },
  mounted () {
    this.dateConversion()
    console.log(this.dateConversion())
  }
}
</script>
