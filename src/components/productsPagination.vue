<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-show="previousPage" class="page-item">
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{name:'products', query:{categoryId, page:previousPage}}"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <li
        v-for="page in totalPage"
        :key="page"
        class="page-item"
        :class="['page-item', {active: currentPage === page}]"
      >
        <router-link class="page-link" :to="{name:'products', query:{categoryId, page}}">{{page}}</router-link>
      </li>
      <li v-show="nextPage" class="page-item">
        <router-link
          class="page-link"
          aria-label="Next"
          :to="{name:'products', query:{categoryId, page: nextPage}}"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    categoryId: {
      type: Number,
      default: -1
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: -1
    }
  },
  computed: {
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    }
  }
};
</script>