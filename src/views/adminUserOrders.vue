<template>
  <div>
    <admin-nav></admin-nav>
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>
      <h3>{{user.name}}的訂單</h3>
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
              <td>尚未出貨</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mb-5">
        <button @click="goToBack()" class="btn btn-outline-success">回上一頁</button>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import spinner from "./../components/spinner";

export default {
  components: {
    adminNav,
    spinner
  },
  data() {
    return {
      user: {
        name: ""
      },
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
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    async fetchUserOrders(id) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.users.getOrder({
          id
        });

        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.user = {
          name: data.users.name
        };
        this.orders = data.users.orders;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得會員訂單"
        });
      }
    },
    goToBack() {
      this.$router.go(-1);
    }
  }
};
</script>