<template>
  <div>
    <adminNav />
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="container">
      <div class="col-sm-6 mx-auto">
        <h3>商品ID：{{productStatus.ProductId}}</h3>
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
                v-model="productStatus.size"
                required="required"
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
                v-model="productStatus.color"
                required="required"
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
                v-model="productStatus.stock"
                required="required"
              />
            </div>
          </div>
          <a href="#" class="btn btn-outline-success mx-3" @click="$router.go(-1)">回上一頁</a>
          <button
            type="submit"
            class="btn btn-outline-dark mx-3"
            @click.stop.prevent="putAdminProductStatus($route.params.id,$route.params.stock_id)"
            :disabled="isProcessing"
          >確認修改</button>
        </form>
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
      productStatus: {
        ProductId: "",
        color: "",
        id: "",
        size: "",
        stock: 0
      }
    };
  },
  created() {
    const { id, stock_id } = this.$route.params;
    this.fetchAdminProductStatus(id, stock_id);
  },
  computed: {
    isProcessing() {
      return this.$store.state.isProcessing;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { id, stock_id } = to.params;
    this.addProductStatus(id, stock_id);
    next();
  },
  methods: {
    async fetchAdminProductStatus(id, stock_id) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.products.getStatusDatail({
          id,
          stock_id
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.productStatus = {
          ProductId: data.productStatus.ProductId,
          color: data.productStatus.color,
          id: data.productStatus.id,
          size: data.productStatus.size,
          stock: data.productStatus.stock
        };
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "取得商品尺寸、顏色、庫存失敗"
        });
      }
    },
    async putAdminProductStatus(id, stock_id) {
      try {
        if (
          !this.productStatus.color ||
          !this.productStatus.size ||
          !this.productStatus.stock
        ) {
          Toast.fire({
            icon: "error",
            title: "請輸入顏色、尺寸與庫存"
          });
          return;
        }
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await adminAPI.products.putStatus({
          id,
          stock_id,
          color: this.productStatus.color,
          size: this.productStatus.size,
          stock: this.productStatus.stock
        });
        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        this.$store.dispatch("updateProcessing", false);
        this.$router.push({ name: "adminProductStatus", params: { id: id } });
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "編輯商品尺寸、顏色、庫存失敗"
        });
      }
    }
  }
};
</script>