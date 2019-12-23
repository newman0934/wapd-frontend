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
        <button class="btn btn-success btn-border mr-2">購物車</button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import productsAPI from "./../apis/products";
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
    this.fetchImages();
    this.colorSet = this.fetchColorSet();
    this.sizeSet = this.fetchSizeSet();
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
        this.isProcessing = true;
        const { data, statusText } = await productsAPI.addFavorite({
          productId
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "商品成功加入Wish List"
        });
        this.product = {
          ...this.product,
          isFavorited: true
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "無法將商品加入Wish List，請稍後再試"
        });
      }
    },
    async deleteFavorite(productId) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await productsAPI.deleteFavorite({
          productId
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "商品成功從Wish List移除"
        });
        this.product = {
          ...this.product,
          isFavorited: false
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "無法將商品從Wish List移除，請稍後再試"
        });
      }
    }
  }
};
</script>
<style scoped>
</style>