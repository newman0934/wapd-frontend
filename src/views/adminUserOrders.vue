<template>
  <div>
    <admin-nav></admin-nav>
    <h3>Bernard的訂單</h3>
    <div class="table-responsive-md">
      <table class="table table-striped container mb-3">
        <thead class="thead-dark">
          <tr>
            <th>訂單編號</th>
            <th>總計</th>
            <th>付款狀態</th>
            <th>運送狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{order.sn}}</td>
            <td>{{order.total_price}}</td>
            <td>{{order.payment_status}}</td>
            <td>{{order.shipping_status}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-5">
      <a href="#" class="btn btn-outline-primary">回上一頁</a>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
export default {
  components: {
    adminNav
  },
  data() {
    return {
      orders: []
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserOrders(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUserOrders(id);
    next();
  },
  methods: {
    async fetchUserOrders(id) {
      try {
        const { data, statusText } = await adminAPI.users.getOrder({
          id
        });

        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orders = data.users.orders;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得會員訂單"
        });
      }
    }
  }
};
</script>