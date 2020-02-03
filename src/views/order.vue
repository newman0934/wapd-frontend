<template>
  <div class="container mt-4">
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="row">
      <div class="col-md-8">
        <h5>訂單編號#{{order.sn}}</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">商品名稱</th>
              <th scope="col">價格</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productItems" :key="product.id">
              <th scope="row">
                <img
                  :src="product.Images[0].url"
                  class="img-fluid"
                  alt="Responsive image"
                  width="150px"
                />
              </th>
              <td class="align-middle">
                {{product.name}}
                <p>尺寸:{{product.OrderItem.size}}, 顏色：{{product.OrderItem.color}}</p>
              </td>
              <td class="align-middle">{{product.sell_price | currency}}</td>
              <td class="align-middle">{{product.OrderItem.quantity}}</td>
              <td
                class="align-middle"
              >{{product.OrderItem.sell_price * product.OrderItem.quantity | currency}}</td>
            </tr>

            <tr class="table-light" style="border-top:3px gray solid;">
              <th></th>
              <td colspan="3">小計</td>
              <td>{{subtotal | currency}}</td>
            </tr>
            <tr class="table-light">
              <th></th>
              <td colspan="3">運費</td>
              <td>{{deliveryCost | currency}}</td>
            </tr>
            <tr v-if="coupon" class="table-light">
              <th></th>
              <td colspan="3">折扣 (折扣碼{{coupon.coupon_code}})</td>
              <td>-{{coupon.discount_amount | currency}}</td>
            </tr>
            <tr class="table-info">
              <th></th>
              <td colspan="3">總計</td>
              <td>{{order.totalPrice | currency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--訂購人資訊-->
      <div class="col-md-4">
        <h5>訂購資料</h5>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">收件人</th>
              <td>{{order.receiverName}}</td>
            </tr>
            <tr>
              <th scope="row">收件地址</th>
              <td>{{order.receiverAddress}}</td>
            </tr>
            <tr>
              <th scope="row">收件電話</th>
              <td>{{order.receiverPhone}}</td>
            </tr>
            <tr>
              <th scope="row">運送狀態</th>
              <td>{{order.shippingStatus==0? "尚未出貨": "其他"}}</td>
            </tr>
            <tr>
              <th scope="row">付款方式</th>
              <td>{{payment}}</td>
            </tr>
            <tr>
              <th scope="row">出貨時間</th>
              <td>@Date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import spinner from "./../components/spinner";
import { mapState } from "vuex";
import { currencyFilter } from "../utils/mixins";
import { Toast } from "./../utils/helpers";
export default {
  mixins: [currencyFilter],
  components: {
    spinner
  },
  data() {
    return {
      order: {
        id: 0,
        sn: "",
        totalPrice: 0,
        receiverName: "",
        receiverAddress: "",
        receiverPhone: "",
        shippingStatus: "",
        shippingMethod: "",
        paymentStatus: "",
        paymentMethod: ""
      },
      coupon: [],
      productItems: []
    };
  },
  computed: {
    ...mapState(["currentUser", "isLoading"]),
    subtotal() {
      return this.productItems.reduce(
        (t, p) => t + p.OrderItem.sell_price * p.OrderItem.quantity,
        0
      );
    },
    deliveryCost() {
      if (this.order.paymentStatus == 1) {
        return 100;
      } else {
        return 0;
      }
    },
    payment() {
      const methodsToChinese = {
        null: "尚未付款",
        CREDIT: "信用卡",
        CVSCOM: "超商貨到付款"
      };
      let method = this.order.paymentMethod;
      return methodsToChinese[method];
    }
  },
  created() {
    const { order_id } = this.$route.params;
    this.fetchUserOrder(order_id);
  },
  beforeRouteUpdate(to, from, next) {
    const { order_id } = to.params;
    this.fetchUserOrder(order_id);
    next();
  },
  methods: {
    async fetchUserOrder(orderId) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await usersAPI.getUserOrder({
          orderId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.order = {
          id: data.orders.id,
          sn: data.orders.sn,
          totalPrice: data.orders.total_price,
          receiverName: data.orders.receiver_name,
          receiverAddress: data.orders.address,
          receiverPhone: data.orders.phone,
          shippingStatus: data.orders.shipping_status,
          paymentStatus: data.orders.payment_status,
          paymentMethod: data.orders.payment_method
        };
        this.coupon = data.orders.Coupon;
        this.productItems = data.orders.items;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "暫時無法取得訂單資料，請稍後再試"
        });
      }
    }
  }
};
</script>
