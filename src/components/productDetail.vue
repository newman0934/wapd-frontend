<template>
  <div>
    <form>
      <div class="row">
        <h1 class="product-name">I'm Product</h1>
      </div>
      <div class="row mb-4">
        <h5 class="product-price">$ I'm Price</h5>
      </div>

      <p>商品描述</p>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Size</button>
        </div>
        <select class="custom-select" name="size" id="size">
          <option selected>Choose...</option>
          <option value="1">M</option>
          <option value="2">L</option>
          <option value="3">Xl</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Color</button>
        </div>
        <select class="custom-select" name="color" id="color">
          <option selected>Choose...</option>
          <option value="1">red</option>
          <option value="2">brown</option>
          <option value="3">blue</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Quentity</button>
        </div>
        <input type="number" name="quentity" value="0" data-decimals="0" min="0" max="30" step="1" />
      </div>

      <button type="submit" class="btn btn-outline-secondary btn-block">Add to cart</button>
    </form>

    <!--product info-->
    <div class="accordion mt-3" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >尺寸建議</button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div
            class="card-body"
          >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciun</div>
        </div>
      </div>
      <!--card two end-->
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >退換貨須知</button>
          </h2>
        </div>
        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div
            class="card-body"
          >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee</div>
        </div>
      </div>
      <!--card three end-->
    </div>
  </div>
</template>