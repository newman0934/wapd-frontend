<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>訂單列表</h1>
      </div>

      <table class="table-responsive table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">訂購會員ID</th>
            <th scope="col">收件人</th>
            <th scope="col">收件人電話</th>
            <th scope="col">訂單編號</th>
            <th scope="col">數量</th>
            <th scope="col">價格</th>
            <th scope="col">付款方式</th>
            <th scope="col">付款狀態</th>
            <th scope="col">出貨狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">1</th>
            <th scope="col">3</th>
            <th scope="col">Caesasr</th>
            <th scope="col">0911111111</th>
            <th scope="col">55612548</th>
            <th scope="col">3</th>
            <th scope="col">1000</th>
            <th scope="col">信用卡</th>
            <th scope="col">已付款</th>
            <th scope="col">未出貨</th>
          </tr>
          <tr>
            <th scope="col">1</th>
            <th scope="col">3</th>
            <th scope="col">Caesasr</th>
            <th scope="col">0911111111</th>
            <th scope="col">55612548</th>
            <th scope="col">3</th>
            <th scope="col">1000</th>
            <th scope="col">信用卡</th>
            <th scope="col">付款失敗</th>
            <th scope="col">未出貨</th>
          </tr>
          <tr>
            <th scope="col">1</th>
            <th scope="col">3</th>
            <th scope="col">Caesasr</th>
            <th scope="col">0911111111</th>
            <th scope="col">55612548</th>
            <th scope="col">3</th>
            <th scope="col">1000</th>
            <th scope="col">貨到付款</th>
            <th scope="col">已付款</th>
            <th scope="col">未出貨</th>
          </tr>
          <tr>
            <th scope="col">1</th>
            <th scope="col">3</th>
            <th scope="col">Caesasr</th>
            <th scope="col">0911111111</th>
            <th scope="col">55612548</th>
            <th scope="col">3</th>
            <th scope="col">1000</th>
            <th scope="col">信用卡</th>
            <th scope="col">已付款</th>
            <th scope="col">未出貨</th>
          </tr>
          <tr>
            <th scope="col">1</th>
            <th scope="col">3</th>
            <th scope="col">Caesasr</th>
            <th scope="col">0911111111</th>
            <th scope="col">55612548</th>
            <th scope="col">3</th>
            <th scope="col">1000</th>
            <th scope="col">信用卡</th>
            <th scope="col">已付款</th>
            <th scope="col">未出貨</th>
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