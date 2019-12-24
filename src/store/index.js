/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'
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
      favoriteProducts: []
    },
    isAuthenticated: false,
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
        console.log(data.products)
        context.commit('WISHLIST', data.products);
      } catch (error) {
        console.log(error)
        Toast.fire({
          type: "error",
          title: "無法取得商品資訊，請稍後再試"
        });
      }
    }
  },
  modules: {
  }
})
