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
        <tr>
          <th scope="row" class="align-middle">
            <a href="#">#訂單編號</a>
            <p>@order date</p>
          </th>
          <td class="align-middle">
            <p>NTD amount</p>
            <p>商品總數量：3</p>
          </td>
          <td class="align-middle">已付款</td>
          <td class="align-middle">已出貨</td>
          <td></td>
        </tr>

        <tr>
          <th scope="row" class="align-middle">
            <a href="#">#訂單編號</a>
            <p>@order date</p>
          </th>
          <td class="align-middle">
            <p>NTD amount</p>
            <p>商品總數量：2</p>
          </td>
          <td class="align-middle">已付款</td>
          <td class="align-middle">已出貨</td>
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
      data: []
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
  methods: {
    async fetchUserOrders(userId) {
      try {
        const { data, statusText } = await usersAPI.getUserOrders({ userId });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        console.log(data);
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