<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-3" id="product-card">
      <img class="card-img-top" :src="fetchImages()" alt="card-image-cap" />
      <div class="card-body p-1">
        <router-link :to="{name:'product', params:{id:product.id}}">
          <h5 class="card-title">{{product.name}}</h5>
          <span class="price">NTD{{fetchProductPrice()}}</span>
        </router-link>
      </div>
      <div class="card-footer">
        <button class="btn btn-danger btn-border mr-2">wish list</button>
        <button class="btn btn-success btn-border mr-2">購物車</button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
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
      isProcessing: false
    };
  },
  methods: {
    fetchImages() {
      const image = this.product.Images[0].url;
      return image;
    },
    fetchProductPrice() {
      const productPrice = this.product.ProductStatuses[0].price;
      return productPrice;
    }
  },
  created() {
    this.fetchImages();
    this.fetchProductPrice();
  }
};
</script>
<style scoped>
</style>