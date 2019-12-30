<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-2">
        <leftCategoryNav :categories="categories" />
      </div>
      <div class="col-md-10">
        <div class="row">
          <productCard v-for="product in products" :key="product.id" :initial-product="product" />
        </div>
        <productsPagination
          v-if="totalPage>1"
          :category-id="categoryId"
          :current-page="currentPage"
          :total-page="totalPage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import spinner from "./../components/spinner";
import leftCategoryNav from "./../components/leftCategoryNav";
import productCard from "./../components/productCard";
import productsPagination from "./../components/productsPagination";
import productsAPI from "./../apis/products";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    leftCategoryNav,
    productCard,
    productsPagination
  },
  data() {
    return {
      products: [],
      categories: [],
      categoryId: "",
      currentPage: 1,
      totalPage: 0
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    const { page, categoryId } = this.$route.query;
    this.fetchProducts({ page, categoryId });
  },
  beforeRouteUpdate(to, from, next) {
    const { page, categoryId } = to.query;
    this.fetchProducts({ page, categoryId });
    next();
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
        let wishlist = this.$store.state.wishList;
        if (this.$store.state.isAuthenticated && wishlist.length > 0) {
          this.products = data.products.map(product => ({
            ...product,
            isFavorited: wishlist.map(d => d.id).includes(product.id)
          }));
        } else {
          this.products = data.products;
        }
        this.categories = data.categories;
        this.categoryId = data.categoryId;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
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