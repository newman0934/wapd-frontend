<template>
  <div class="container py-5">
    <div class="card border-white w-100">
      <div class="card-img user-bg">
        <img src="https://picsum.photos/id/177/2515/1830" class="img-fluid" alt="user-bg" />
      </div>
      <div class="card-img-overlay mt-5">
        <h4>Hi, {{email}}</h4>
      </div>
    </div>
    <ul class="nav nav-tabs mt-2">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'orders'}">訂單查詢</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'userEdit'}">帳號管理</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'userChangePassword'}">重設密碼</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'userWishList'}">Wish List</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      id: 0,
      name: "",
      email: ""
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.setUser();
  },
  methods: {
    setUser() {
      this.id = this.currentUser.id;
      this.name = this.currentUser.name;
      this.email = this.currentUser.email;
    }
  }
};
</script>
<style scoped>
.user-bg {
  height: 150px;
  overflow: hidden;
}

.user-bg img {
  margin-top: -5%;
  opacity: 0.7;
  filter: alpha(opacity=70);
}
</style>