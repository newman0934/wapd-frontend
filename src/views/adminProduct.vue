<template>
  <div>
    <admin-nav></admin-nav>
    <div class="table-responsive-md container">
      <h3 class="text-left">商品資訊</h3>
      <table class="table">
        <tbody>
          <tr>
            <td>名稱</td>
            <td colspan="3">西裝褲</td>
            <td>分類</td>
            <td>5</td>
          </tr>
          <tr>
            <td>成本</td>
            <td>420</td>
            <td>價格</td>
            <td>5640</td>
            <td>狀態</td>
            <td>上架</td>
          </tr>
          <tr>
            <td>產品描述</td>
            <td
              colspan="5"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum modi voluptatem tempore, nostrum dolorem omnis esse quo fugiat animi similique, mollitia assumenda maiores sint non hic nobis quaerat consectetur maxime voluptatibus eaque quasi exercitationem tempora aliquam? Velit deleniti, sed repellat vel assumenda aperiam fugiat id, distinctio ipsa quibusdam est laboriosam voluptates eos rem natus fugit inventore ea dicta dolore maiores facere quam? Deserunt necessitatibus voluptas adipisci inventore aperiam, id quos fuga assumenda est hic corrupti dolor ducimus aut nisi natus soluta quibusdam, molestias sunt ipsum doloremque libero vitae. Reprehenderit, sunt facere atque minus omnis unde corporis voluptates nihil culpa itaque?</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container adminProductImg">
      <div class="row">
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
        <div class="col-md-3 mb-3">
          <img src="https://lorempixel.com/500/500" alt />
        </div>
      </div>
    </div>
    <div class="container my-5">
      <div class="row justify-content-center">
        <a class="btn btn-outline-primary mx-3" href="#">回上一頁</a>
        <a class="btn btn-outline-primary mx-3" href="#">編輯商品</a>
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
<style scoped>
.adminProductImg img {
  width: 100%;
  height: auto;
}
</style>