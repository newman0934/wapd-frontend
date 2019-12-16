<template>
  <div class="container pb-5">
    <h1>New Products</h1>
    <div id="indexProductSlider" class="carousel slide" data-ride="carousel">
      <!-- The slideshow -->
      <div class="carousel-inner no-padding">
        <div class="carousel-item active">
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3">
            <div class="card">
              <img class="card-img-top" src="https://lorempixel.com/1200/400" />
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <p class="card-text">$200</p>
              </div>
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
    <a class="showAll mt-3" href="#">
      <h1>show all</h1>
    </a>
  </div>
</template>
<style>
#indexProductSlider .col-md-3 {
  display: inline-block;
}
#indexProductSlider .col-md-4 img {
  width: 100%;
  height: auto;
}

#indexProductSlider .carousel-control-next-icon,
#indexProductSlider .carousel-control-prev-icon {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
}
.showAll{
  display: inline-block;
  padding:5px 20px;
  border: 1px solid gray;
  color: gray;
  text-decoration: none;
  transition: all 0.5s;  
}

.showAll:hover{
  background-color: black;
  color:white;
  text-decoration: none;  
}

</style>
