<template>
  <div>
    <adminNav />
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="container mb-5">
      <div class="text-left">
        <h1>訂單列表</h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <!-- <th scope="col">id</th> -->
              <!-- <th scope="col">訂購會員ID</th> -->
              <th scope="col">收件人</th>
              <th scope="col">收件人電話</th>
              <th scope="col">訂單編號</th>
              <th scope="col">價格</th>
              <th scope="col">付款方式</th>
              <th scope="col">付款狀態</th>
              <th scope="col">出貨狀態</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <!-- <td scope="row">
                {{order.id}}
              </td> -->
              <!-- <td scope="row">{{order.UserId}}</td> -->
              <td scope="row">{{order.receiver_name}}</td>
              <td scope="row">{{order.phone}}</td>
              <td scope="row"><router-link :to="{name:'adminOrder', params:{ order_id:order.id }}">{{order.sn || "訂單尚未成立"}}</router-link></td>
              <td scope="row">{{order.total_price}}</td>
              <td scope="row">{{order.payment_method}}</td>
              <td scope="row">{{order.payment_status==1?"已付款":"未付款"}}</td>
              <td scope="row">{{order.shipping_status}}</td>
              <td scope="row">
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  id="updateBtn"
                  @click.prevent.stop="postTransition(order)"
                >更新暨查詢</button>
              </td>
              <!-- Modal -->
              <div
                class="modal fade"
                id="orderModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalScrollableTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalScrollableTitle">訂單編號：{{order.sn}}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body text-left">
                      <p>商店代號：{{spgResponse.MerchantID}}</p>
                      <p>交易金額：{{spgResponse.Amt}}</p>
                      <p>藍新金流交易序號：{{spgResponse.TradeNo}}</p>
                      <p>
                        支付狀態：{{spgResponse.TradeStatus}}
                        <br />
                        <small class="text-muted">數字回應代表: 0=未付款 1=付款成功 2=付款失敗 3=取消付款</small>
                      </p>
                      <p>
                        支付方式：{{spgResponse.PaymentType}}
                        <br />
                        <small
                          class="text-muted"
                        >英文回應代表: CREDIT=信用卡付款 / CVSCOM=超商取貨付款 / VACC=銀行ATM轉帳付款 / WEBATM=網路銀行轉帳付款 / BARCODE=超商條碼繳費 / CVS=超商代碼繳費</small>
                      </p>
                      <p>交易建立時間：{{spgResponse.CreateTime}}</p>
                      <p>支付時間：{{spgResponse.PayTime}}</p>
                      <p>檢核碼CheckCode：{{spgResponse.CheckCode}}</p>
                      <p>預計撥款日：{{spgResponse.FundTime}}</p>
                      <hr />
                      <div v-if="spgResponse.PaymentType=='CREDIT'">
                        <p class="text-success">當該筆交易為信用卡交易時，會新增回應下列欄位：</p>
                        <p>
                          交易類別：{{spgResponse.PaymentMethod}}
                          <br />
                          <small
                            class="text-muted"
                          >英文回應代表: CREDIT = 台灣發卡機構核發之信用卡 / FOREIGN = 國外發卡機構核發之卡 / NTCB = 國民旅遊卡 / UNIONPAY = 銀聯卡 / APPLEPAY = ApplePay / GOOGLEPAY = GooglePay / SAMSUNGPAY = SamsungPay</small>
                        </p>
                        <p>金融機構回應碼：{{spgResponse.RespondCode}}</p>
                        <p>授權碼：{{spgResponse.Auth}}</p>
                        <p>請款金額：{{spgResponse.CloseAmt}}</p>
                        <p>請款狀態：{{spgResponse.CloseStatus}}</p>
                        <p>可退款餘額：{{spgResponse.BackBalance}}</p>
                        <p>退款狀態：{{spgResponse.BackStatus}}</p>
                        <p>授權結果訊息：{{spgResponse.RespondMsg}}</p>
                        <p>分期-期別：{{spgResponse.Inst}}</p>
                        <p>分期-首期金額：{{spgResponse.InstFirst}}</p>
                        <p>分期-每期金額：{{spgResponse.InstEach}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <nav v-if="totalPage > 1" aria-label="Page navigation">
        <ul class="pagination">
          <li v-show="previousPage" class="page-item">
            <router-link
              class="page-link"
              aria-label="Previous"
              :to="{name: 'adminOrders', query: { page: previousPage }}"
            >
              <span aria-hidden="true">&laquo;</span>
            </router-link>
          </li>
          <li
            v-for="page in totalPage"
            :key="page"
            :class="['page-item', { active: currentPage === page }]"
          >
            <router-link class="page-link" :to="{name: 'adminOrders', query: { page }}">{{ page }}</router-link>
          </li>
          <li v-show="nextPage" class="page-item">
            <router-link
              class="page-link"
              :to="{name: 'adminOrders', query: { page: nextPage }}"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import spinner from "./../components/spinner";
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import ordersAPI from "./../apis/orders";
import $ from "jquery";
export default {
  components: {
    adminNav,
    spinner
  },
  data() {
    return {
      orders: [],
      spgResponse: [],
      totalPage: 0,
      currentPage: 0
    };
  },
  created() {
    const { page } = this.$route.query;
    this.fetchAdminOrders({ page });
  },
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query;
    this.fetchAdminOrders({ page });
    next();
  },
  computed: {
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    async fetchAdminOrders({ page = 1 }) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.orders.get({
          page
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.orders = data.orders;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得訂單資料"
        });
      }
    },
    async postTransition(order) {
      let amt = order.total_price;
      let sn = order.sn;
      try {
        const { data, statusText } = await ordersAPI.postTransition({
          amt,
          sn
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.spgResponse = data.response.Result;
        await this.fetchAdminOrders(1);
        this.openOrderModal();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "暫無法查詢/更新訂單，請稍後再試"
        });
      }
    },
    openOrderModal() {
      $("#orderModal").modal("show");
    }
  }
};
</script>