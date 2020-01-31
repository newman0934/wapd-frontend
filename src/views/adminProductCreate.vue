<template>
  <div>
    <admin-nav></admin-nav>
    <form class="container mb-5" id="form" @submit.stop.prevent="addToProductSubmit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">名稱</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="商品名稱"
            v-model="product.name"
            required="required"
          />
        </div>
        <div class="form-group col-md-6">
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
            >{{category.category}}</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="originPrice">原價</label>
          <input
            type="text"
            v-model="product.originPrice"
            name="originPrice"
            id="originPrice"
            class="form-control"
            placeholder="商品原價"
            required="required"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="sellPrice">售價</label>
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
          <!-- <div class="form-group col-md-12">
            <input type="file" multiple="multiple" id="images" name="images" />
          </div>-->
        </div>
        <div class="form-group col-md-12">
          <div class="DashboardContainer" name="image"></div>
        </div>
      </div>
      <a href="#" class="btn btn-outline-success mx-3" @click="$router.go(-1)">回上一頁</a>
      <button type="submit" class="btn btn-outline-primary mx-3" :disabled="isProcessing">新增商品</button>
    </form>
  </div>
</template>
<script>
import "@uppy/dashboard/dist/style.min.css";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
// import Url from "@uppy/url";
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
export default {
  components: {
    adminNav
  },
  data() {
    return {
      uppy: null,
      product: {
        id: -1,
        name: "",
        categoryId: "",
        originPrice: "",
        sellPrice: "",
        description: ""
      },
      images: [],
      categories: []
    };
  },
  mounted() {
    this.initUppy();
  },
  created() {
    this.fetchAdminCategories();
  },
  computed: {
    isProcessing() {
      return this.$store.state.isProcessing;
    }
  },
  methods: {
    openUppyDashboard() {
      this.uppy.getPlugin("Dashboard").openModal();
    },
    initUppy() {
      this.uppy = Uppy({
        autoProceed: false,
        debug: true,
        restrictions: {
          maxFileSize: 50 * 1024 * 1024,
          maxNumberOfFiles: 10,
          minNumberOfFiles: 1,
          allowedFileTypes: ["image/*"]
        },
        meta: {
          modelId: this.modelId,
          collection: this.collection
        },
        onBeforeFileAdded: () => {
          Promise.resolve();
        },
        onBeforeUpload: files => {
          this.files = files;
          Promise.resolve();
        }
      }).use(Dashboard, {
        trigger: ".UppyModalOpenerBtn",
        inline: true,
        target: ".DashboardContainer",
        replaceTargetContent: true,
        showProgressDetails: true,
        note: "Images and video only, 1–10 files",
        height: 470,
        metaFields: [
          { id: "name", name: "Name", placeholder: "file name" },
          {
            id: "caption",
            name: "Caption",
            placeholder: "describe what the image is about"
          }
        ],
        browserBackButtonClose: true
      });
      // .use(Url,{})
      // this.uppy.getPlugin("Url").addFile("data:image/png;base64,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")

      this.uppy.on("complete", result => {
        this.files = result.successful;
      });
    },
    async addToProductSubmit(e) {
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
        this.images = this.uppy.getFiles().map(f => f.data);

        const form = e.target;
        const formData = new FormData(form);

        const { data, statusText } = await adminAPI.products.post({
          formData,
          images: this.images
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
          title: "建立商品失敗"
        });
      }
    },
    async fetchAdminCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得類別列表"
        });
      }
    }
  },
  beforeDestroy() {
    this.uppy.close();
  }
};
</script>