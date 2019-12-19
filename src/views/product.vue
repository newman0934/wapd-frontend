<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <productBreadcrumb />
      </div>
      <div class="col-md-8">
        <productCarousel />
      </div>
      <div class="col-md-4">
        <productDetail />
      </div>
      <div class="col-md-12">
        <productGallery />
      </div>
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
      data: {},
      product: {
        id: undefined,
        name: "",
        categoryName: "",
        description: "",
        size: [],
        color: [],
        quantity: 0,
        isFavorited: false
      },
      productImg: []
    };
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
        this.data = data.productResult;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot fetch product information, please try later."
        });
      }
    }
  },
  created() {
    const { id: productId } = this.$route.params;
    this.fetchProduct(productId);
  }
};
</script>