<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-3" id="product-card">
      <router-link :to="{name:'product', params:{id:product.id}}">
        <div class="image-frame border rounded" style="height:23rem;line-height: 23rem;">
          <div style="vertical-align: middle;">
            <vue-load-image>
              <img
                slot="image"
                class="img-fluid"
                :src="cardImg"
                alt="card-image-cap"
                style="max-height=23rem;"
                @mouseover="imgMouseover(product.image)"
                @mouseleave="imgMouseleave(product.image)"
              />
              <img slot="preloader" class="img-fluid" src="./../static/1260x750.png" />
              <div slot="error" class="align-middle">圖片下載失敗</div>
            </vue-load-image>
          </div>
        </div>

        <div class="card-body p-1">
          <p class="card-title text-left text-dark">{{product.name}}</p>
        </div>
      </router-link>
      <div class="row ml-1 mt-0">
        <div class="col">
          <p class="price text-left">
            <span class="text-muted font-weight-bold mr-1">
              <del>{{product.origin_price | currency}}</del>
            </span>
            <strong>{{product.sell_price | currency}}</strong>
          </p>
        </div>

        <div v-if="isAuthenticated" class="col text-right position-relative">
          <div class="d-inline">
            <button
              v-if="product.isFavorited"
              type="button"
              class="btn text-danger mr-2 mt-n1"
              :disabled="isProcessing"
              @click.stop.prevent="deleteFavorite(product.id)"
            >
              <font-awesome-icon icon="heart" size="1x" />
            </button>
            <button
              v-else
              type="button"
              class="btn text-danger mr-2 mt-n1"
              :disabled="isProcessing"
              @click.stop.prevent="addFavorite(product.id)"
            >
              <font-awesome-icon :icon="['far', 'heart']" size="1x" />
            </button>
          </div>
        </div>

        <div v-else class="col text-right position-relative">
          <div class="d-inline">
            <button
              type="button"
              class="btn text-danger mr-2 mt-n1"
              data-container="body"
              data-toggle="popover"
              data-placement="bottom"
              data-content="立即登入/註冊"
              @mouseover="heartToggle"
            >
              <font-awesome-icon class="heart-icon" :icon="['far', 'heart']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { currencyFilter } from "../utils/mixins";
import VueLoadImage from "vue-load-image";
import $ from "jquery";
export default {
  mixins: [currencyFilter],
  components: {
    "vue-load-image": VueLoadImage
  },
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct,
      //colorSet: [],
      //sizeSet: [],
      cardImg: ""
    };
  },
  created() {
    //this.colorSet = this.fetchColorSet();
    //this.sizeSet = this.fetchSizeSet();
    this.cardImg = this.product.image[0].url;
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    isProcessing() {
      return this.$store.state.isProcessing;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    async addFavorite(productId) {
      try {
        await this.$store.dispatch("addFavorite", productId);
        this.product = {
          ...this.product,
          isFavorited: true
        };
      } catch (error) {
        return false;
      }
    },
    async deleteFavorite(productId) {
      try {
        await this.$store.dispatch("deleteFavorite", productId);
        this.product = {
          ...this.product,
          isFavorited: false
        };
      } catch (error) {
        return false;
      }
    },
    heartToggle() {
      $('[data-toggle="popover"]').popover();
    },
    imgMouseover(imgs) {
      this.cardImg = imgs[1].url;
    },
    imgMouseleave(imgs) {
      this.cardImg = imgs[0].url;
    }
    //fetchColorSet() {
    //  let colorUnique = new Set(this.product.color);
    //  return [...colorUnique];
    //},
    //fetchSizeSet() {
    //  let sizeUnique = new Set(this.product.size);
    //  return [...sizeUnique];
    //}
  }
};
</script>
<style lang="css" scoped>
#product-card {
  border: none;
}
.card-title {
  font-size: 1.1rem;
}
.mt-n1 {
  margin-top: -1.4rem !important;
}
.heart-icon {
  font-size: 1.2rem;
}
</style>