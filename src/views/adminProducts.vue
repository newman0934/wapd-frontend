<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>商品列表</h1>
        <h1>
          <router-link class="btn btn-outline-primary" :to="{name:'adminProductCreate'}">新增商品</router-link>
        </h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品分類</th>
              <th scope="col">價格</th>
              <th scope="col">狀態</th>
              <th scope="cole">庫存查詢</th>
              <th scope="col">商品編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td scope="col">{{product.id}}</td>
              <td scope="col">
                <router-link :to="{name:'adminProduct',params:{id:product.id}}">{{product.name}}</router-link>
              </td>
              <td scope="col">{{product.category}}</td>
              <td scope="col">{{product.sell_price}}</td>
              <td scope="col">{{product.status}}</td>
              <td scope="col">
                <router-link
                  class="btn btn-outline-info"
                  :to="{name:'adminProductStatus', params:{ id: product.id}}"
                >查詢</router-link>
              </td>
              <td scope="col">
                <router-link
                  :to="{name:'adminProductEdit', params:{id:product.id}}"
                  class="btn btn-outline-dark"
                >編輯</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
export default {
  components: {
    adminNav
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    this.fetchAdminProducts();
  },

  methods: {
    async fetchAdminProducts() {
      try {
        const { data, statusText } = await adminAPI.products.get();
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.products = data.products;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得商品資料"
        });
      }
    }
  }
};
</script>