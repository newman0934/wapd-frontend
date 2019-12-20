<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-3" id="product-card">
      <img class="card-img-top" :src="fetchImages()" alt="card-image-cap" />
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
    fetchImages() {
      const image = this.product.Images[0].url;
      return image;
    },
    fetchColorSet() {
      const colorItems = this.product.ProductStatuses.map(item => item.Color);
      const colorSet = colorItems.map(item => item.color);
      let colorUnique = new Set(colorSet);
      return colorUnique;
    },
    fetchSizeSet() {
      const sizeItems = this.product.ProductStatuses.map(item => item.Size);
      const sizeSet = sizeItems.map(item => item.size);
      let sizeUnique = new Set(sizeSet);
      return sizeUnique;
    }
  }
};
</script>
<style scoped>
</style>