<template>
  <div>
    <admin-nav></admin-nav>
    <h3>Bernard的訂單</h3>
    <table class="table-responsive table-striped container mb-3">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>總計</th>
          <th>付款狀態</th>
          <th>運送狀態</th>
          <th>訂單狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1321564</td>
          <td>5000</td>
          <td>已付款</td>
          <td>已出貨</td>
          <td></td>
        </tr>
        <tr>
          <td>562485</td>
          <td>300</td>
          <td>未付款</td>
          <td>已出貨</td>
          <td></td>
        </tr>
        <tr>
          <td>7851</td>
          <td>5000</td>
          <td>已付款</td>
          <td>客戶已收到貨</td>
          <td></td>
        </tr>
        <tr>
          <td>548</td>
          <td>265648</td>
          <td>已付款</td>
          <td>已出貨</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="mb-5">
      <a href="#" class="btn btn-outline-primary">回上一頁</a>
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