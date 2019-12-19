<template>
  <div>
    <adminNav />
    <div class="container">
      <h3 class="text-left my-5">商品9</h3>
      <div class="text-left">
        <a href="#" class="btn btn-outline-primary mb-5 p-2">新增種類</a>
      </div>
      <div class="table-responsive-md mb-5">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">顏色</th>
              <th scope="col">尺寸</th>
              <th scope="col">存貨</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="col">1</td>
              <td scope="col">red</td>
              <td scope="col">S</td>
              <td scope="col">10</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-dark">編輯</a>
              </td>
            </tr>
            <tr>
              <td scope="col">2</td>
              <td scope="col">red</td>
              <td scope="col">M</td>
              <td scope="col">21</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-dark">編輯</a>
              </td>
            </tr>
            <tr>
              <td scope="col">3</td>
              <td scope="col">red</td>
              <td scope="col">L</td>
              <td scope="col">8</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-dark">編輯</a>
              </td>
            </tr>
            <tr>
              <td scope="col">4</td>
              <td scope="col">blue</td>
              <td scope="col">S</td>
              <td scope="col">22</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-dark">編輯</a>
              </td>
            </tr>
            <tr>
              <td scope="col">5</td>
              <td scope="col">black</td>
              <td scope="col">M</td>
              <td scope="col">22</td>
              <td scope="col">
                <a href="#" class="btn btn-outline-dark">編輯</a>
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