<template>
  <div class="adminOrder">
    <admin-nav></admin-nav>
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>
      <div class="table-responsive-md">
        <h3 class="text-left container">會員資料</h3>
        <table class="userInfo table container mb-5">
          <tbody>
            <tr>
              <td class="font-weight-bold">訂單編號</td>
              <td>{{order.sn}}</td>
              <td class="font-weight-bold">收件人姓名</td>
              <td>{{order.receiverName}}</td>
              <td class="font-weight-bold">收件人電話</td>
              <td>{{order.receiverPhone}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">付款方式</td>
              <td>{{order.paymentMethod}}</td>
              <td class="font-weight-bold">付款狀態</td>
              <td>{{order.paymentStatus}}</td>
              <td class="font-weight-bold">配送狀態</td>
              <td>{{order.shippingStatus}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">配送方式</td>
              <td>{{order.shippingMethod}}</td>
              <td class="font-weight-bold">配送地址</td>
              <td>{{order.receiverAddress}}</td>
              <td class="font-weight-bold">優惠券</td>
              <td>{{coupon.coupon_code}}</td>
            </tr>
          </tbody>
        </table>
      </div>

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
                <th>數量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in productItems" :key="product.ProductId">
                <td>{{product.ProductId}}</td>
                <td>{{product.ProductName}}</td>
                <td>{{product.color}}</td>
                <td>{{product.size}}</td>
                <td>{{product.SellPrice}}</td>
                <td>{{product.quantity}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="container text-right">
          <h3 class="my-2">
            原價：
            <span>{{originPrice}}</span>
          </h3>
          <h3 class="my-2">
            折扣：-
            <span>{{coupon.discount_amount}}</span>
          </h3>
          <h3 class="my-2">
            運費：
            <span>{{freight}}</span>
          </h3>
          <h3 class="my-2">
            總計：
            <span>{{order.totalPrice}}</span>
          </h3>
        </div>
        <!-- <div class="container text-left">
          <h3>備註</h3>
          <div>{{order.comment}}</div>
        </div> -->
      </div>
      <div class="container">
        <button @click="goToBack" class="btn btn-outline-success mx-3 my-5">回上一頁</button>
        <router-link
          :to="{name:'adminOrderEdit', params:{id:order.id}}"
          class="btn btn-outline-dark mx-3 my-5"
        >編輯訂單</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import spinner from "./../components/spinner";
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
export default {
  components: {
    adminNav,
    spinner
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
        comment: ""
      },
      coupon: 0,
      productItems: [],
      originPrice: 0,
      freight: 0
    };
  },
  created() {
    const { order_id } = this.$route.params;
    this.fetchAdminOrder(order_id);
  },
  beforeRouteUpdate(to, from, next) {
    const { order_id } = to.params;
    this.fetchAdminOrder(order_id);
    next();
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    async fetchAdminOrder(orderId) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.orders.getDetail({
          orderId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        let sum = 0;
        let priceArray = data.order.orderItems.map(item => {
          return item.SellPrice * item.quantity;
        });
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
          comment: data.order.comment
        };
        this.coupon = data.order.coupon || {
          coupon_code: "沒有使用優惠卷",
          discount_amount: 0
        };
        this.productItems = data.order.orderItems;
        this.originPrice = sum;
        if (data.order.shipping_method === "0") {
          this.freight = 100;
        } else {
          this.freight = 0;
        }
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得訂單詳細資訊"
        });
      }
    },
    goToBack() {
      this.$router.go(-1);
    }
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