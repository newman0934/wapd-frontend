<template>
  <div class="container py-5">
    <!--NavTabs-->
    <div class="row">
      <div class="col-md-2">
        <!--leftCategoryNav-->
        <h5>分類</h5>
        <leftCategoryNav />
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-12">
            <productBreadcrumb />
          </div>
          <div class="col-md-8">
            <productCarousel />
          </div>
          <div class="col-md-4">
            <productDetail />
          </div>
          <div class="col-md-12">
            <productGallery />
          </div>
        </div>
      </div>
    </div>

    <!--productsPagination-->

    <!--footer-->
  </div>
</template>
<script>
/* eslint-disable */
import leftCategoryNav from "./../components/leftCategoryNav";
import productBreadcrumb from "./../components/productBreadcrumb";
import productCarousel from "./../components/productCarousel";
import productDetail from "./../components/productDetail";
import productGallery from "./../components/productGallery";

export default {
  components: {
    leftCategoryNav,
    productBreadcrumb,
    productCarousel,
    productDetail,
    productGallery
  }
};
</script>