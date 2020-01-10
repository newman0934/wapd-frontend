<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>會員列表</h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">名稱</th>
              <th scope="col">電話</th>
              <th scope="col">Email</th>
              <th scope="col">住址</th>
              <th scope="col">身分</th>
              <th scope="col">訂單</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td scope="row">{{user.id}}</td>
              <td scope="row">{{user.name}}</td>
              <td scope="row">{{user.phone}}</td>
              <td scope="row">{{user.email}}</td>
              <td scope="row">{{user.address}}</td>
              <td scope="row">{{user.role}}</td>
              <td scope="row"><router-link  class="btn btn-outline-info" :to="{name:'adminUserOrders', params:{ id:user.id }}">歷史訂單</router-link></td>
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
  data() {
    return {
      users: []
    }
  },
  created(){
    this.fetchUsers()
  },
  methods:{
    async fetchUsers(){
      try{
        const {data, statusText} = await adminAPI.users.get()

        if(statusText !== "OK"){
          throw new Error(statusText)
        }

        this.users = data.users
      }catch(error){
        Toast.fire({
          type:"error",
          title:"無法取得會員資料"
        })
      }
    }
  }
};
</script>