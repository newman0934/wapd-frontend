<template>
  <div>
    <form @submit.stop.prevent="addToCartSubmit">
      <div class="text-left">
        <h2 class="product-name">{{product.name}}</h2>
      </div>
      <div class="d-flex flex-row mb-4">
        <div class="text-left text-muted mr-2">
          <p class="product-price">
            <del>{{product.sellPrice | currency}}</del>
          </p>
        </div>
        <div class="text-left">
          <h5 class="product-price">{{product.sellPrice | currency}}</h5>
        </div>
      </div>

      <p>{{product.description}}</p>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Size</button>
        </div>
        <select class="custom-select" name="size" id="size" v-model="size">
          <option selected>Choose...</option>
          <option v-for="size in product.sizeSet" :key="size" :value="size">{{size}}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Color</button>
        </div>
        <select class="custom-select" name="color" id="color" v-model="color">
          <option selected>Choose...</option>
          <option v-for="color in product.colorSet" :key="color" :value="color">{{color}}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Quantity</button>
        </div>
        <input
          type="number"
          name="quentity"
          v-model="quantity"
          value="0"
          data-decimals="0"
          min="0"
          max="10"
          step="1"
          required
        />
      </div>

      <button type="submit" class="btn btn-outline-secondary btn-block">Add to cart</button>
    </form>

    <div class="mt-1" v-if="isAuthenticated">
      <button
        v-if="product.isFavorited"
        type="button"
        class="btn btn-sm text-danger btn-block mr-2"
        :disabled="isProcessing"
        @click.stop.prevent="deleteFavorite(product.id)"
      >
        <font-awesome-icon class="mr-1" icon="heart" size="1x" />已加入 Wish List
      </button>
      <button
        v-else
        type="button"
        class="btn btn-sm text-danger btn-block mr-2"
        :disabled="isProcessing"
        @click.stop.prevent="addFavorite(product.id)"
      >
        <font-awesome-icon class="mr-1" :icon="['far', 'heart']" size="1x" />加入 Wish List
      </button>
    </div>

    <div v-else class="mt-1">
      <button
        type="button"
        class="btn btn-sm text-danger btn-block mr-2"
        data-container="body"
        data-toggle="popover"
        data-placement="bottom"
        data-content="立即登入/註冊"
        @mouseover="heartToggle"
      >
        <font-awesome-icon class="mr-1" :icon="['far', 'heart']" size="1x" />加入 Wish List
      </button>
    </div>

    <div class="ml-2 mt-4 text-left">
      <p class="d-inline">分享到：</p>
      <social-sharing :url="currentURL" class="d-inline" inline-template>
        <div id="sharing-icon">
          <network class="mr-2 text-primary" network="facebook">
            <font-awesome-icon :icon="['fab', 'facebook']" size="2x" />
          </network>
          <network class="text-success" network="line">
            <font-awesome-icon :icon="['fab', 'line']" size="2x" />
          </network>
        </div>
      </social-sharing>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import cartsAPI from "./../apis/carts";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import { currencyFilter } from "../utils/mixins";
export default {
  mixins: [currencyFilter],
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct,
      quantity: 0,
      size: "",
      color: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isProcessing"]),
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    formData() {
      const { size, color, quantity } = this;
      return {
        productId: this.product.id,
        size,
        color,
        quantity
      };
    },
    currentURL() {
      const baseURL = "https://newman0934.github.io/wapd-frontend/#";
      let path = this.$route.path;
      return baseURL + path;
      // return "https://www.chickimmiu.com/products/t1901132";
    }
  },
  watch: {
    initialProduct(product) {
      this.product = {
        ...this.product,
        ...product
      };
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
    async addToCartSubmit() {
      if (!this.color || !this.size) {
        Toast.fire({
          icon: "warning",
          title: "請確認顏色、尺寸、數量皆需填寫！"
        });
        return;
      }
      if (this.quantity <= 0 && this.quantity >= 10) {
        Toast.fire({
          icon: "warning",
          title: "請確認確認數量喔！"
        });
        return;
      }
      const formData = this.formData;
      try {
        if (this.isAuthenticated) {
          const { data, statusText } = await cartsAPI.postCart({ formData });
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          //update vuex
          await this.$store.dispatch("fetchUserCart", this.currentUser.id);
          Toast.fire({
            icon: "success",
            title: "商品已加入購物車"
          });
        } else {
          const { data, statusText } = await cartsAPI.notLoginPostCart({
            formData
          });
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          Toast.fire({
            icon: "success",
            title: "商品已加入購物車，請登入查看購物車"
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "商品暫時無法加入購物車，請稍後再試"
        });
      }
    },
    heartToggle() {
      $('[data-toggle="popover"]').popover();
    }
  }
};
</script>
<style lang="css" scoped>
#sharing-icon {
  cursor: pointer;
}
</style>
