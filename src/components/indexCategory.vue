<template>
  <div class="container indexCategory">
    <div class="row">
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="single-banner mb-20 mb-3">
          <div class="banner-img">
            <vue-load-image>
              <img slot="image" src="https://i.imgur.com/29i3jLA.jpg" />
              <img slot="preloader" height="323px" width="275px" src="./../static/1260x750.png" />
              <div slot="error" class="cd-block w-100">圖片下載失敗</div>
            </vue-load-image>
            <router-link :to="{name:'products',query:{categoryId:21}}" class="mask">上衣</router-link>
          </div>
        </div>
        <div class="single-banner mb-3">
          <div class="banner-img">
            <vue-load-image>
              <img
                slot="image"
                src="https://demo.hasthemes.com/mimosa-preview/mimosa/img/banner/1.jpg"
              />
              <img slot="preloader" height="207px" width="275px" src="./../static/1260x750.png" />
              <div slot="error" class="cd-block w-100">圖片下載失敗</div>
            </vue-load-image>
            <a href="#" class="mask">comming soon</a>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 pull-right">
        <div class="single-banner mb-20">
          <div class="banner-img">
            <vue-load-image>
              <img
                slot="image"
                src="https://demo.hasthemes.com/mimosa-preview/mimosa/img/banner/5.jpg"
              />
              <img slot="preloader" height="207px" width="275px" src="./../static/1260x750.png" />
              <div slot="error" class="cd-block w-100">圖片下載失敗</div>
            </vue-load-image>
            <a href="#" class="mask">comming soon</a>
          </div>
        </div>
        <div class="single-banner mb-3">
          <div class="banner-img">
            <vue-load-image>
              <img slot="image" src="https://i.imgur.com/qVBy4mB.jpg" />
              <img slot="preloader" height="323px" width="275px" src="./../static/1260x750.png" />
              <div slot="error" class="cd-block w-100">圖片下載失敗</div>
            </vue-load-image>
            <router-link :to="{name:'products',query:{categoryId:11}}" class="mask">褲子</router-link>
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <div class="single-banner">
          <vue-load-image>
            <img slot="image" src="https://i.imgur.com/qeIQATh.jpg" />
            <img slot="preloader" height="550px" width="580px" src="./../static/1260x750.png" />
            <div slot="error" class="cd-block w-100">圖片下載失敗</div>
          </vue-load-image>
          <router-link :to="{name:'products',query:{categoryId:31}}" class="mask">西裝</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueLoadImage from "vue-load-image";
export default {
  components: {
    "vue-load-image": VueLoadImage
  }
};
</script>
<style>
.single-banner {
  position: relative;
  overflow: hidden;
}
.mb-20 {
  margin-bottom: 20px !important;
}
.pull-right {
  float: right;
}
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