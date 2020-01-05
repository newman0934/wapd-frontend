import { apiHelper } from '../utils/helpers'

export default {
  getUserCart({ userId }) {
    return apiHelper.get(`/users/${userId}/cart`)
  },
  deleteCartItem({ itemId }) {
    return apiHelper.delete(`users/cart/${itemId}`)
  },
  putCartItem({ userId, itemId, quantity }) {
    return apiHelper.put(`/users/${userId}/cart/${itemId}`,
      { quantity })
  },
  postCoupon({ couponCode }) {
    return apiHelper.post(`/coupon`, { couponCode })
  },
  postCart({ formData }) {
    return apiHelper.post(`/products/cart`, formData)
  },
  notLoginPostCart({ formData }) {
    return apiHelper.post(`/products/notLoginCart`, formData)
  },
  postOrder({ couponCode }) {
    return apiHelper.post(`/users/orders`, { couponCode })
  },
  getCheckout({ orderId }) {
    return apiHelper.get(`/orders/${orderId}/checkout`)
  },
  postCheckout({ formData }) {
    return apiHelper.post(`/orders/checkout`, formData)
  },
  getPayment(orderId) {
    return apiHelper.get(`/orders/${orderId}/payment`)
  },
  getPaymentComplete({ userId, Status, orderId }) {
    const searchParams = new URLSearchParams({ Status, orderId })
    return apiHelper.get(`/users/${userId}/paymentcomplete?${searchParams.toString()}`)
  }
}
