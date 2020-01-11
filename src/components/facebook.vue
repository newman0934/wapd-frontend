<template>
  <div class="container">
    <iframe
      :src="src"
      width="340"
      height="120"
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: ""
    };
  },
  computed: {
    appSRC() {
      let id = Number(process.env.VUE_APP_FACEBOOK);
      return `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKGT-%E5%B0%8F%E5%BA%B5%E7%9A%84%E5%BA%97-405388429508237&tabs&width=340&height=120&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=${id}`;
    }
  },
  created() {
    this.src = this.appSRC;
  }
};
</script>