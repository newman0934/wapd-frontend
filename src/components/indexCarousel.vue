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
        <img src="https://lorempixel.com/1200/400" class="d-block w-100" />
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
export default {};
</script>

