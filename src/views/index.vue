<template>
  <div class="py-5">
    <index-carousel></index-carousel>
    <div class="w-70">
      <div class="container col-md-12">
        <h1>最新商品</h1>
        <hr />
        <div class="row">
          <productCard v-for="product in products" :key="product.id" :initial-product="product" />
        </div>
        <hr />
        <index-category></index-category>
      </div>
    </div>
  </div>
</template>
<script>
import indexCarousel from "./../components/indexCarousel";
import indexCategory from "./../components/indexCategory";
import productCard from "./../components/productCard";
import productsAPI from "./../apis/products";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    indexCarousel,
    indexCategory,
    productCard
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    const page = 1;
    const categoryId = "";
    this.fetchProducts({ page, categoryId });
  },
  methods: {
    async fetchProducts({ page, categoryId }) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await productsAPI.getProducts({
          page,
          categoryId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        let wishlist = this.$store.state.wishList;
        if (this.$store.state.isAuthenticated && wishlist.length > 0) {
          this.products = data.products.map(product => ({
            ...product,
            isFavorited: wishlist.map(d => d.id).includes(product.id)
          }));
        } else {
          this.products = data.products;
        }
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          type: "error",
          title: "無法取得商品資訊，請稍後再試"
        });
      }
    }
  }
};
</script>

