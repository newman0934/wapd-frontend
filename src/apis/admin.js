import { apiHelper } from "./../utils/helpers";

export default {
  categories: {
    get() {
      return apiHelper.get("/admins/categories");
    },
    create({ category }) {
      return apiHelper.post("/admins/categories", { category });
    },

    update({ categoryId, category }) {
      return apiHelper.put(`/admins/categories/${categoryId}`, { category });
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admins/categories/${categoryId}`);
    }
  },
  users: {
    get() {
      return apiHelper.get("/admins/users");
    },
    getOrder({ id }) {
      return apiHelper.get(`/admins/users/${id}/orders`);
    }
  },
  orders: {
    get() {
      return apiHelper.get("/admins/orders");
    },
    getDetail({ orderId }) {
      return apiHelper.get(`/admins/orders/${orderId}`);
    }
  },
  products: {
    get() {
      return apiHelper.get("/admins/products");
    },
    post({ formData, images }) {
      
      for(let i = 0; i < images.length; i++){
        formData.append("images", images[i]);
      }

      return apiHelper.post("/admins/products", formData);
    },
    put({ id, formData }) {

      return apiHelper.put(`/admins/products/${id}`, formData)

    },
    getStatus({ id }) {
      return apiHelper.get(`/admins/products/${id}/stocks`);
    },
    getStatusDatail({ id, stock_id }) {
      return apiHelper.get(`/admins/products/${id}/stocks/${stock_id}`);
    },
    postStatus({ productId, color, size }) {
      return apiHelper.post(`/admins/products/${productId}/stocks`, {
        color,
        size
      });
    },
    putStatus({ id, stock_id, color, size, stock }) {
      return apiHelper.put(`/admins/products/${id}/stocks/${stock_id}`, {
        color,
        size,
        stock
      });
    },
    deleteStatus({ id, stock_id }) {
      return apiHelper.delete(`/admins/products/${id}/stocks/${stock_id}`);
    },
    deleteImage(id) {
      console.log("revoked");
      return apiHelper.delete(`/admins/image/${id}`);
    },
    getProductDetail({ id }) {
      return apiHelper.get(`/admins/products/${id}`);
    }
  },
  coupons:{
    get(){
      return apiHelper.get("/admins/coupons")
    },
    post({couponCode, discountAmount}){
      return apiHelper.post("/admins/coupons",{couponCode, discountAmount})
    },
    delete({id}){
      return apiHelper.delete(`/admins/coupons/${id}`)
    }
  }
};
