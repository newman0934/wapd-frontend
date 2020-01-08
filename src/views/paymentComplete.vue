<template>
  <div class="container py-5">
    <div class="alert alert-primary" role="alert">感謝您的訂購，確認信將會寄送到您的會員Email:{{buyer.email}}</div>
    <div class="row">
      <div class="col-md-8">
        <!--商品資訊-->
        <h5 class="text-left mt-3">結帳商品</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">商品名稱</th>
              <th scope="col">數量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderItems" :key="item.name">
              <th scope="row">
                <img
                  :src="item.images[0].url"
                  class="img-fluid"
                  alt="Responsive image"
                  width="150px"
                />
              </th>
              <td class="align-middle">{{item.name}}</td>
              <td class="align-middle">{{item.quantity}}</td>
            </tr>

            <tr class="table-light" style="border-top:3px gray solid;">
              <th></th>
              <td colspan="1">總付款金額(含運費及折扣)</td>
              <td>{{total | currency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4">
        <h5 class="text-left mt-3">收件人員</h5>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">姓名</th>
              <td>{{receiver.name}}</td>
            </tr>
            <tr>
              <th scope="row">手機號碼</th>
              <td>{{receiver.phone}}</td>
            </tr>
            <tr>
              <th scope="row">寄件地址</th>
              <td>{{receiver.address}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <button type="submit" class="btn btn-outline-secondary btn-block" @click="goHomePage">繼續購物</button>
  </div>
</template>
<script>
import cartsAPI from "./../apis/carts";
import { currencyFilter } from "../utils/mixins";
export default {
  mixins: [currencyFilter],
  data() {
    return {
      orderItems: [],
      total: 0,
      receiver: {
        name: "",
        phone: "",
        address: "",
        email: ""
      },
      buyer: {
        name: "",
        phone: "",
        address: ""
      }
    };
  },
  created() {
    const { Status, orderId } = this.$route.query;
    this.fetchPaymentComplete({ Status, orderId });
  },
  methods: {
    async fetchPaymentComplete({ Status, orderId }) {
      try {
        const { data, statusText } = await cartsAPI.getPaymentComplete({
          Status,
          orderId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orderItems = data.orderItems;
        this.total = data.total;
        this.receiver = {
          ...this.receiver,
          ...data.receiver
        };
        this.buyer = {
          ...this.buyer,
          ...data.buyer
        };
      } catch (error) {
        console.log(error);
      }
    },
    goHomePage() {
      return this.$router.push("/index");
    }
  }
};
</script>