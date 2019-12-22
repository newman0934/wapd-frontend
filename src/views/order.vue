<template>
  <div class="container mt-4">
    <div class="row">
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
                  src="https://picsum.photos/id/1004/5616/3744"
                  class="img-fluid"
                  alt="Responsive image"
                  width="150px"
                />
              </th>
              <td class="align-middle">
                {{product.name}}
                <p>尺寸:{{product.OrderItem.size}}, 顏色：{{product.OrderItem.color}}</p>
              </td>
              <td class="align-middle">NTD {{product.sell_price}}</td>
              <td class="align-middle">{{product.OrderItem.quantity}}</td>
              <td class="align-middle">NTD {{product.OrderItem.sell_price}}</td>
            </tr>

            <tr class="table-light" style="border-top:3px gray solid;">
              <th></th>
              <td colspan="3">小計</td>
              <td>NTD I'm total</td>
            </tr>
            <tr class="table-light">
              <th></th>
              <td colspan="3">運費</td>
              <td>NTD amount</td>
            </tr>
            <tr class="table-light">
              <th></th>
              <td colspan="3">折扣 (折扣碼{{coupon.coupon_code}})</td>
              <td>NTD -{{coupon.discount_amount}}</td>
            </tr>
            <tr class="table-info">
              <th></th>
              <td colspan="3">總計</td>
              <td>NTD {{order.totalPrice}}</td>
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
              <td>{{order.shippingStatus}}</td>
            </tr>
            <tr>
              <th scope="row">付款方式</th>
              <td>{{order.paymentMethod}}</td>
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
/* eslint-disable */
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
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
    ...mapState(["currentUser"])
  },
  created() {
    const { id, order_id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.fetchUserOrder(id, order_id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id, order_id } = to.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.fetchUserOrder(id, order_id);
    next();
  },
  methods: {
    async fetchUserOrder(userId, orderId) {
      try {
        const { data, statusText } = await usersAPI.getUserOrder({
          userId,
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
        // console.log(data.orders.Coupon.coupon_code);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot fetch user order, please try later."
        });
      }
    }
  }
};
</script>