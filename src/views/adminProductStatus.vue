<template>
  <div>
    <adminNav />
    <div class="container">
      <h3 class="text-left my-5">商品9</h3>
      <div class="text-left">
        <a href="#" class="btn btn-outline-primary mb-5 p-2">新增種類</a>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="status in productStatus" :key="status.id">
              <td scope="col">{{status.id}}</td>
              <td scope="col">{{status.color}}</td>
              <td scope="col">{{status.size}}</td>
              <td scope="col">{{status.stock}}</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-dark">編輯</a>
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
          type: "error",
          title: "無法取得商品狀態"
        });
      }
    }
  }
};
</script>