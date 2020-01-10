<template>
<div class="container pt-5">
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item">
      <router-link :to="{name:'adminProducts'}" class="nav-link">商品</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name:'adminOrders'}" class="nav-link">訂單</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name:'adminUsers'}" class="nav-link">會員</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name:'adminCategories'}" class="nav-link">類別</router-link>
    </li>
        <li class="nav-item">
      <router-link :to="{name:'adminCoupon'}" class="nav-link">優惠碼</router-link>
    </li>
  </ul>
</div>
</template>