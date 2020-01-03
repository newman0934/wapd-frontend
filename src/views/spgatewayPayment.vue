<template>
  <div id="spgateway-payment">
    <h1>您即將進入藍新支付頁面，請確認以下資訊：</h1>
    <p>訂單編號: {{ orderId }}</p>
    <p>訂購人email: {{ email }}</p>
    <p>訂單總額: {{ total }}</p>
    <!-- 藍新資料 -->
    <form name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
      <input type="hidden" name="MerchantID" :value="tradeInfo.MerchantID" />
      <input type="hidden" name="TradeInfo" :value="tradeInfo.TradeInfo" />
      <input type="hidden" name="TradeSha" :value="tradeInfo.TradeSha" />
      <input type="hidden" name="Version" :value="tradeInfo.Version" />
      <button type="submit">進入藍新支付頁面</button>
    </form>
    <!-- 藍新資料 -->
  </div>
</template>

<script>
import cartsAPI from '../apis/carts'
export default {
  name: 'spgatewayPayment',
  data() {
    return {
      tradeInfo: {},
      total: 0,
      orderId: 0,
      email: ''
    }
  },
  methods: {
    async fetchPayment(orderId) {
      const { data } = await cartsAPI.getPayment(orderId)
      this.tradeInfo = data.tradeInfo
      this.total = data.total
      this.orderId = data.orderId
      this.email = data.email
      console.log(data)
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchPayment(id)
  }
}
</script>
