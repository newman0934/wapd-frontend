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
        const colorItems = data.productResult.ProductStatuses.map(
          item => item.Color
        );
        const colorSet = colorItems.map(item => item.color);
        const colorUnique = new Set(colorSet);
        const sizeItems = data.productResult.ProductStatuses.map(
          item => item.Size
        );
        const sizeSet = sizeItems.map(item => item.size);
        const sizeUnique = new Set(sizeSet);

        //match API to data()
        this.path = {
          categoryName: data.productResult.Category.category,
          name: data.productResult.name
        };
        this.product = {
          id: data.productResult.id,
          name: data.productResult.name,
          sellPrice: data.productResult.sell_price,
          originPricd: data.productResult.origin_price,
          description: data.productResult.description,
          sizeSet: [...sizeUnique],
          colorSet: [...colorUnique]
        };
        this.productImgs = data.productResult.Images;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot fetch product information, please try later."
        });
      }
    }
  }
};
</script>
// const sizeSet = sizeItems.filter(function({ id }) {
      //   return !this.has(id) && this.add(id);
      // }, new Set());