import { apiHelper } from './../utils/helpers'

export default {
    categories:{
        get(){
            return apiHelper.get("/admins/categories")
        },
        create({name}){
            return apiHelper.post("/admins/categories", {name})
        },
        getProductStatus({id}){
            return apiHelper.get(`/admins/products/${id}/stocks`)
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
        }
    }
}