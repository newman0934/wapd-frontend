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
              <vue-load-image>
                <img
                  slot="image"
                  :src="item.images[0].url"
                  class="img-fluid"
                  alt="Responsive image"
                  width="150px"
                />
                <img slot="preloader" class="img-fluid" width="150px" src="./../static/loading.gif" />
                <div slot="error" class="img-fluid">圖片下載失敗</div>
              </vue-load-image>
            </router-link>
          </th>
          <td class="align-middle">
            <router-link :to="{name:'product', params:{id:item.ProductId}}">{{item.name}}</router-link>
            <p>Color:{{item.color}}, Size:{{item.size}}</p>
          </td>
          <td class="align-middle">{{item.sell_price | currency}}</td>
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
          <td class="align-middle">{{item.sell_price*item.quantity | currency}}</td>
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.stop.prevent="deleteCartItem(item.id)"
            >Ｘ</button>
          </td>
        </tr>
        <tr v-if="coupon.isValid">
          <th scope="row"></th>
          <td colspan="3">折扣碼({{coupon.coupon_code}})</td>
          <td>- {{coupon.discount_amount | currency}}</td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td colspan="3">小計</td>
          <td>{{total | currency}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <form class="form-inline ml-3">
      <div class="form-group mx-sm-3">
        <label for="input-coupon" class="sr-only">輸入優惠序號</label>
        <input
          type="text"
          class="form-control"
          v-model="couponCode"
          id="couponCode"
          name="couponCode"
          placeholder="輸入優惠序號"
        />
      </div>
      <button class="btn btn-outline-primary" @click.prevent.stop="postCoupon(couponCode)">使用</button>
    </form>

    <button
      class="btn btn-outline-secondary btn-block mt-3"
      @click.stop.prevent="postOrder()"
      :disabled="isProcessing"
    >結帳</button>
  </div>
</template>
<script>
import cartsAPI from "./../apis/carts";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import { currencyFilter } from "../utils/mixins";
import VueLoadImage from "vue-load-image";
export default {
  mixins: [currencyFilter],
  components: {
    "vue-load-image": VueLoadImage
  },
  data() {
    return {
      items: [],
      total: 0,
      cacheItem: {},
      cacheQty: 0,
      coupon: {
        id: -1,
        coupon_code: "",
        discount_amount: 0,
        isValid: false
      },
      couponCode: ""
    };
  },
  async created() {
    await this.$store.dispatch("fetchUserCart");
    this.items = this.cartItems;
    this.total = this.totalPrice;
  },
  computed: {
    ...mapState(["currentUser", "isProcessing"]),
    cartItems() {
      return this.$store.state.cart;
    },
    totalPrice() {
      let total = this.items.reduce((t, p) => t + p.sell_price * p.quantity, 0);
      if (total * 0.3 <= this.coupon.discount_amount) {
        Toast.fire({
          type: "error",
          title: "折扣碼已未達金額限制"
        });
        this.cleanCoupon();
      }
      return total - this.coupon.discount_amount;
    },
    cartData() {
      const { cacheQty } = this;
      return { quantity: cacheQty };
    },
    orderData() {
      return {
        formData: {
          couponCode: this.coupon.coupon_code
        }
      };
    }
  },
  methods: {
    cleanCoupon() {
      this.coupon.id = -1;
      this.coupon.coupon_code = "";
      this.coupon.discount_amount = 0;
      this.coupon.isValid = false;
    },
    //刪除購物車商品及編輯購物車數量
    async deleteCartItem(itemId) {
      try {
        const { data, statusText } = await cartsAPI.deleteCartItem({ itemId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        //update vuex
        await this.$store.dispatch("fetchUserCart");
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
      let itemId = item.id;
      let { quantity } = this.cartData;
      try {
        const { data, statusText } = await cartsAPI.putCartItem({
          itemId,
          quantity
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "商品更新成功"
        });
        //update vuex
        await this.$store.dispatch("fetchUserCart");
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
    async postCoupon(code) {
      const couponCode = code;
      if (!code) {
        Toast.fire({
          type: "error",
          title: "請輸入折扣碼後再試"
        });
        return;
      }
      try {
        const { data, statusText } = await cartsAPI.postCoupon({ couponCode });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        if (this.total * 0.3 <= data.CouponId.discount_amount) {
          Toast.fire({
            type: "error",
            title: "折扣碼條件不符，請確認後再試"
          });
          this.couponCode = "";
          return;
        }
        this.coupon = {
          ...this.coupon,
          ...data.CouponId,
          isValid: true
        };
        this.total = this.totalPrice;
        this.couponCode = "";
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "折扣碼有誤，請確認後再試"
        });
      }
    },
    //成立訂單
    async postOrder() {
      const { formData } = this.orderData;
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await cartsAPI.postOrder({ formData });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        const orderId = data.OrderId;
        //update vuex
        await this.$store.dispatch("fetchUserCart");
        this.$router.push(`/orders/${orderId}/checkout`);
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          type: "error",
          title: "Error"
        });
      }
    }
  }
};
</script>