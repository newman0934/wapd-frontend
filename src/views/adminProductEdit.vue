<template>
  <div>
    <admin-nav></admin-nav>
    <form class="container mb-5">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="productName">名稱</label>
          <input type="text" class="form-control" id="productName" placeholder="商品名稱" />
        </div>
        <div class="form-group col-md-6">
          <label for="productCategory">分類</label>
          <select name="productCategory" id="productCategory" class="form-control">
            <option>衣服</option>
            <option>鞋子</option>
            <option>褲子</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="productCost">成本</label>
          <input
            type="text"
            name="productCost"
            id="productCost"
            class="form-control"
            placeholder="商品成本"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="productPrice">價格</label>
          <input
            type="text"
            name="productPrice"
            id="productPrice"
            class="form-control"
            placeholder="商品價格"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="productStatus">目前狀態</label>
          <select name="productStatus" id="productStatus" class="form-control">
            <option>上架</option>
            <option>下架</option>
          </select>
        </div>
        <div class="form-group col-md-12">
          <label for="productDescription">產品描述</label>
          <textarea
            name="productDescription"
            id="productDescription"
            class="form-control"
            cols="120"
            rows="3"
            placeholder="請輸入商品的簡介"
          ></textarea>
        </div>
        <div class="form-group col-md-12">
          <label for="productDescription">商品圖片</label>
          <input type="file" class="form-control" name="productDescription" id="productDescription" />
        </div>
      </div>
      <div class="container adminProductImg">
        <div class="row">
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
          <div class="prodcutImg col-md-3 mb-3">
            <img src="https://lorempixel.com/500/500" alt />
            <div class="mask">X</div>
          </div>
        </div>
      </div>
      <a href="#" class="btn btn-primary mx-3">回上一頁</a>
      <button type="submit" class="btn btn-primary mx-3">確認修改</button>
    </form>
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
<style scoped>
img {
  width: 100%;
  height: auto;
}
.adminProductImg .prodcutImg {
  position: relative;
}
.prodcutImg .mask {
  display: flex;
  position: absolute;
    justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity:0;
  transition: all 0.5s;
}
.prodcutImg .mask:hover {
  color: red;
  opacity:1;
  font-size: 200px;
  cursor: pointer;
}
</style>