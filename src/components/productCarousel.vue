<template>
  <div>
    <div>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div v-for="image in images" :key="image.id" class="carousel-item active">
            <img :src="imageUrl || image.url" class="d-block w-100" alt="slide" />
          </div>
        </div>
      </div>
    </div>

    <div id="indexProductSlider" class="carousel slide mt-2" data-ride="carousel">
      <!-- The slideshow -->
      <div class="carousel-inner no-padding">
        <div class="carousel-item active">
          <div v-for="image in images" :key="image.id" class="col-xs-2 col-sm-2 col-md-2">
            <div class="card">
              <img
                class="card-img-top"
                :src="image.url"
                @click.stop.prevent="toggleImageUrl(image.url)"
              />
            </div>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2">
            <div class="card">
              <img
                class="card-img-top"
                src="https://picsum.photos/id/1004/5616/3744"
                @click.stop.prevent="toggleImageUrl('https://picsum.photos/id/1004/5616/3744')"
              />
            </div>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2">
            <div class="card">
              <img
                class="card-img-top"
                src="https://picsum.photos/id/1000/5626/3635"
                @click.stop.prevent="toggleImageUrl('https://picsum.photos/id/1000/5626/3635')"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Left and right controls -->
      <a class="carousel-control-prev" href="#indexProductSlider" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#indexProductSlider" data-slide="next">
        <span class="carousel-control-next-icon"></span>
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
      images: this.productImages,
      imageUrl: "",
      isLoading: false
    };
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