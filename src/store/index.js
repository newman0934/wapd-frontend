/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'
import productsAPI from './../apis/products'
import { Toast } from "./../utils/helpers";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      phone: '',
      address: '',
      role: false
    },
    wishList: {
    },
    isAuthenticated: false,
    isProcessing: false,
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
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    WISHLIST(state, payload) {
      state.wishList = payload
    }
  },
  actions: {
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
    async fetchUserFavorite(context, userId) {
      try {
        const { data, statusText } = await usersAPI.getUserFavorite({ userId })
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        context.commit('WISHLIST', data.products);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得商品資訊，請稍後再試"
        });
      }
    },
    async addFavorite(context, productId, userId) {
      try {
        // this.isProcessing = true;
        const { data, statusText } = await productsAPI.addFavorite({
          productId
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "商品成功加入Wish List"
        });
        context.dispatch('fetchUserFavorite', userId)
        // this.isProcessing = false;
      } catch (error) {
        // this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "無法將商品加入Wish List，請稍後再試"
        });
      }
    },
    async deleteFavorite(context, productId, userId) {
      try {
        // this.isProcessing = true;
        const { data, statusText } = await productsAPI.deleteFavorite({
          productId
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "商品成功從Wish List移除"
        });
        context.dispatch('fetchUserFavorite', userId)
        // this.isProcessing = false;
      } catch (error) {
        // this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "無法將商品從Wish List移除，請稍後再試"
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
