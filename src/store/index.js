import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import usersAPI from './../apis/users'
import productsAPI from './../apis/products'
import cartsAPI from './../apis/carts'
import { Toast } from "./../utils/helpers";


Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      birthday: '',
      phone: '',
      address: '',
      role: false
    },
    wishList: {},
    cart: {},
    isAuthenticated: false,
    isProcessing: false,
    isLoading: true,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    updateCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    WISHLIST(state, payload) {
      state.wishList = payload
    },
    CART(state, payload) {
      state.cart = payload
    },
    PROCESSING(state, status) {
      state.isProcessing = status
    },
    LOADING(state, status) {
      state.isLoading = status
    }
  },
  actions: {
    updateProcessing(context, status) {
      context.commit('PROCESSING', status)
    },
    updateLoading(context, status) {
      context.commit("LOADING", status)
    },
    updateCurrentUser(context, currentUser) {
      context.commit("updateCurrentUser", currentUser)
    },
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          birthday: data.birthday,
          phone: data.phone,
          address: data.address,
          role: data.role
        })
        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    },
    async fetchUserFavorite(context) {
      try {
        const { data, statusText } = await usersAPI.getUserFavorite()
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        context.commit('WISHLIST', data.products);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得商品資訊，請稍後再試"
        });
      }
    },
    async addFavorite(context, productId) {
      try {
        context.dispatch("updateProcessing", true);
        const { data, statusText } = await productsAPI.addFavorite({
          productId
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        await context.dispatch('fetchUserFavorite')
        Toast.fire({
          icon: "success",
          title: "商品成功加入Wish List"
        });
        context.dispatch("updateProcessing", false);
      } catch (error) {
        context.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法將商品加入Wish List，請稍後再試"
        });
      }
    },
    async deleteFavorite(context, productId) {
      try {
        context.dispatch("updateProcessing", true);
        const { data, statusText } = await productsAPI.deleteFavorite({
          productId
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        await context.dispatch('fetchUserFavorite')
        Toast.fire({
          icon: "success",
          title: "商品成功從Wish List移除"
        });
        context.dispatch("updateProcessing", false);
      } catch (error) {
        context.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法將商品從Wish List移除，請稍後再試"
        });
      }
    },
    async fetchUserCart(context) {
      try {
        const { data, statusText } = await cartsAPI.getUserCart();
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        context.commit('CART', data.userCart.cartItem);
        // this.items = data.userCart.cartItem;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得使用者購物車資料，請稍後再試"
        });
      }
    }
  },
  getters: {
    wishList: state => state.wishList,
  },
  modules: {
  }
})
