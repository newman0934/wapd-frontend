<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit">
      <h5 class="text-left">結帳提醒</h5>
      <hr />
      <p class="text-left w-80 ml-3">＊請確認訂購的商品及顏色尺寸是否正確，訂單完成後若要修改請聯絡客服</p>
      <p class="text-left w-80 ml-3">＊訂單一旦取消後，若要再次購買，只能重新訂購，並以訂購當下官網顯示的商品價格及活動為主</p>
      <p class="text-left w-80 ml-3">＊若訂單顯示出貨中，表示已進入出貨流程，恕無法取消訂單</p>

      <div class="row">
        <div class="col-md-6">
          <h5 class="text-left">選擇物流</h5>
          <hr />
          <div class="ml-3 text-left">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="deliverToHome"
                  id="deliverToHome"
                  value="0"
                  v-model="deliver"
                />
                宅配
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="deliverToShop"
                  id="deliverToShop"
                  value="1"
                  v-model="deliver"
                />
                超商取貨
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="payToShop"
                  id="payToShop"
                  value="2"
                  v-model="deliver"
                />
                超商取貨付款
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h5 class="text-left">選擇金流</h5>
          <hr />
          <div class="ml-3 text-left">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="payOnline"
                  id="payOnline"
                  value="spgateway"
                  v-model="payment"
                />
                藍新金流
              </label>
            </div>
          </div>
        </div>
      </div>

      <h5 class="text-left mt-3">結帳商品</h5>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">商品名稱</th>
            <th scope="col">價格</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.orderItem.id">
            <th scope="row">
              <vue-load-image>
                <img
                  slot="image"
                  :src="order.images[0].url"
                  class="img-fluid"
                  alt="Responsive image"
                  width="150px"
                />
                <img slot="preloader" class="img-fluid" width="150px" src="./../static/loading.gif" />
                <div slot="error" class="img-fluid">圖片下載失敗</div>
              </vue-load-image>
            </th>
            <td class="align-middle">
              {{ order.productName }}
              <p>
                Color:{{ order.orderItem.color }}, Size:{{
                order.orderItem.size
                }}
              </p>
            </td>
            <td class="align-middle">{{ order.orderItem.sell_price | currency}}</td>
            <td class="align-middle">{{ order.orderItem.quantity }}</td>
            <td class="align-middle">{{ order.subtotal | currency}}</td>
          </tr>

          <tr class="table-light" style="border-top:3px gray solid;">
            <th></th>
            <td colspan="3">小計</td>
            <td>{{ orderSubTotal | currency}}</td>
          </tr>
          <tr class="table-light">
            <th></th>
            <td colspan="3">運費</td>
            <td>{{ deliverCost | currency}}</td>
          </tr>
          <tr class="table-light">
            <th></th>
            <td colspan="3">折扣</td>
            <td>-{{ couponDiscount | currency}}</td>
          </tr>
          <tr class="table-info">
            <th></th>
            <td colspan="3">總計</td>
            <td>{{ amount | currency}}</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-md-6">
          <h5 class="text-left mt-3">
            訂購人員
            <small class="text-muted">*訂單完成信件將會寄送至會員信箱，如已更改請至會員專區修改。</small>
          </h5>
          <hr />
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row"></th>
                <td class="d-flex">
                  <button
                    class="btn btn-outline-success btn-sm"
                    @click.prevent.stop="updateUser()"
                    :disabled="isProcessing"
                  >同步更新會員資料</button>
                </td>
              </tr>
              <tr>
                <th scope="row">姓名</th>
                <td>
                  <input
                    type="text"
                    id="order-name"
                    v-model="user.name"
                    name="orderName"
                    class="form-control"
                    placeholder="name"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">手機號碼</th>
                <td>
                  <ValidationProvider
                    :rules="{ regex: /^\(?(\d{2})\)?[\s\-]?(\d{4})\-?(\d{4})$/ }"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      id="order-phone"
                      v-model="user.phone"
                      name="orderPhone"
                      class="form-control"
                      placeholder="phone number"
                    />
                    <span class="d-flex">
                      <small class="text-danger">{{ errors[0] }}</small>
                    </span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th scope="row">連絡地址</th>
                <td>
                  <input
                    type="text"
                    id="order-address"
                    v-model="user.address"
                    name="orderAddress"
                    class="form-control"
                    placeholder="address"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <h5 class="text-left mt-3">收件人員</h5>
          <hr />
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row"></th>
                <td class="d-flex">
                  <input
                    type="checkbox"
                    class="mr-2"
                    v-model="receiver.checked"
                    @click="includeReceiverData(receiver.checked)"
                  />
                  收件人同訂購人員
                </td>
              </tr>
              <tr>
                <th scope="row">姓名</th>
                <td>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      id="receiver-name"
                      v-model="receiver.name"
                      name="receiverName"
                      class="form-control"
                      placeholder="name"
                    />
                    <span class="d-flex">
                      <small class="text-danger">{{ errors[0] }}</small>
                    </span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th scope="row">手機號碼</th>
                <td>
                  <ValidationProvider
                    :rules="{ required: { allowFalse: false }, regex: /^\(?(\d{2})\)?[\s\-]?(\d{4})\-?(\d{4})$/ }"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      id="receiver-phone"
                      v-model="receiver.phone"
                      name="receiverPhone"
                      class="form-control"
                      placeholder="phone number"
                    />
                    <span class="d-flex">
                      <small class="text-danger">{{ errors[0] }}</small>
                    </span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th scope="row">寄件地址</th>
                <td>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      id="receiver-address"
                      v-model="receiver.address"
                      name="receiverAddress"
                      class="form-control"
                      placeholder="address"
                    />
                    <span class="d-flex">
                      <small class="text-danger">{{ errors[0] }}</small>
                    </span>
                  </ValidationProvider>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button type="submit" class="btn btn-outline-secondary btn-block">確認訂單</button>
    </form>
  </div>
