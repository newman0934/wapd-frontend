<template>
  <div class="container py-5">
    <div class="row">
      <productCard v-for="product in products" :key="product.id" :initial-product="product" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import productCard from "./../components/productCard";
export default {
  components: {
    productCard
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    products() {
      return this.$store.state.wishList;
    }
  },
  created() {
    this.fetchUserFavorite();
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserFavorite();
    next();
  },
  methods: {
    fetchUserFavorite() {
      this.$store.dispatch("fetchUserFavorite");
    }
  }
};
</script>