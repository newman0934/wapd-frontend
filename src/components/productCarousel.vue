<template>
  <div>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
      <div class="carousel-inner">
        <div v-for="image in images" :key="image.id" class="carousel-item active">
          <img :src="image.url" class="d-block w-100" alt="#" />
        </div>
        <!-- <div class="carousel-item">
          <img src="https://picsum.photos/id/1006/3000/2000" class="d-block w-100" alt="#" />
        </div>
        <div class="carousel-item">
          <img src="https://picsum.photos/id/1012/3973/2639" class="d-block w-100" alt="#" />
        </div>-->
      </div>
      <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productImages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      images: this.productImages
    };
  },
  watch: {
    productImages(images) {
      this.images = {
        ...this.images,
        ...images
      };
    }
  }
};
</script>