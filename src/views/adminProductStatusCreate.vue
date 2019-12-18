<template>
  <div>
    <adminNav />
    <div class="container">
      <div class="col-sm-6 mx-auto">
        <h3>商品9</h3>
        <form class="mb-5">
          <div class="form-group row">
            <label for="productSize" class="col-sm-2 col-form-label">尺寸</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productSize"
                name="productSize"
                value="商品尺寸"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="productColor" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productColor"
                name="productColor"
                placeholder="商品顏色"
              />
            </div>
          </div>
          <a href="#" class="btn btn-primary mx-3">回上一頁</a>
          <button type="submit" class="btn btn-primary mx-3">送出</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "./../components/adminNav";
export default {
  components: {
    adminNav
  }
};
</script>