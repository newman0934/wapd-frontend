<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-2">
        <!--leftCategoryNav-->
        <leftCategoryNav :categories="categories" />
      </div>
      <div class="col-md-10">
        <div class="row">
          <productCard v-for="product in products" :key="product.id" :initial-product="product" />
        </div>
      </div>
    </div>

    <!--productsPagination-->
  </div>
</template>
<script>
/* eslint-disable */
import leftCategoryNav from "./../components/leftCategoryNav";
import productCard from "./../components/productCard";
import productsAPI from "./../apis/products";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    leftCategoryNav,
    productCard
  },
  data() {
    return {
      products: [],
      categories: [],
      categoryId: "",
      currentPage: 1,
      totalPage: 0,
      isLoading: true
    };
  },
  methods: {
    async fetchProducts({ page = 1, categoryId = "" }) {
      try {
        const { data, statusText } = await productsAPI.getProducts({
          page,
          categoryId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.products = data.productResult.rows;
        this.categories = data.categories;
        this.categoryId = data.categoryId;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot fetch proudcts data, please try later."
        });
      }
    }
  },
  created() {
    const { page, categoryId } = this.$route.query;
    this.fetchProducts({ page, categoryId });
  }
};
</script>