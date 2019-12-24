import { apiHelper } from './../utils/helpers'

export default {
    categories:{
        get(){
            return apiHelper.get("/admins/categories")
        },
        create({category}){
            return apiHelper.post("/admins/categories", {category})
        },

        update({ categoryId, category}){
            return apiHelper.put(`/admins/categories/${categoryId}`,{category})
        },
        delete({categoryId}){
            return apiHelper.delete(`/admins/categories/${categoryId}`)
        }
    },
    users:{
        get(){
            return apiHelper.get("/admins/users")
        },
        getOrder({id}){
            return apiHelper.get(`/admins/users/${id}/orders`)
        }
    },
    orders:{
        get(){
            return apiHelper.get("/admins/orders")
        },
        getDetail({orderId}){
            return apiHelper.get(`/admins/orders/${orderId}`)
        }
    },
    products:{
        get(){
            return apiHelper.get("/admins/products")
        },
        getStatus({id}){
            return apiHelper.get(`/admins/products/${id}/stocks`)
        },
        getProductDetail({id}){
            return apiHelper.get(`/admins/products/${id}`)
        },
    }
}