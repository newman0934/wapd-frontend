import { apiHelper } from '../utils/helpers'

export default {
  getProduct({ productId }) {
    return apiHelper.get(`/products/${productId}`)
  }
}