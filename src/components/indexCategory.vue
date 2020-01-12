<template>
  <div class="container indexCategory">
    <div class="row">
      <div v-for="item in data" :key="item.id" class="col-sm-4 p-3">
        <vue-load-image>
          <img slot="image" :src="item.image" />
          <img slot="preloader" height="600px" width="400px" src="./../static/1260x750.png" />
          <div slot="error" class="cd-block w-100">圖片下載失敗</div>
        </vue-load-image>
        <a href="#" class="mask">{{item.category}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import VueLoadImage from "vue-load-image";
const categoryData = [
  {
    id: 1,
    category: "西服",
    image: "https://lorempixel.com/600/400"
  },
  {
    id: 2,
    category: "上衣",
    image: "https://lorempixel.com/600/400"
  },
  {
    id: 3,
    category: "褲子",
    image: "https://lorempixel.com/600/400"
  }
];
export default {
  components: {
    "vue-load-image": VueLoadImage
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.data = categoryData;
  }
};
</script>
<style>
.indexCategory img {
  width: 100%;
  height: auto;
}
.indexCategory .col-sm-4 {
  position: relative;
}
.indexCategory .mask {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0);
  transition: all 0.5s;
}
.indexCategory .mask:hover {
  background-color: rgba(100, 100, 100, 0.5);
  color: white;
  font-size: 40px;
}
</style>