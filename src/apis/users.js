import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  getUserOrders({ userId }) {
    return apiHelper.get(`/users/${userId}/orders`)
  },
  getUserOrder({ userId, orderId }) {
    return apiHelper.get(`/users/${userId}/orders/${orderId}`)
  },
  getUserFavorite({ userId }) {
    return apiHelper.get(`/users/${userId}/wishlist`)
  },
  getUserCart({ userId }) {
    return apiHelper.get(`/users/${userId}/cart`)
  }
}