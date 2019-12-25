<template>
  <div>
    <adminNav />
    <div class="container">
      <div class="col-sm-6 mx-auto">
        <h3>商品9</h3>
        <form class="mb-5">
          <div class="form-group row">
            <label for="productSize" class="col-sm-2 col-form-label">尺寸</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productSize"
                name="productSize"
                placeholder="商品尺寸"
                v-model="newSize"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="productColor" class="col-sm-2 col-form-label">顏色</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="productColor"
                name="productColor"
                placeholder="商品顏色"
                v-model="newColor"
              />
            </div>
          </div>
          <a href="#" class="btn btn-primary mx-3">回上一頁</a>
          <button type="submit" class="btn btn-primary mx-3" @click.stop.prevent="addProductStatus($route.params.id)">送出</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin"
import { Toast } from "./../utils/helpers"
export default {
  components: {
    adminNav
  },
  data(){
    return {
      productStatus:[],
      newColor:"",
      newSize:""
    }
  },
  methods:{
    async addProductStatus(productId){
      try{
        const { data, statusText} = await adminAPI.products.postStatus({
          productId,
          color:this.newColor,
          size:this.newSize
        })
        console.log(statusText)
        console.log(data)
        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        this.$router.go(-1)
      }catch(error){
        Toast.fire({
          type:"error",
          title:"新增商品類別失敗"
        })
        console.log(error)
      }
    }
  }
};
</script>