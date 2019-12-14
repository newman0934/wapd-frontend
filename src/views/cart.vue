<template>
  <div class="container py-5">
    <h1>My Cart</h1>
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
          <td>I'm Product</td>
          <td>NTD I'm Price</td>
          <td>
            <input
              type="number"
              name="quentity"
              value="0"
              data-decimals="0"
              min="0"
              max="30"
              step="1"
            />
          </td>
          <td>NTD amount</td>
          <button type="submit" class="btn btn-outline-danger">Ｘ</button>
        </tr>
        <th scope="row"></th>
        <td colspan="3">小計</td>
        <td>NTD I'm total</td>
      </tbody>
    </table>

    <button type="submit" class="btn btn-outline-secondary btn-block">CheckOut</button>
  </div>
</template>