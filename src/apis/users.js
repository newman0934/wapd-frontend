import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  getUserOrders() {
    return apiHelper.get(`/users/orders`)
  },
  getUserOrder({ orderId }) {
    return apiHelper.get(`/users/orders/${orderId}`)
  },
  getUserFavorite() {
    return apiHelper.get(`/users/wishlist`)
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
  },
  putUser({ formData }) {
    return apiHelper.put(`/users/edit`, formData)
  }
}