<template>
  <div class="container py-5">
    <h1>My Cart</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">商品名稱</th>
          <th scope="col">價格</th>
          <th scope="col">數量</th>
          <th scope="col">小計</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">
            <img
              :src="product.images[0].url"
              class="img-fluid"
              alt="Responsive image"
              width="150px"
            />
          </th>
          <td class="align-middle">{{product.name}}</td>
          <td class="align-middle">NTD {{product.sell_price}}</td>
          <td class="align-middle">
            <input
              type="number"
              name="quentity"
              value="1"
              v-model="product.quantity"
              data-decimals="0"
              min="1"
              max="10"
              step="1"
            />
          </td>
          <td class="align-middle">NTD {{product.sell_price*product.quantity}}</td>
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.stop.prevent="deleteProduct(product.id)"
            >Ｘ</button>
          </td>
        </tr>
        <th scope="row"></th>
        <td colspan="3">小計</td>
        <td>NTD {{total}}</td>
      </tbody>
    </table>

    <button type="submit" class="btn btn-outline-secondary btn-block">CheckOut</button>
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
      products: [],
      totalPrice: 0
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    total() {
      return this.products.reduce((t, p) => t + p.sell_price * p.quantity, 0);
    }
  },
  created() {
    const { id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.fetchUserCart(id);
  },
  methods: {
    async fetchUserCart(userId) {
      try {
        const { data, statusText } = await usersAPI.getUserCart({ userId });
        this.products = data.userCart.cartItem;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "暫時無法取得使用者購物車資料，請稍後再試"
        });
      }
    },
    async deleteProduct(productId) {
      try {
        this.products = this.products.filter(
          product => product.id !== productId
        );
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "暫時無法移除該項商品，請稍後再試"
        });
      }
    }
  }
};
</script>