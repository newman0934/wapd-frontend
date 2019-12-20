<template>
  <div class="container mt-4">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">總計</th>
          <th scope="col">付款狀態</th>
          <th scope="col">運送狀態</th>
          <th scope="col">備註</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th scope="row" class="align-middle">
            <router-link :to="{name:'order', params:{ order_id:order.id }}">#{{order.sn}}</router-link>
            <p>@order date</p>
          </th>
          <td class="align-middle">
            <p>NTD {{order.total_price}}</p>
            <p>商品總數量：{{order.OrderItems.length}}</p>
          </td>
          <td class="align-middle">{{order.payment_status}}</td>
          <td class="align-middle">{{order.shipping_status}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
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
      orders: []
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.fetchUserOrders(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
  },
  methods: {
    async fetchUserOrders(userId) {
      try {
        const { data, statusText } = await usersAPI.getUserOrders({ userId });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orders = data.orders;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot fetch user orders, please try later."
        });
      }
    }
  }
};
</script>