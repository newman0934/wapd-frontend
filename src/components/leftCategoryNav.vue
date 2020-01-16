<template>
  <div>
    <nav class="navbar navbar-expand-md">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div>
          <h5>分類</h5>
          <ul class="nav flex-column">
            <li class="nav-item d-flex justify-content-between align-items-center">
              <router-link class="nav-link" :to="{name:'products'}">所有商品</router-link>
              <!-- <span class="badge badge-primary badge-pill">14</span> -->
            </li>
            <li
              v-for="category in categories"
              :key="category.id"
              class="nav-item d-flex justify-content-between align-items-center"
            >
              <router-link
                class="nav-link"
                :to="{name:'products', query:{categoryId:category.id}}"
              >{{category.category}}</router-link>
              <!-- <span class="badge badge-primary badge-pill">14</span> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>