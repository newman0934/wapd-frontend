<template>
  <div class="py-5">
    <index-carousel></index-carousel>
    <index-product-slider></index-product-slider>
    <index-category></index-category>
  </div>

</template>
<script>
import indexCarousel from "./../components/indexCarousel"
import indexProductSlider from "./../components/indexProductSlider"
import indexCategory from "./../components/indexCategory"

export default {
  components: {
    indexCarousel,
    indexProductSlider,
    indexCategory
  }
}
</script>