</template>
<script>
import { ValidationProvider } from "vee-validate";
import cartsAPI from "./../apis/carts";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import { currencyFilter } from "../utils/mixins";
import VueLoadImage from "vue-load-image";

export default {
  mixins: [currencyFilter],
  components: {
    ValidationProvider,
    "vue-load-image": VueLoadImage
  },
  data() {
    return {
      orders: [],
      orderSubTotal: 0,
      couponDiscount: 0,
      shippingTotal: 0,
      total: 0,
      user: {
        name: "",
        phone: "",
        address: ""
      },
      receiver: {
        name: "",
        phone: "",
        address: "",
        checked: false
      },
      deliver: "0",
      payment: "spgateway"
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchCheckout(id);
    this.user.name = this.currentUser.name;
    this.user.phone = this.currentUser.phone;
    this.user.address = this.currentUser.address;
  },
  computed: {
    ...mapState(["currentUser", "isProcessing"]),
    amount() {
      if (this.deliver == 0) {
        return this.total + 100;
      } else {
        return this.total;
      }
    },
    deliverCost() {
      if (this.deliver == 0) {
        return this.shippingTotal + 100;
      } else {
        return this.shippingTotal;
      }
    },
    userData() {
      return {
        formData: {
          name: this.user.name,
          phone: this.user.phone,
          address: this.user.address,
          email: this.currentUser.email
        }
      };
    },
    formData() {
      return {
        receiverName: this.receiver.name,
        receiverPhone: this.receiver.phone,
        receiverAddress: this.receiver.address,
        total: this.amount,
        orderId: this.$route.params.id,
        deliver: this.deliver
      };
    }
  },
  methods: {
    async fetchCheckout(orderId) {
      try {
        const { data, statusText } = await cartsAPI.getCheckout({ orderId });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orders = data.orderItems;
        this.orderSubTotal = data.orderSubTotal;
        this.couponDiscount = data.couponDiscount;
        this.shippingTotal = data.shippingTotal;
        this.total = data.total;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得訂單資訊，請稍後再試"
        });
      }
    },
    async updateUser() {
      const { formData } = this.userData;
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await usersAPI.putUser({ formData });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          icon: "success",
          title: "使用者資料更新成功"
        });
        await this.$store.dispatch("updateCurrentUser", formData);
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試"
        });
      }
    },
    includeReceiverData(checked) {
      if (checked == false) {
        this.receiver.name = this.user.name;
        this.receiver.phone = this.user.phone;
        this.receiver.address = this.user.address;
      } else {
        this.receiver.name = "";
        this.receiver.phone = "";
        this.receiver.address = "";
      }
    },
    async handleSubmit() {
      const formData = this.formData;
      const orderId = this.$route.params.id;
      if (
        !this.receiver.name ||
        !this.receiver.phone ||
        !this.receiver.address
      ) {
        Toast.fire({
          icon: "error",
          title: "收件人相關資訊皆需填寫"
        });
        return;
      }
      try {
        const { data } = await cartsAPI.postCheckout({ formData });
        if (data.status === "success") {
          this.$router.push(`/orders/${orderId}/payment`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
