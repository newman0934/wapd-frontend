<template>
  <div class="container py-5">
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="row">
      <div class="col-md-12">
        <productBreadcrumb :path="path" />
      </div>
      <div class="col-md-8">
        <productCarousel :product-images="productImgs" />
      </div>
      <div class="col-md-4">
        <productDetail :initial-product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import productBreadcrumb from "./../components/productBreadcrumb";
import productCarousel from "./../components/productCarousel";
import productDetail from "./../components/productDetail";
import spinner from "./../components/spinner";
import productsAPI from "./../apis/products";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    productBreadcrumb,
    productCarousel,
    productDetail,
    spinner
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
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    const { id: productId } = this.$route.params;
    this.fetchProduct(productId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchProduct(id);
    next();
  },
  methods: {
    async fetchProduct(productId) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await productsAPI.getProduct({
          productId
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        //get size and color set
        const colorUnique = new Set(data.product.color);
        const sizeUnique = new Set(data.product.size);
        let wishlist = this.$store.state.wishList;
        //match API to data()
        this.path = {
          categoryName: data.product.category,
          name: data.product.name
        };
        if (this.$store.state.isAuthenticated && wishlist.length > 0) {
          this.product = {
            id: data.product.id,
            name: data.product.name,
            sellPrice: data.product.sell_price,
            originPricd: data.product.origin_price,
            description: data.product.description,
            sizeSet: [...sizeUnique],
            colorSet: [...colorUnique],
            isFavorited: wishlist.map(d => d.id).includes(data.product.id)
          };
        } else {
          this.product = {
            id: data.product.id,
            name: data.product.name,
            sellPrice: data.product.sell_price,
            originPricd: data.product.origin_price,
            description: data.product.description,
            sizeSet: [...sizeUnique],
            colorSet: [...colorUnique]
          };
        }
        this.productImgs = data.product.images;
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