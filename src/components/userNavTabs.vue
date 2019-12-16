<template>
  <div>
    <div class="card border-white w-100">
      <div class="card-img user-bg">
        <img src="https://picsum.photos/id/177/2515/1830" class="img-fluid" alt="user-bg" />
      </div>
      <div class="card-img-overlay mt-5">
        <h4>Hi, user@example.com</h4>
      </div>
    </div>
    <ul class="nav nav-tabs mt-2">
      <li class="nav-item">
        <a class="nav-link active" href="#">訂單查詢</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">帳號管理</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">重設密碼</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Wish List</a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.user-bg {
  height: 150px;
  overflow: hidden;
}

.user-bg img {
  margin-top: -5%;
  opacity: 0.7;
  filter: alpha(opacity=70);
}
</style>