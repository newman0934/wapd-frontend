<template>
  <div class="container py-5">
    <form>
      <h5 class="text-left">結帳提醒</h5>
      <hr />
      <p
        class="text-left w-80 ml-3"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, doloremque! Explicabo cum fuga sunt inventore nulla quas repellendus, id placeat voluptate exercitationem suscipit possimus magni cumque libero ab assumenda nam?</p>
      <h5 class="text-left">選擇物流</h5>
      <hr />
      <div class="ml-3 text-left">
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="pay-by-atm" id="atm" value="option1" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="pay-by-atm" id="atm" value="option1" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
      </div>

      <h5 class="text-left mt-3">選擇金流</h5>
      <hr />
      <div class="ml-3 text-left">
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="pay-by-atm" id="atm" value="option1" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="pay-by-atm" id="atm" value="option1" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
      </div>
      <!-- 
      <h5 class="text-left mt-3">使用折扣碼</h5>
      <hr />
      <form class="form-inline ml-3">
        <div class="form-group mx-sm-3">
          <label for="input-coupon" class="sr-only">輸入優惠序號</label>
          <input type="text" class="form-control" id="coupon" placeholder="Enter coupon code" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>-->

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
      <div class="row">
        <div class="col-md-6">
          <h5 class="text-left mt-3">訂購人員</h5>
          <hr />
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row">姓名</th>
                <td>
                  <input
                    type="text"
                    id="order-name"
                    name="order-name"
                    class="form-control"
                    placeholder="name"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">手機號碼</th>
                <td>
                  <input
                    type="text"
                    id="order-phone"
                    name="order-phone"
                    class="form-control"
                    placeholder="phone number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">連絡信箱</th>
                <td>
                  <input
                    type="text"
                    id="order-email"
                    name="order-email"
                    class="form-control"
                    placeholder="email"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">連絡地址</th>
                <td>
                  <input
                    type="text"
                    id="order-address"
                    name="order-address"
                    class="form-control"
                    placeholder="address"
                  />
                </td>
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
                <td>
                  <input
                    type="text"
                    id="receiver-name"
                    name="receiver-name"
                    class="form-control"
                    placeholder="name"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">手機號碼</th>
                <td>
                  <input
                    type="text"
                    id="receiver-phone"
                    name="receiver-phone"
                    class="form-control"
                    placeholder="phone number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">連絡信箱</th>
                <td>
                  <input
                    type="text"
                    id="receiver-email"
                    name="receiver-email"
                    class="form-control"
                    placeholder="email"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">寄件地址</th>
                <td>
                  <input
                    type="text"
                    id="receiver-address"
                    name="receiver-address"
                    class="form-control"
                    placeholder="address"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button type="submit" class="btn btn-outline-secondary btn-block">確認訂單</button>
    </form>
  </div>
</template>