<template>
  <div>
    <admin-nav></admin-nav>
    <div class="table-responsive-md container">
      <h3 class="text-left">商品資訊</h3>
      <table class="table">
        <tbody>
          <tr>
            <td>名稱</td>
            <td colspan="2">{{product.name}}</td>
            <td>分類</td>
            <td colspan="2">{{product.category}}</td>
          </tr>
          <tr>
            <td>原價</td>
            <td>{{product.originPrice}}</td>
            <td>販售價</td>
            <td>{{product.sellPrice}}</td>
            <td>狀態</td>
            <td>{{product.status}}</td>
          </tr>
          <tr>
            <td>產品描述</td>
            <td colspan="5">{{product.description}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container adminProductImg">
      <div class="row">
        <div class="col-md-3 mb-3" v-for="image in images" :key="image.id">
          <img :src="image.url" alt />
        </div>
      </div>
    </div>
    <div class="container my-5">
      <div class="row justify-content-center">
        <button @click="goToBack" class="btn btn-outline-success mx-3">回上一頁</button>
        <router-link
          class="btn btn-outline-dark mx-3"
          :to="{name:'adminProductEdit', params:{id:product.id}}"
        >編輯商品</router-link>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
export default {
  components: {
    adminNav
  },
  data() {
    return {
      product: {
        id: "",
        name: "",
        category: "",
        cost: 0,
        originPrice: 0,
        sellPrice: 0,
        status: 0,
        description: ""
      },
      images: []
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchAdminProduct(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchAdminProduct(id);
    next();
  },
  methods: {
    async fetchAdminProduct(id) {
      try {
        const { data, statusText } = await adminAPI.products.getProductDetail({
          id
        });
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.product = {
          id: data.product.id,
          name: data.product.name,
          category: data.product.category,
          cost: data.product.cost,
          originPrice: data.product.origin_price,
          sellPrice: data.product.sell_price,
          status: data.product.status,
          description: data.product.description
        };
        this.images = data.product.images;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得商品詳細資料"
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
.adminProductImg img {
  width: 100%;
  height: auto;
}
</style>