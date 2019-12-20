<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>分類列表</h1>
        <form class="my-4">
          <div class="form-row">
            <div class="col-auto">
              <input type="text" class="form-control" placeholder="新增類別..." />
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary">新增</button>
            </div>
          </div>
        </form>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">類別名稱</th>
              <th scope="col">編輯</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td scope="row">{{category.id}}</td>
              <td scope="row">{{category.category}}</td>
              <td scope="row"><button class="btn btn-block">Edit</button></td>
              <td scope="row"><button class="btn btn-block">delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin"
import { Toast} from "./../utils/helpers"

export default {
  components: {
    adminNav
  },
  data(){
    return {
      categories:[]
    }
  },
  created(){
    this.fetchCategories()
  },
  methods: {
    async fetchCategories(){
      try{
        const { data, statusText} = await adminAPI.categories.get()
        console.log(data)

        if(statusText !== "OK"){
          throw new Error(statusText)
        }
        this.categories = data.categories.map(category => ({
          ...category
        }))

      }catch(error){
        Toast.fire({
          type:"error",
          title:"無法取得餐廳類別"
        })
      }


    }
  }
};
</script>