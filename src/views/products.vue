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
          <!--productCard-->
          <productCard />
          <productCard />
          <productCard />
          <productCard />
          <productCard />
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
import productCard from "./../components/productCard";

export default {
  components: {
    leftCategoryNav,
    productCard
  },
  data() {
    return {
      proucts: [],
      categories: [],
      categoryId: "",
      currentPage: 1,
      totalPage: 0,
      isLoading: true
    };
  }
};
</script>