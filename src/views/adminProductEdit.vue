<template>
  <div>
    <admin-nav></admin-nav>
    <div v-if="isLoading">
      <spinner />
    </div>
    <form v-else class="container mb-5" @submit.stop.prevent="handleSubmit($route.params.id)">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">名稱</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            v-model="product.name"
            placeholder="商品名稱"
            required="required"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="categoryId">分類</label>
          <select
            name="categoryId"
            id="categoryId"
            class="form-control"
            v-model="product.categoryId"
          >
            <option value disabled>請選擇</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{ category.category }}</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="status">目前狀態</label>
          <select name="status" id="status" class="form-control" v-model="product.status">
            <option value="on">上架</option>
            <option value="off">下架</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="originPrice">原價</label>
          <input
            type="text"
            name="originPrice"
            id="originPrice"
            class="form-control"
            placeholder="商品原價"
            v-model="product.originPrice"
            required="required"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="originPrice">售價</label>
          <input
            type="text"
            name="sellPrice"
            id="sellPrice"
            class="form-control"
            placeholder="商品售價"
            v-model="product.sellPrice"
            required="required"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="description">產品描述</label>
          <textarea
            name="description"
            id="description"
            class="form-control"
            cols="120"
            rows="3"
            placeholder="請輸入商品的簡介"
            v-model="product.description"
          ></textarea>
        </div>
        <div class="form-group col-md-12">
          <label for="images">商品圖片</label>
          <input type="file" class="form-control" name="images" id="images" multiple="multiple" />
        </div>
      </div>
      <div class="container adminProductImg">
        <div class="row">
          <div class="prodcutImg col-md-3 mb-3" v-for="image in images" :key="image.id">
            <img :src="image.url" alt />
            <div class="mask" @click="deleteImage" :data-imageId="image.id">X</div>
          </div>
        </div>
      </div>
      <a href="#" class="btn btn-primary mx-3" @click="$router.go(-1)">回上一頁</a>
      <button type="submit" class="btn btn-outline-dark mx-3" :disabled="isProcessing">確認修改</button>
    </form>
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
      product: {
        name: "",
        categoryId: "",
        originPrice: 0,
        sellPrice: 0,
        status: "",
        description: ""
      },
      images: [],
      categories: []
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchAdminProduct(id);
    this.fetchAdminCategories();
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
    const { id } = to.params;
    this.fetchAdminProduct(id);
    next();
  },
  methods: {
    async fetchAdminProduct(id) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.products.getProductDetail({
          id
        });
        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(status);
        }
        this.product = {
          name: data.product.name,
          categoryId: data.product.CategoryId,
          originPrice: data.product.origin_price,
          sellPrice: data.product.sell_price,
          status: data.product.status,
          description: data.product.description
        };
        this.images = data.product.images;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得商品資訊"
        });
      }
    },
    async fetchAdminCategories() {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.categories.get();
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得類別資料"
        });
      }
    },
    async handleSubmit(id) {
      try {
        if (
          !this.product.name ||
          !this.product.sellPrice ||
          !this.product.originPrice ||
          !this.product.description
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認輸入的內容"
          });
          return;
        }
        this.$store.dispatch("updateProcessing", true);
        let e = window.event;
        const form = e.target;
        const formData = new FormData(form);

        const { data, statusText } = await adminAPI.products.put({
          id,
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$store.dispatch("updateProcessing", false);
        this.$router.push({ name: "adminProducts" });
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "修改商品資料失敗"
        });
      }
    },
    async deleteImage(e) {
      try {
        const { imageid } = e.target.dataset;
        const { data, statusText } = await adminAPI.products.deleteImage(
          imageid
        );
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.images.splice(this.images.indexOf(imageid), 1);
        Toast.fire({
          icon: "success",
          title: "成功刪除圖片!!"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "刪除圖片失敗"
        });
      }
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
  height: auto;
}
.adminProductImg .prodcutImg {
  position: relative;
}
.prodcutImg .mask {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: all 0.5s;
}
.prodcutImg .mask:hover {
  color: red;
  opacity: 1;
  font-size: 200px;
  cursor: pointer;
}
</style>
