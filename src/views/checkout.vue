<template>
  <div class="container py-5">
    <form>
      <h5 class="text-left">結帳提醒</h5>
      <hr />
      <p class="text-left w-80 ml-3">＊請確認訂購的商品及顏色尺寸是否正確，訂單完成後若要修改請聯絡客服</p>
      <p class="text-left w-80 ml-3">＊訂單一旦取消後，若要再次購買，只能重新訂購，並以訂購當下官網顯示的商品價格及活動為主</p>
      <p class="text-left w-80 ml-3">＊若訂單顯示出貨中，表示已進入出貨流程，恕無法取消訂單</p>

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
              value="option1"
            />
            宅配
          </label>
        </div>
        <!-- <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="pay-by-atm" id="atm" value="option1" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>-->
      </div>

      <h5 class="text-left mt-3">選擇金流</h5>
      <hr />
      <div class="ml-3 text-left">
        <div class="form-check">
          <label class="form-check-label">
            <input
              type="radio"
              class="form-check-input"
              name="payOnline"
              id="payOnline"
              value="option2"
            />
            線上刷卡
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input
              type="radio"
              class="form-check-input"
              name="payByAtm"
              id="payByAtm"
              value="option3"
            />
            ATM轉帳
          </label>
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
              <img
                :src="order.images[0].url"
                class="img-fluid"
                alt="Responsive image"
                width="150px"
              />
            </th>
            <td class="align-middle">
              {{order.productName}}
              <p>Color:{{order.orderItem.color}}, Size:{{order.orderItem.size}}</p>
            </td>
            <td class="align-middle">NTD {{order.orderItem.sell_price}}</td>
            <td class="align-middle">{{order.orderItem.quantity}}</td>
            <td class="align-middle">NTD {{order.subtotal}}</td>
          </tr>

          <tr class="table-light" style="border-top:3px gray solid;">
            <th></th>
            <td colspan="3">小計</td>
            <td>NTD {{orderSubTotal}}</td>
          </tr>
          <tr class="table-light">
            <th></th>
            <td colspan="3">運費</td>
            <td>NTD {{shippingTotal}}</td>
          </tr>
          <tr class="table-light">
            <th></th>
            <td colspan="3">折扣</td>
            <td>NTD -{{couponDiscount}}</td>
          </tr>
          <tr class="table-info">
            <th></th>
            <td colspan="3">總計</td>
            <td>NTD {{total}}</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-md-6">
          <h5 class="text-left mt-3">訂購人員</h5>
          <hr />
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row"></th>
                <td class="d-flex">
                  <input
                    type="checkbox"
                    class="mr-2"
                    v-model="user.checked"
                    @click="includeUserData(user.checked)"
                  />
                  自動帶入會員資料
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
                  <input
                    type="text"
                    id="order-phone"
                    v-model="user.phone"
                    name="orderPhone"
                    class="form-control"
                    placeholder="phone number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">連絡信箱</th>
                <td>
                  <input
                    type="text"
                    id="order-email"
                    v-model="user.email"
                    name="orderEmail"
                    class="form-control"
                    placeholder="email"
                  />
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
                  <input
                    type="text"
                    id="receiver-name"
                    v-model="receiver.name"
                    name="receiverName"
                    class="form-control"
                    placeholder="name"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">手機號碼</th>
                <td>
                  <input
                    type="text"
                    id="receiver-phone"
                    v-model="receiver.phone"
                    name="receiverPhone"
                    class="form-control"
                    placeholder="phone number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">連絡信箱</th>
                <td>
                  <input
                    type="text"
                    id="receiver-email"
                    v-model="receiver.email"
                    name="receiverEmail"
                    class="form-control"
                    placeholder="email"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">寄件地址</th>
                <td>
                  <input
                    type="text"
                    id="receiver-address"
                    v-model="receiver.address"
                    name="receiverAddress"
                    class="form-control"
                    placeholder="address"
                  />
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
import cartsAPI from "./../apis/carts";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
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
        email: "",
        address: "",
        checked: false
      },
      receiver: {
        name: "",
        phone: "",
        email: "",
        address: "",
        checked: false
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchCheckout(id);
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    user: {
      handler: function() {
        if (this.receiver.checked == true) {
          this.includeReceiverData(!this.receiver.checked);
        }
      },
      deep: true
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
          type: "error",
          title: "無法取得訂單資訊，請稍後再試"
        });
      }
    },
    includeUserData(checked) {
      if (checked == false) {
        this.user.name = this.currentUser.name;
        this.user.phone = this.currentUser.phone;
        this.user.email = this.currentUser.email;
        this.user.address = this.currentUser.address;
      } else {
        this.user.name = "";
        this.user.phone = "";
        this.user.email = "";
        this.user.address = "";
      }
    },
    includeReceiverData(checked) {
      if (checked == false) {
        this.receiver.name = this.user.name;
        this.receiver.phone = this.user.phone;
        this.receiver.email = this.user.email;
        this.receiver.address = this.user.address;
      } else {
        this.receiver.name = "";
        this.receiver.phone = "";
        this.receiver.email = "";
        this.receiver.address = "";
      }
    }
  }
};
</script>