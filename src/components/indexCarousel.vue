<template>
  <div class="container-fluid pb-5">
    <div id="indexCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#indexCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#indexCarousel" data-slide-to="1"></li>
        <li data-target="#indexCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <vue-load-image>
            <img slot="image" src="https://lorempixel.com/1200/400" class="d-block w-100" />
            <img
              slot="preloader"
              class="d-block"
              height="500px"
              width="100%"
              src="./../static/1260x750.png"
            />
            <div slot="error" class="cd-block w-100">圖片下載失敗</div>
          </vue-load-image>
        </div>
        <div class="carousel-item">
          <img src="https://lorempixel.com/1200/400" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="https://lorempixel.com/1200/400" class="d-block w-100" />
        </div>
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
export default {
  components: {
    "vue-load-image": VueLoadImage
  }
};
</script>

