<template>
  <div class="container py-5">
    <div class="alert alert-primary" role="alert">感謝您的訂購，確認信將會寄送到您的Email !</div>
    <div class="row">
      <div class="col-md-6">
        <h5 class="text-left mt-3">訂購人員</h5>
        <hr />
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">姓名</th>
              <td>name</td>
            </tr>
            <tr>
              <th scope="row">手機號碼</th>
              <td>0988888888</td>
            </tr>
            <tr>
              <th scope="row">連絡信箱</th>
              <td>user@example.com</td>
            </tr>
            <tr>
              <th scope="row">連絡地址</th>
              <td>address</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h5 class="text-left mt-3">收件人員</h5>
        <hr />
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">姓名</th>
              <td>name</td>
            </tr>
            <tr>
              <th scope="row">手機號碼</th>
              <td>0988888888</td>
            </tr>
            <tr>
              <th scope="row">連絡信箱</th>
              <td>user2@example.com</td>
            </tr>
            <tr>
              <th scope="row">寄件地址</th>
              <td>address</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--商品資訊-->
    <h5 class="text-left mt-3">結帳商品</h5>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">商品名稱</th>
          <th scope="col">價格</th>
          <th scope="col">數量</th>
          <th scope="col">小計</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <img
              src="https://picsum.photos/id/1004/5616/3744"
              class="img-fluid"
              alt="Responsive image"
              width="150px"
            />
          </th>
          <td class="align-middle">I'm Product</td>
          <td class="align-middle">NTD I'm Price</td>
          <td class="align-middle">Quantity</td>
          <td class="align-middle">NTD amount</td>
        </tr>

        <tr>
          <th scope="row">
            <img
              src="https://picsum.photos/id/1004/5616/3744"
              class="img-fluid"
              alt="Responsive image"
              width="150px"
            />
          </th>
          <td class="align-middle">I'm Product</td>
          <td class="align-middle">NTD I'm Price</td>
          <td class="align-middle">Quantity</td>
          <td class="align-middle">NTD amount</td>
        </tr>

        <tr class="table-light" style="border-top:3px gray solid;">
          <th></th>
          <td colspan="3">小計</td>
          <td>NTD I'm total</td>
        </tr>
        <tr class="table-light">
          <th></th>
          <td colspan="3">運費</td>
          <td>NTD amount</td>
        </tr>
        <tr class="table-light">
          <th></th>
          <td colspan="3">折扣</td>
          <td>NTD -amount</td>
        </tr>
        <tr class="table-info">
          <th></th>
          <td colspan="3">總計</td>
          <td>NTD amount</td>
        </tr>
      </tbody>
    </table>
    <button type="submit" class="btn btn-outline-secondary btn-block">繼續購物</button>
  </div>
</template>