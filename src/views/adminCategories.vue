<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>分類列表</h1>
        <form class="my-4">
          <div class="form-row">
            <div class="col-auto">
              <input type="text" class="form-control" placeholder="新增類別..." />
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary">新增</button>
            </div>
          </div>
        </form>
      </div>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">類別名稱</th>
            <th scope="col">編輯</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">1</th>
            <th scope="col">西裝</th>
            <th scope="col">
              <a class="btn btn-outline-primary" href="#">編輯</a>
            </th>
            <th scope="col">
              <a class="btn btn-outline-danger" href="#">刪除</a>
            </th>
          </tr>
          <tr>
            <th scope="col">2</th>
            <th scope="col">上衣</th>
            <th scope="col">
              <a class="btn btn-outline-primary" href="#">編輯</a>
            </th>
            <th scope="col">
              <a class="btn btn-outline-danger" href="#">刪除</a>
            </th>
          </tr>
          <tr>
            <th scope="col">3</th>
            <th scope="col">褲子</th>
            <th scope="col">
              <a class="btn btn-outline-primary" href="#">編輯</a>
            </th>
            <th scope="col">
              <a class="btn btn-outline-danger" href="#">刪除</a>
            </th>
          </tr>
          <tr>
            <th scope="col">4</th>
            <th scope="col">鞋子</th>
            <th scope="col">
              <a class="btn btn-outline-primary" href="#">編輯</a>
            </th>
            <th scope="col">
              <a class="btn btn-outline-danger" href="#">刪除</a>
            </th>
          </tr>
        </tbody>
      </table>
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