<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <h5>訂單編號#sn</h5>
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
      </div>
      <!--訂購人資訊-->
      <div class="col-md-4">
        <h5>訂購資料</h5>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">收件人</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">收件地址</th>
              <td>address</td>
            </tr>
            <tr>
              <th scope="row">收件電話</th>
              <td>0988888888</td>
            </tr>
            <tr>
              <th scope="row">運送方式</th>
              <td>#追蹤單號</td>
            </tr>
            <tr>
              <th scope="row">出貨時間</th>
              <td>@Date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>