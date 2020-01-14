<template>
  <footer class="page-footer font-small indigo">
    <div class="container text-center text-md-left">
      <div class="row">
        <div class="col-md-4 m-auto w80">
          <facebook />
        </div>
        <!-- Grid column -->
        <div class="col-md-4 mx-auto">
          <!-- Links -->
          <h5 class="font-weight-bold text-uppercase mt-3 mb-4">information</h5>

          <ul class="list-unstyled">
            <li>
              <a href="#!">address</a>
            </li>
            <li>
              <a href="#!">phone</a>
            </li>
            <li>
              <a href="#!">email</a>
            </li>
          </ul>
        </div>
        <hr class="clearfix w-100 d-md-none" />

        <div class="row col-md-4 m-auto">
          <div>
            <a class="mr-4" href="#">
              <font-awesome-icon :icon="['fab', 'line']" size="3x" />
            </a>
          </div>
          <div>
            <a class="mr-4" href="#">
              <font-awesome-icon :icon="['fab', 'facebook']" size="3x" />
            </a>
          </div>
          <div>
            <a class="mr-4" href="#">
              <font-awesome-icon :icon="['fab', 'instagram']" size="3x" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-copyright text-center py-3">
      © 2019 Copyright:
      <span>Caesar & Vivian & Eason</span>
    </div>
  </footer>
</template>
<script>
import facebook from "./../components/facebook";
export default {
  components: {
    facebook
  }
};
</script>
<style>
footer {
  background-color: #958c8b;
  color: #3b1c15;
  font-size: 16px;
}

footer a {
  color: #ffffff;
  transition: all 0.5s;
}

footer a:hover {
  color: #3b1c15;
}
</style>
