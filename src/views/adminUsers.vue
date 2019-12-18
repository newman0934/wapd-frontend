<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>會員列表</h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">名稱</th>
              <th scope="col">電話</th>
              <th scope="col">Email</th>
              <th scope="col">住址</th>
              <th scope="col">身分</th>
              <th scope="col">訂單</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="col">1</td>
              <td scope="col">root</td>
              <td scope="col">09125454847</td>
              <td scope="col">root@gmail.com</td>
              <td scope="col">國父紀念館</td>
              <td scope="col">管理員</td>
              <td scope="col">
                <a class="btn btn-outline-success" href="#">歷史訂單</a>
              </td>
            </tr>
            <tr>
              <td scope="col">2</td>
              <td scope="col">admin</td>
              <td scope="col">09125454847</td>
              <td scope="col">admin@gmail.com</td>
              <td scope="col">中正紀念堂</td>
              <td scope="col">管理員</td>
              <td scope="col">
                <a class="btn btn-outline-success" href="#">歷史訂單</a>
              </td>
            </tr>
            <tr>
              <td scope="col">3</td>
              <td scope="col">Caesar</td>
              <td scope="col">09125454847</td>
              <td scope="col">user1@gmail.com</td>
              <td scope="col">總統府</td>
              <td scope="col">會員</td>
              <td scope="col">
                <a class="btn btn-outline-success" href="#">歷史訂單</a>
              </td>
            </tr>
            <tr>
              <td scope="col">4</td>
              <td scope="col">Vivian</td>
              <td scope="col">09125454847</td>
              <td scope="col">user2@gmail.com</td>
              <td scope="col">101</td>
              <td scope="col">會員</td>
              <td scope="col">
                <a class="btn btn-outline-success" href="#">歷史訂單</a>
              </td>
            </tr>
            <tr>
              <td scope="col">5</td>
              <td scope="col">Eason</td>
              <td scope="col">09125454847</td>
              <td scope="col">user3@gmail.com</td>
              <td scope="col">天臺</td>
              <td scope="col">會員</td>
              <td scope="col">
                <a class="btn btn-outline-success" href="#">歷史訂單</a>
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