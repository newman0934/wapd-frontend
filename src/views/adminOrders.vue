<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>訂單列表</h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">訂購會員ID</th>
              <th scope="col">收件人</th>
              <th scope="col">收件人電話</th>
              <th scope="col">訂單編號</th>
              <th scope="col">價格</th>
              <th scope="col">付款方式</th>
              <th scope="col">付款狀態</th>
              <th scope="col">出貨狀態</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td scope="row">
                <router-link :to="{name:'adminOrder', params:{ order_id:order.id }}">{{order.id}}</router-link>
              </td>
              <td scope="row">{{order.UserId}}</td>
              <td scope="row">{{order.receiver_name}}</td>
              <td scope="row">{{order.phone}}</td>
              <td scope="row">{{order.sn}}</td>
              <td scope="row">{{order.total_price}}</td>
              <td scope="row">{{order.payment_method}}</td>
              <td scope="row">{{order.payment_status==1?"已付款":"未付款"}}</td>
              <td scope="row">{{order.shipping_status}}</td>
              <td scope="row">
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  @click.prevent.stop="postTransition(order)"
                >更新</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import ordersAPI from "./../apis/orders";
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
    this.fetchAdminOrders();
  },
  methods: {
    async fetchAdminOrders() {
      try {
        const { data, statusText } = await adminAPI.orders.get();
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.orders = data.orders;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得訂單資料"
        });
      }
    },
    async postTransition(order) {
      let amt = order.total_price;
      let sn = order.sn;
      try {
        const { statusText } = await ordersAPI.postTransition({
          amt,
          sn
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        await this.fetchAdminOrders();
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "暫無法更新訂單，請稍後再試"
        });
      }
    }
  }
};
</script>