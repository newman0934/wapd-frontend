<template>
  <div class="content-to-hide">
    <h5>分類</h5>
    <nav class="navbar navbar-light">
      <ul class="navbar-nav flex-column">
        <li
          class="nav-item d-flex justify-content-between align-items-center"
          :class="{'active': currentCategory == 'all'}"
        >
          <router-link class="nav-link" :to="{name:'products'}">所有商品</router-link>
        </li>
        <li
          v-for="category in categories"
          :key="category.id"
          :class="{'active': currentCategory == category.id}"
          class="nav-item d-flex justify-content-between align-items-center"
        >
          <router-link
            class="nav-link"
            :to="{name:'products', query:{categoryId:category.id}}"
          >{{category.category}}</router-link>
        </li>
      </ul>
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
  },
  computed: {
    currentCategory() {
      let query = this.$route.query;
      if (query) {
        return query;
      } else {
        return "all";
      }
    }
  }
};
</script>
<style lang="css">
@media (max-width: 720px) {
  .content-to-hide {
    display: none;
  }
}
</style>