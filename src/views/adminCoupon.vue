<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>優惠碼列表</h1>
        <form class="my-4">
          <div class="form-row">
            <div class="col-auto">
              <h3>新增折扣：</h3>
            </div>
            <div class="col-auto">
              <input v-model="newCouponCode" type="text" class="form-control" placeholder="請輸入折扣碼" />
            </div>
            <div class="col-auto">
              <input
                v-model="newCouponAmount"
                type="number"
                class="form-control"
                placeholder="請輸入折扣金額"
              />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.stop.prevent="createCoupon"
                :disabled="isProcessing"
              >確認新增</button>
            </div>
          </div>
        </form>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">coupon code</th>
              <th scope="col">折扣金額</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id">
              <td scope="row">{{coupon.id}}</td>
              <td scope="row">{{coupon.coupon_code}}</td>
              <td scope="row">{{coupon.discount_amount}}</td>
              <td scope="row">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click.stop.prevent="deleteCoupon(coupon.id)"
                  :disabled="isProcessing"
                >刪除</button>
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

export default {
  components: {
    adminNav
  },
  data() {
    return {
      coupons: [],
      newCouponCode: "",
      newCouponAmount: ""
    };
  },
  created() {
    this.fetchCoupons();
  },
  computed: {
    isProcessing() {
      return this.$store.state.isProcessing;
    }
  },
  methods: {
    async fetchCoupons() {
      try {
        const { data, statusText } = await adminAPI.coupons.get();
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.coupons = data.coupons;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "取得優惠碼資料失敗"
        });
      }
    },
    async createCoupon() {
      try {
        if (!this.newCouponCode || !this.newCouponAmount) {
          Toast.fire({
            icon: "warning",
            title: "請輸入優惠碼編號跟金額"
          });
          return;
        }
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await adminAPI.coupons.post({
          couponCode: this.newCouponCode,
          discountAmount: this.newCouponAmount
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }

        this.coupons.push({
          ...data.coupons
        });

        this.newCouponCode = "";
        this.newCouponAmount = "";
        this.fetchCoupons();
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "新增優惠碼失敗"
        });
      }
    },
    async deleteCoupon(couponId) {
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await adminAPI.coupons.delete({
          id: couponId
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }

        this.coupons = this.coupons.filter(coupon => coupon.id !== couponId);
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "刪除優惠碼失敗"
        });
      }
    }
  }
};
</script>