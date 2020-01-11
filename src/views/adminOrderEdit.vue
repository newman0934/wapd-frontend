<template>
  <div class="adminOrderEdit">
    <admin-nav></admin-nav>
    <form action>
      <h3 class="container text-left">會員資料</h3>
      <div class="table-responsive-md">
        <table class="userInfo table container mb-5">
          <tbody>
            <tr>
              <td class="font-weight-bold">訂單編號</td>
              <td>{{order.sn}}</td>
              <td class="font-weight-bold">收件人</td>
              <td>
                <input
                  type="text"
                  v-model="order.receiverName"
                  name="name"
                  id="name"
                  class="name form-control"
                />
              </td>
              <td class="font-weight-bold">收件人電話</td>
              <td>
                <input
                  type="text"
                  v-model="order.receiverPhone"
                  name="phone"
                  id="phone"
                  class="phone form-control"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Email</td>
              <td>text@gmail.com</td>
              <td class="font-weight-bold">付款方式</td>
              <td>{{order.paymentMethod}}</td>
              <td class="font-weight-bold">付款狀態</td>
              <td>
                <select class="form-control" v-model="order.paymentStatus" disabled>
                  <option value="0">未付款</option>
                  <option value="1">付款成功</option>
                  <option value="2">付款失敗</option>
                  <option value="3">取消付款</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">配送方式</td>
              <td>{{order.shippingMethod}}</td>
              <td class="font-weight-bold">配送地址</td>
              <td>
                <input
                  type="text"
                  name="shippingAddress"
                  id="shippingAddress"
                  class="shippingAddress form-control"
                  v-model="order.receiverAddress"
                />
              </td>
              <td class="font-weight-bold">優惠券</td>
              <td>{{order.coupon}}</td>
            </tr>
          </tbody>
        </table>
        <div class="container">
          <h3 class="text-left">訂購商品</h3>
          <div class="table-responsive-md">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>商品編號</th>
                  <th>品名</th>
                  <th>顏色</th>
                  <th>尺寸</th>
                  <th>價格</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.ProductId">
                  <td>{{product.ProductId}}</td>
                  <td>{{product.ProductName}}</td>
                  <td>{{product.color}}</td>
                  <td>{{product.size}}</td>
                  <td>{{product.SellPrice}}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click.stop.prevent="handleDelete(product.ProductId)"
                    >刪除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="container text-right">
          <h3 class="my-2">
            原價：
            <span>{{originPrice}}</span>
          </h3>
          <h3 class="my-2">
            折扣：-
            <span>{{order.coupon}}</span>
          </h3>
          <h3 class="my-2">
            金額：
            <span>{{order.totalPrice}}</span>
          </h3>
        </div>
        <div class="container text-left">
          <h3>備註</h3>
          <div>{{order.comment}}</div>
        </div>
      </div>
      <div class="container">
        <a href="#" class="btn btn-outline-success mx-3 my-5" @click="$router.go(-1)">回上一頁</a>
        <router-link
          :to="{name:'adminOrderEdit', params:{id:$route.params.id}}"
          class="btn btn-outline-dark mx-3 my-5"
        >確認編輯</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "../utils/helpers";
export default {
  components: {
    adminNav
  },
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
        paymentMethod: "",
        comment: "",
        coupon: ""
      },
      products: [],
      originPrice: 0
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchAdminOrder(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchAdminOrder(id);
    next();
  },
  methods: {
    async fetchAdminOrder(id) {
      try {
        const { data, statusText } = await adminAPI.orders.getDetail({
          orderId: id
        });
        console.log(data);
        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        let sum = 0;
        let priceArray = data.order.orderItems.map(item => item.SellPrice);
        for (let i = 0; i < priceArray.length; i++) {
          sum += priceArray[i];
        }
        this.order = {
          id: data.order.id,
          sn: data.order.sn,
          totalPrice: data.order.total_price,
          receiverName: data.order.receiver_name,
          receiverAddress: data.order.address,
          receiverPhone: data.order.phone,
          shippingStatus: data.order.shipping_status,
          shippingMethod: data.order.shipping_method,
          paymentStatus: data.order.payment_status,
          paymentMethod: data.order.payment_method,
          comment: data.order.comment,
          coupon: data.order.coupon || 0
        };
        this.products = data.order.orderItems;
        this.originPrice = sum;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "取得訂單資料失敗"
        });
      }
    },
    handleDelete() {}
  }
};
</script>
<style scoped>
.userInfo tbody tr {
  border: none;
}

.adminOrder a {
  display: inline-block;
}
</style>