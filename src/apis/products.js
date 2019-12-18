import { apiHelper } from '../utils/helpers'

export default {
  getProducts({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/products?${searchParams.toString()}`)
  },
  getProduct({ productId }) {
    return apiHelper.get(`/products/${productId}`)
  }
}