<template>
  <div>
    <form @submit.stop.prevent="addToCartSubmit">
      <div class="row">
        <h1 class="product-name">{{product.name}}</h1>
      </div>
      <div class="row mb-4">
        <h5 class="product-price">NTD {{product.sellPrice}}</h5>
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

    <div class="mt-3" v-if="isAuthenticated">
      <button
        v-if="product.isFavorited"
        type="button"
        class="btn btn-danger btn-border btn-block mr-2"
        :disabled="isProcessing"
        @click.stop.prevent="deleteFavorite(product.id)"
      >-wish list</button>
      <button
        v-else
        type="button"
        class="btn btn-danger btn-border btn-block mr-2"
        :disabled="isProcessing"
        @click.stop.prevent="addFavorite(product.id)"
      >+wish list</button>
    </div>

    <!--product info-->
    <div class="accordion mt-3" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >尺寸建議</button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div
            class="card-body"
          >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciun</div>
        </div>
      </div>
      <!--card two end-->
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >退換貨須知</button>
          </h2>
        </div>
        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div
            class="card-body"
          >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee</div>
        </div>
      </div>
      <!--card three end-->
    </div>
  </div>
</template>
<script>
import cartsAPI from "./../apis/carts";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
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
      color: "",
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
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
      if (!this.color || !this.size || !this.quantity) {
        Toast.fire({
          type: "warning",
          title: "請確認顏色、尺寸、數量皆需填寫！"
        });
        return;
      }
      const formData = this.formData;
      try {
        const { data, statusText } = await cartsAPI.postCart({ formData });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        //update vuex
        await this.$store.dispatch("fetchUserCart", this.currentUser.id);
        Toast.fire({
          type: "success",
          title: "商品已加入購物車"
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
