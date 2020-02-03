<template>
  <div>
    <div>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div v-for="image in images" :key="image.id" class="carousel-item active">
            <vue-load-image>
              <img slot="image" :src="imageUrl" class="d-block w-100" alt="slide" />
              <img slot="preloader" class="d-block w-100" src="./../static/loading.gif" />
              <div slot="error" class="d-block w-100">圖片下載失敗</div>
            </vue-load-image>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-2">
      <div v-for="image in images" :key="image.id" class="col-xs-2 col-sm-2 col-md-2">
        <div class="card">
          <vue-load-image>
            <img
              slot="image"
              class="card-img-top"
              :src="image.url"
              style="cursor: pointer;"
              @click.stop.prevent="toggleImageUrl(image.url)"
            />
            <img slot="preloader" class="card-img-top" src="./../static/1260x750.png" />
            <div slot="error" class="card-img-top">圖片下載失敗</div>
          </vue-load-image>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueLoadImage from "vue-load-image";
export default {
  components: {
    "vue-load-image": VueLoadImage
  },
  props: {
    productImages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      images: this.productImages,
      imageUrl: ""
    };
  },
  created() {
    this.imageUrl = this.images[0].url;
  },
  watch: {
    productImages(images) {
      this.images = {
        ...this.images,
        ...images
      };
    }
  },
  methods: {
    toggleImageUrl(url) {
      this.imageUrl = url;
    }
  }
};
</script>
<style lang="css" scope>
#indexProductSlider .col-md-2 {
  display: inline-block;
}
#indexProductSlider .col-md-2 img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

#indexProductSlider .carousel-control-next-icon,
#indexProductSlider .carousel-control-prev-icon {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>