<template>
  <div>
    <admin-nav></admin-nav>
    <form class="container mb-5" @submit.stop.prevent="addToProductSubmit">
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
          <option value="" disabled>請選擇</option>
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
          <div class="form-group col-md-12">
            <input type="file" multiple="multiple" id="image" name="image" />
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="DashboardContainer" name="image"></div>
        </div>
      </div>
      <a href="#" class="btn btn-primary mx-3">回上一頁</a>
      <button type="submit" class="btn btn-primary mx-3">新增商品</button>
    </form>
  </div>
</template>
<script>
import "@uppy/dashboard/dist/style.min.css";
// import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
export default {
  components: {
    adminNav
  },
  data() {
    return {
      // uppy: null,
      product: {
        id: -1,
        name: "",
        categoryId: "",
        originPrice: "",
        sellPrice: "",
        description: "",
        images: []
      },
      categories: []
    };
  },
  mounted() {
    // this.initUppy();
  },
  created() {
    this.fetchAdminCategories();
  },
  methods: {
    // openUppyDashboard() {
    //   this.uppy.getPlugin("Dashboard").openModal();
    // },
    // initUppy() {
    //   this.uppy = Uppy({
    //     autoProceed: false,
    //     debug: true,
    //     restrictions: {
    //       maxFileSize: 1000000,
    //       maxNumberOfFiles: 10,
    //       minNumberOfFiles: 1,
    //       allowedFileTypes: ["image/*"]
    //     },
    //     meta: {
    //       modelId: this.modelId,
    //       collection: this.collection
    //     },
    //     onBeforeFileAdded: () => {
    //       Promise.resolve();
    //     },
    //     onBeforeUpload: files => {
    //       this.files = files;
    //       Promise.resolve();
    //     }
    //   }).use(Dashboard, {
    //     trigger: ".UppyModalOpenerBtn",
    //     inline: true,
    //     target: ".DashboardContainer",
    //     replaceTargetContent: true,
    //     showProgressDetails: true,
    //     note: "Images and video only, 1–10 files, up to 1 MB",
    //     height: 470,
    //     metaFields: [
    //       { id: "name", name: "Name", placeholder: "file name" },
    //       {
    //         id: "caption",
    //         name: "Caption",
    //         placeholder: "describe what the image is about"
    //       }
    //     ],
    //     browserBackButtonClose: true
    //   });

    //   this.uppy.on("complete", result => {
    //     console.log("successful files:", result.successful);
    //     this.files = result.successful;
    //     console.log("failed files:", result.failed);
    //   });
    // },
    async addToProductSubmit(e) {
      try {
        if (
          !this.product.name ||
          !this.product.sellPrice ||
          !this.product.originPrice ||
          !this.product.description
        ) {
          Toast.fire({
            type: "warning",
            title: "請確認輸入的內容"
          });
          return;
        }
        const form = e.target;
        const formData = new FormData(form);
      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ': ' + value)
      // }
        const { data, statusText } = await adminAPI.products.post({ formData });

        if(statusText !== "OK" || data.status !== "success"){
          throw new Error(statusText)
        }

        this.$router.go(-1)
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "建立商品失敗"
        });
      }
    },
    async fetchAdminCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get();
        console.log(data);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得類別列表"
        });
      }
    }
  }
  // beforeDestroy() {
  //   this.uppy.close();
  // }
};
</script>