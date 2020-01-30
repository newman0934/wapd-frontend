<template>
  <div>
    <adminNav />
    <div class="container">
      <h3 class="text-left my-5">商品ID：{{$route.params.id}}</h3>
      <div class="text-left">
        <router-link class="btn btn-outline-primary" :to="{name:'adminProductStatusCreate'}">新增種類</router-link>
      </div>
      <div class="table-responsive-md mb-5">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">顏色</th>
              <th scope="col">尺寸</th>
              <th scope="col">存貨</th>
              <th scope="col">編輯</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="status in productStatus" :key="status.id">
              <td scope="col">{{status.id}}</td>
              <td scope="col">{{status.color}}</td>
              <td scope="col">{{status.size}}</td>
              <td scope="col">{{status.stock}}</td>
              <td scope="col">
                <router-link
                  :to="{name:'adminProductStatusEdit', params:{id:status.ProductId,stock_id:status.id}}"
                  class="btn btn-outline-dark"
                >編輯</router-link>
              </td>
              <td scope="col">
                <button
                  class="btn btn-outline-danger"
                  @click.stop.prevent="deleteProductStatus(status.ProductId, status.id)"
                >刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="container">
          <button @click="goToBack" class="btn btn-outline-success mx-3 my-5">回上一頁</button>
        </div>
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
      productStatus: []
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchProductStatus(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchProductStatus(id);
    next();
  },
  methods: {
    async fetchProductStatus(id) {
      try {
        const { data, statusText } = await adminAPI.products.getStatus({
          id
        });
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.productStatus = data.productStatus;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得商品狀態"
        });
      }
    },
    goToBack() {
      this.$router.go(-1);
    },
    async deleteProductStatus(id, stock_id) {
      try {
        const { data, statusText } = await adminAPI.products.deleteStatus({
          id,
          stock_id
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        this.productStatus = this.productStatus.filter(
          product => product.id !== stock_id
        );
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "刪除商品資訊失敗"
        });
      }
    }
  }
};
</script>