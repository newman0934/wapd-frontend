<template>
  <div>
    <admin-nav></admin-nav>
    <form class="container mb-5" @submit.stop.prevent="addToProductSubmit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="productName">名稱</label>
          <input type="text" class="form-control" id="productName" placeholder="商品名稱" />
        </div>
        <div class="form-group col-md-6">
          <label for="productCategory">分類</label>
          <select name="productCategory" id="productCategory" class="form-control">
            <option>衣服</option>
            <option>鞋子</option>
            <option>褲子</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="productCost">成本</label>
          <input
            type="text"
            name="productCost"
            id="productCost"
            class="form-control"
            placeholder="商品成本"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="productPrice">價格</label>
          <input
            type="text"
            name="productPrice"
            id="productPrice"
            class="form-control"
            placeholder="商品價格"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="productStatus">目前狀態</label>
          <select name="productStatus" id="productStatus" class="form-control">
            <option>上架</option>
            <option>下架</option>
          </select>
        </div>
        <div class="form-group col-md-12">
          <label for="productDescription">產品描述</label>
          <textarea
            name="productDescription"
            id="productDescription"
            class="form-control"
            cols="120"
            rows="3"
            placeholder="請輸入商品的簡介"
          ></textarea>
        </div>
        <div class="form-group col-md-12">
          <div class="DashboardContainer" name="productImages"></div>
        </div>
      </div>
      <a href="#" class="btn btn-primary mx-3">回上一頁</a>
      <button type="submit" class="btn btn-primary mx-3">新增商品</button>
    </form>
  </div>
</template>
<script>
import "@uppy/dashboard/dist/style.min.css";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import adminNav from "./../components/adminNav";
export default {
  components: {
    adminNav
  },
  data() {
    return {
      uppy: null,
      files: []
    };
  },
  mounted() {
    this.initUppy();
  },
  computed: {
    // formData() {
    //   const res = this;
    //   console.log(res);
    //   return {
    //     res
    //   };
    // }
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
          maxFileSize: 1000000,
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
        note: "Images and video only, 1–10 files, up to 1 MB",
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

      this.uppy.on("complete", result => {
        console.log("successful files:", result.successful);
        this.files = result.successful;
        console.log("failed files:", result.failed);
      });
    },
    async addToProductSubmit(e) {
      // const formData = this.formData
      // console.log(formData)
      const form = e.target;
      const formData = new FormData(form);
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    }
  },
  beforeDestroy() {
    this.uppy.close();
  }
};
</script>