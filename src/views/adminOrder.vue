<template>
  <div class="adminOrder">
    <admin-nav></admin-nav>
    <table class="userInfo table-responsive-md container mb-5">
      <tbody>
        <tr>
          <td class="font-weight-bold">訂單編號</td>
          <td>12345678</td>
          <td class="font-weight-bold">收件人</td>
          <td>Caesar</td>
          <td class="font-weight-bold">收件人電話</td>
          <td>0911111111</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Email</td>
          <td>text@gmail.com</td>
          <td class="font-weight-bold">付款方式</td>
          <td>信用卡</td>
          <td class="font-weight-bold">付款狀態</td>
          <td>已支付</td>
        </tr>
        <tr>
          <td class="font-weight-bold">配送方式</td>
          <td>便利商店</td>
          <td class="font-weight-bold">配送地址</td>
          <td>全家中山店</td>
          <td class="font-weight-bold">優惠券</td>
          <td>開發者優惠</td>
        </tr>
      </tbody>
    </table>
    <div class="container">
      <h3 class="text-left">訂購商品</h3>
      <table class="table">
        <thead>
          <tr>
            <th>商品編號</th>
            <th>品名</th>
            <th>顏色</th>
            <th>尺寸</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>西裝外套</td>
            <td>黑</td>
            <td>M</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>55</td>
            <td>西裝褲子</td>
            <td>黑</td>
            <td>M</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>66</td>
            <td>西裝襯衫</td>
            <td>白</td>
            <td>M</td>
            <td>1000</td>
          </tr>
        </tbody>
      </table>
      <div class="container text-right">
        <h3 class="my-2">
          原價：
          <span>3000</span>
        </h3>
        <h3 class="my-2">
          折扣：-
          <span>2000</span>
        </h3>
        <h3 class="my-2">
          金額：
          <span>1000</span>
        </h3>
      </div>
      <div class="container text-left">
        <h3>備註</h3>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, nam voluptates fugiat ut doloribus voluptatem aspernatur cumque sed maxime libero dicta odio hic. Sequi nihil, laudantium est culpa quo libero, facere rem at perferendis error vel possimus perspiciatis? Ipsa dolorum rem tenetur non illo deleniti, nihil error id provident dolores aperiam aspernatur recusandae, quaerat enim perferendis numquam eligendi nostrum inventore beatae officia, mollitia iusto eaque! Voluptate et recusandae magni commodi laborum quae beatae illum eligendi a autem architecto ex deserunt quasi, corrupti, praesentium mollitia soluta repudiandae eveniet totam, suscipit aut! Quos quam suscipit quae necessitatibus vel distinctio molestias quaerat cum.</div>
      </div>
    </div>
    <div class="container">
      <a href="#" class="btn btn-outline-success mx-3 my-5">回上一頁</a>
      <a href="#" class="btn btn-outline-success mx-3 my-5">編輯訂單</a>
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
.userInfo tbody tr {
  border: none ;
}

.adminOrder a {
  display: inline-block;
}
</style>