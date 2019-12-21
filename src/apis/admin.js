import { apiHelper } from './../utils/helpers'

export default {
    categories:{
        get(){
            return apiHelper.get("/admins/categories")
        },
        create({name}){
            return apiHelper.post("/admins/categories", {name})
        }
    },
    users:{
        get(){
            return apiHelper.get("/admins/users")
        }
    },
    orders:{
        get(){
            return apiHelper.get("/admins/orders")
        },
        getDetail({orderId}){
            return apiHelper.get(`/admins/orders/${orderId}`)
        }
    }
}