import { apiHelper } from '../utils/helpers'

export default {
  getProducts({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/products?${searchParams.toString()}`)
  },
  getProduct({ productId }) {
    return apiHelper.get(`/products/${productId}`)
  },
  addFavorite({ productId }) {
    return apiHelper.post(`/products/${productId}/wishlist`, null)
  },
  deleteFavorite({ productId }) {
    return apiHelper.delete(`/products/${productId}/wishlist`)
  }
}