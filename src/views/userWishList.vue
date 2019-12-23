<template>
  <div class="container py-5">
    <div class="row">
      <productCard v-for="product in products" :key="product.id" :initial-product="product" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import productCard from "./../components/productCard";
export default {
  components: {
    productCard
  },
  data() {
    return {
      products: [],
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
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
    async fetchUserFavorite(userId) {
      try {
        const { data, statusText } = await usersAPI.getUserFavorite({ userId });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.products = data.products;
        console.log(data, statusText);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>