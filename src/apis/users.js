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
  },
  deleteCartItem({ itemId }) {
    return apiHelper.delete(`users/cart/${itemId}`)
  },
  postPasswordChange({ formData }) {
    return apiHelper.post(`/users/password_change`, formData)
  },
  postPasswordForget({ formData }) {
    return apiHelper.post(`/users/password_forget`, formData)
  },
  getResetPassword({ tokenId, token }) {
    return apiHelper.get(`/users/password_reset/${tokenId}/${token}`)
  },
  postResetPassword({ formData }) {
    return apiHelper.post(`/users/password_reset`, formData)
  }
}