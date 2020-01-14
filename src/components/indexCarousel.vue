<template>
  <div class="container-fluid pb-5">
    <div id="indexCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li
          v-for="(item, index) in data"
          :key="item.id"
          data-target="#indexCarousel"
          :data-slide-to="item.id"
          :class="{ 'active': index === 0 }"
        ></li>
        <!-- <li data-target="#indexCarousel" data-slide-to="1"></li>
        <li data-target="#indexCarousel" data-slide-to="2"></li>-->
      </ol>
      <div class="carousel-inner">
        <div
          v-for="(item,index) in data"
          :key="item.id"
          class="carousel-item"
          :class="{ 'active': index === 0 }"
        >
          <vue-load-image>
            <img slot="image" :src="item.image" class="d-block w-100" />
            <img
              slot="preloader"
              class="d-block"
              height="400px"
              width="100%"
              src="./../static/1260x750.png"
            />
            <div slot="error" class="cd-block w-100">圖片下載失敗</div>
          </vue-load-image>
        </div>
        <!-- <div class="carousel-item">
          <img src="https://lorempixel.com/1200/400" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="https://lorempixel.com/1200/400" class="d-block w-100" />
        </div>-->
      </div>
      <a class="carousel-control-prev" href="#indexCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#indexCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>
<script>
import VueLoadImage from "vue-load-image";
const carouselData = [
  {
    id: 0,
    image: "https://i.imgur.com/jlam41Q.jpg"
  },
  {
    id: 1,
    image: "https://i.imgur.com/mTbHOS8.jpg"
  },
  {
    id: 2,
    image: "https://i.imgur.com/BFEOLmx.jpg"
  }
];
export default {
  components: {
    "vue-load-image": VueLoadImage
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.data = carouselData;
  }
};
</script>

