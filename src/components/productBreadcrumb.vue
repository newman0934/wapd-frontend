<template>
  <div>
    <ul class="breadcrumb">
      <li>
        <a href="#">Home</a>
        <span class="divider">></span>
      </li>
      <li>
        <a href="#">store</a>
        <span class="divider">></span>
      </li>
      <li>
        <a href="#">{{path.categoryName}}</a>
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