<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-3" id="product-card">
      <img class="card-img-top" :src="product.image[0].url" alt="card-image-cap" />
      <div class="card-body p-1">
        <router-link :to="{name:'product', params:{id:product.id}}">
          <h5 class="card-title">{{product.name}}</h5>
          <span class="price">NTD{{product.sell_price}}</span>
        </router-link>
        <hr />
        <p v-for="color in colorSet" :key="color" class="d-inline">{{color}},</p>
        <p v-for="size in sizeSet" :key="size" class="d-inline">{{size}},</p>
      </div>
      <div class="card-footer">
        <div class="d-inline" v-if="isAuthenticated">
          <button
            v-if="product.isFavorited"
            type="button"
            class="btn btn-danger btn-border mr-2"
            :disabled="isProcessing"
            @click.stop.prevent="deleteFavorite(product.id)"
          >-wish list</button>
          <button
            v-else
            type="button"
            class="btn btn-danger btn-border mr-2"
            :disabled="isProcessing"
            @click.stop.prevent="addFavorite(product.id)"
          >+wish list</button>
        </div>

        <!-- <button class="btn btn-success btn-border mr-2">購物車</button> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct,
      colorSet: [],
      sizeSet: [],
      isProcessing: false
    };
  },
  created() {
    this.colorSet = this.fetchColorSet();
    this.sizeSet = this.fetchSizeSet();
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    fetchColorSet() {
      let colorUnique = new Set(this.product.color);
      return [...colorUnique];
    },
    fetchSizeSet() {
      let sizeUnique = new Set(this.product.size);
      return [...sizeUnique];
    },
    async addFavorite(productId) {
      try {
        await this.$store.dispatch("addFavorite", productId);
        this.product = {
          ...this.product,
          isFavorited: true
        };
      } catch (error) {
        return false;
      }
    },
    async deleteFavorite(productId) {
      try {
        await this.$store.dispatch("deleteFavorite", productId);
        this.product = {
          ...this.product,
          isFavorited: false
        };
      } catch (error) {
        return false;
      }
    }
  }
};
</script>
<style scoped>
</style>