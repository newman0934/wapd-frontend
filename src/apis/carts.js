import { apiHelper } from '../utils/helpers'

export default {
  getUserCart({ userId }) {
    return apiHelper.get(`/users/${userId}/cart`)
  },
  deleteCartItem({ itemId }) {
    return apiHelper.delete(`users/cart/${itemId}`)
  },
  putCartItem({ userId, itemId, formData }) {
    return apiHelper.put(`/users/${userId}/cart/${itemId}`, formData)
  },
  postCart({ formData }) {
    return apiHelper.post(`/products/cart`, formData)
  }
}