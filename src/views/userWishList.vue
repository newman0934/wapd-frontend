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
    const { id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.fetchUserFavorite(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.fetchUserFavorite(id);
    next();
  },
  methods: {
    fetchUserFavorite(userId) {
      this.$store.dispatch("fetchUserFavorite", userId);
    }
  }
};
</script>