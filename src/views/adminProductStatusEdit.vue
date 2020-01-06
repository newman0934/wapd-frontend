<template>
  <div>
    <adminNav />
    <div class="container">
      <div class="col-sm-6 mx-auto">
        <h3>商品9</h3>
        <form class="mb-5">
          <div class="form-group row">
            <label for="productSize" class="col-sm-2 col-form-label">尺寸</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productSize"
                name="productSize"
                placeholder="商品尺寸"
                v-model="editSize"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="productColor" class="col-sm-2 col-form-label">顏色</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productColor"
                name="productColor"
                placeholder="商品顏色"
                v-model="editColor"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="productStock" class="col-sm-2 col-form-label">庫存</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productStock"
                name="productStock"
                placeholder="商品庫存"
                v-model="editStock"
              />
            </div>
          </div>
          <a href="#" class="btn btn-primary mx-3">回上一頁</a>
          <button
            type="submit"
            class="btn btn-primary mx-3"
            @click.stop.prevent="putAdminProductStatus($route.params.id,$route.params.stock_id)"
          >送出</button>
        </form>
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
      editColor: "",
      editSize: "",
      editStock: ""
    };
  },
  created() {
    const { id, stock_id } = this.$route.params;
    this.fetchAdminProductStatus(id, stock_id);
  },
  methods: {
    async fetchAdminProductStatus(id, stock_id) {
      try {
        const { data, statusText } = await adminAPI.products.getStatusDatail({
          id,
          stock_id
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.editColor = data.productStatus.color;
        this.editSize = data.productStatus.size;
        this.editStock = data.productStatus.stock;
      } catch (error) {
        Toast.fire({
          type:"error",
          title:"取得商品尺寸、顏色、庫存失敗"
        })
      }
    },
    async putAdminProductStatus(id, stock_id) {
      try {
        const { data, statusText } = await adminAPI.products.putStatus({
          id,
          stock_id,
          color: this.editColor,
          size: this.editSize,
          stock: this.editStock
        });
        console.log(id, stock_id)
        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        this.$router.go(-1);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "編輯商品尺寸、顏色、庫存失敗"
        });
      }
    }
  }
};
</script>