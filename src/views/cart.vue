<template>
  <div class="container py-5">
    <h1>My Cart</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">商品名稱</th>
          <th scope="col">價格</th>
          <th scope="col">
            數量
            <small class="text-muted">(雙擊修改數量)</small>
          </th>
          <th scope="col">小計</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <th scope="row">
            <router-link :to="{name:'product', params:{id:item.ProductId}}">
              <img :src="item.images[0].url" class="img-fluid" alt="Responsive image" width="150px" />
            </router-link>
          </th>
          <td class="align-middle">
            <router-link :to="{name:'product', params:{id:item.ProductId}}">{{item.name}}</router-link>
            <p>Color:{{item.color}}, Size:{{item.size}}</p>
          </td>
          <td class="align-middle">NTD {{item.sell_price}}</td>
          <td class="align-middle" @dblclick="editQty(item)">
            <div v-if="item.id === cacheItem.id">
              <form @submit.prevent.stop="putCartItem(item)">
                <div>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value="1"
                    v-model="cacheQty"
                    data-decimals="0"
                    min="1"
                    max="20"
                    step="1"
                  />
                </div>
                <button class="btn" type="submit">done</button>
              </form>
              <a @click.stop.prevent="cancelEdit()">cancel</a>
            </div>
            <div v-else>{{item.quantity}}</div>
          </td>
          <td class="align-middle">NTD {{item.sell_price*item.quantity}}</td>
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.stop.prevent="deleteCartItem(item.id)"
            >Ｘ</button>
          </td>
        </tr>
        <th scope="row"></th>
        <td colspan="3">小計</td>
        <td>NTD {{total}}</td>
      </tbody>
    </table>

    <form class="form-inline ml-3">
      <div class="form-group mx-sm-3">
        <label for="input-coupon" class="sr-only">輸入優惠序號</label>
        <input type="text" class="form-control" id="coupon" placeholder="Enter coupon code" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <button
      type="submit"
      class="btn btn-outline-secondary btn-block mt-3"
      @click.stop.prevent="postOrder"
    >結帳</button>
  </div>
</template>
<script>
import cartsAPI from "./../apis/carts";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      items: [],
      total: 0,
      cacheItem: {},
      cacheQty: 0,
      couponCode: ""
    };
  },
  async created() {
    const { id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    await this.$store.dispatch("fetchUserCart", id);
    this.items = this.cartItems;
    this.total = this.totalPrice;
  },
  computed: {
    ...mapState(["currentUser"]),
    cartItems() {
      return this.$store.state.cart;
    },
    totalPrice() {
      return this.items.reduce((t, p) => t + p.sell_price * p.quantity, 0);
    },
    cartData() {
      const { cacheQty } = this;
      return { quantity: cacheQty };
    },
    orderData() {
      const { couponCode } = this;
      return { couponCode };
    }
  },
  methods: {
    //刪除購物車商品及編輯購物車數量
    async deleteCartItem(itemId) {
      try {
        const { data, statusText } = await cartsAPI.deleteCartItem({ itemId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        //update vuex
        await this.$store.dispatch("fetchUserCart", this.currentUser.id);
        //render view
        this.items = this.items.filter(item => item.id !== itemId);
        Toast.fire({
          type: "success",
          title: "商品成功從購物車移除"
        });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "暫時無法移除該項商品，請稍後再試"
        });
      }
    },
    editQty(item) {
      this.cacheItem = item;
      this.cacheQty = item.quantity;
    },
    cancelEdit() {
      this.cacheItem = {};
      this.cacheQty = 0;
    },
    //修改購物車商品數量
    async putCartItem(item) {
      const userId = this.currentUser.id;
      let itemId = item.id;
      let cartData = this.cartData;
      try {
        const { data, statusText } = await cartsAPI.putCartItem({
          userId,
          itemId,
          cartData
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "商品更新成功"
        });
        //update vuex
        await this.$store.dispatch("fetchUserCart", userId);
        this.items = this.cartItems;
        this.total = this.totalPrice;
        //render view
        item.quantity = this.cacheQty;
        this.cacheItem = {};
        this.cacheQty = 0;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "暫時無法更新購物車，請稍後再試"
        });
      }
    },
    //成立訂單
    async postOrder() {
      let orderData = this.orderData;
      try {
        const { data, statusText } = await cartsAPI.postOrder({ orderData });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        const orderId = data.OrderId;
        //update vuex
        await this.$store.dispatch("fetchUserCart", this.currentUser.id);
        this.$router.push(`/orders/${orderId}/checkout`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>