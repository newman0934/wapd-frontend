<template>
  <div class="container py-5">
    <div id="spgateway-payment">
      <h1>您即將進入藍新支付頁面：</h1>
      <div>
        <p>訂單編號: {{ orderId }}</p>
        <p>日期:{{date |timeFormate}}</p>
        <p>訂單總額: {{ total }}</p>
        <p>付款方式: 藍新金流第三方金流平台</p>
      </div>
      <!-- 藍新資料 -->
      <form id="Spgateway" name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
        <input type="hidden" name="MerchantID" :value="tradeInfo.MerchantID" />
        <input type="hidden" name="TradeInfo" :value="tradeInfo.TradeInfo" />
        <input type="hidden" name="TradeSha" :value="tradeInfo.TradeSha" />
        <input type="hidden" name="Version" :value="tradeInfo.Version" />
        <small>
          三秒後會自動跳轉到藍新金流支付頁面，或者按下方按鈕直接前往...
          <font-awesome-icon icon="comment-dollar" size="3x" class="mt-4" />
        </small>
        <br />
        <button type="submit" class="btn btn-lg btn-outline-secondary btn-sm mt-1">前往 藍新金流 支付頁面</button>
      </form>
      <!-- 藍新資料 -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import cartsAPI from "../apis/carts";
import { timeFilter } from "../utils/mixins";
export default {
  mixins: [timeFilter],
  name: "spgatewayPayment",
  data() {
    return {
      tradeInfo: {},
      total: 0,
      orderId: 0,
      email: ""
    };
  },
  computed: {
    date() {
      return Date();
    }
  },
  methods: {
    async fetchPayment(orderId) {
      try {
        const { data, statusText } = await cartsAPI.getPayment(orderId);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.tradeInfo = data.tradeInfo;
        this.total = data.total;
        this.orderId = data.orderId;
        this.email = data.email;
        setTimeout(function() {
          $(document).ready(function() {
            document.Spgateway.submit();
          });
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    const { id } = this.$route.params;
    await this.fetchPayment(id);
  }
};
</script>
