<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>商品列表</h1>
        <h1>
          <a class="btn btn-outline-secondary" href="#">新增商品</a>
        </h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品分類</th>
              <th scope="col">成本</th>
              <th scope="col">價格</th>
              <th scope="col">圖片</th>
              <th scope="col">狀態</th>
              <th scope="cole">庫存查詢</th>
              <th scope="col">商品編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="col">1</td>
              <td scope="col">西裝褲</td>
              <td scope="col">1</td>
              <td scope="col">100</td>
              <td scope="col">200</td>
              <td scope="col">
                <img src="https://lorempixel.com/500/500" style="max-width:100px" />
              </td>
              <td scope="col">上架</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-secondary">查詢</a>
              </td>
              <td scope="col">
                <a href="#" class="btn btn-outline-secondary">編輯</a>
              </td>
            </tr>
            <tr>
              <td scope="col">2</td>
              <td scope="col">t-shirt</td>
              <td scope="col">2</td>
              <td scope="col">100</td>
              <td scope="col">200</td>
              <td scope="col">
                <img src="https://lorempixel.com/500/500" style="max-width:100px" />
              </td>
              <td scope="col">下架</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-secondary">查詢</a>
              </td>
              <td scope="col">
                <a href="#" class="btn btn-outline-secondary">編輯</a>
              </td>
            </tr>
            <tr>
              <td scope="col">3</td>
              <td scope="col">牛仔褲</td>
              <td scope="col">3</td>
              <td scope="col">500</td>
              <td scope="col">600</td>
              <td scope="col">
                <img src="https://lorempixel.com/500/500" style="max-width:100px" />
              </td>
              <td scope="col">上架</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-secondary"><router-link :to="{name:'adminOrder', params:{ id:order.id }}">查詢</router-link></a>
              </td>
              <td scope="col">
                <a href="#" class="btn btn-outline-secondary">編輯</a>
              </td>
            </tr>
          </tbody>
        </table>
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