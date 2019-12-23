<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <productBreadcrumb :path="path" />
      </div>
      <div class="col-md-8">
        <productCarousel :product-images="productImgs" />
      </div>
      <div class="col-md-4">
        <productDetail :initial-product="product" />
      </div>
      <!-- <div class="col-md-12">
        <productGallery />
      </div>-->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import productBreadcrumb from "./../components/productBreadcrumb";
import productCarousel from "./../components/productCarousel";
import productDetail from "./../components/productDetail";
import productGallery from "./../components/productGallery";
import productsAPI from "./../apis/products";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    productBreadcrumb,
    productCarousel,
    productDetail,
    productGallery
  },
  data() {
    return {
      path: {
        categoryName: "",
        namd: ""
      },
      product: {
        id: 0,
        name: "",
        sellPrice: "",
        originPricd: "",
        description: "",
        sizeSet: [],
        colorSet: [],
        isFavorited: false
      },
      productImgs: []
    };
  },
  created() {
    const { id: productId } = this.$route.params;
    this.fetchProduct(productId);
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const { data, statusText } = await productsAPI.getProduct({
          productId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        //get size and color set
        const colorUnique = new Set(data.product.color);
        const sizeUnique = new Set(data.product.size);

        //match API to data()
        this.path = {
          categoryName: data.product.category,
          name: data.product.name
        };
        this.product = {
          id: data.product.id,
          name: data.product.name,
          sellPrice: data.product.sell_price,
          originPricd: data.product.origin_price,
          description: data.product.description,
          sizeSet: [...sizeUnique],
          colorSet: [...colorUnique]
        };
        this.productImgs = data.product.images;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得商品資訊，請稍後再試"
        });
      }
    }
  }
};
</script>