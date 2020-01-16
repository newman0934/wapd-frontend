import { apiHelper } from './../utils/helpers'

export default {
    getCategories(){
        return apiHelper.get("/categories")
    }
}