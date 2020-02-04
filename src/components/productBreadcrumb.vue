<template>
  <div>
    <ul class="breadcrumb">
      <li>
        <router-link :to="{name:'index'}">Home</router-link>
        <span class="divider">></span>
      </li>
      <li>
        <router-link :to="{name:'products'}">購物商城</router-link>
        <span class="divider">></span>
      </li>
      <li>
        <router-link
          :to="{name:'products',query:{categoryId:path.categoryId}}"
        >{{path.categoryName}}</router-link>
        <span class="divider">></span>
      </li>
      <li class="active">{{path.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    path: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.path
    };
  }
};
</script>