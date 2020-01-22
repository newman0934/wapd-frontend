<template>
  <div class="navigation-wrap start-header start-style fixed-top">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-expand-md">
            <router-link class="navbar-brand col-2" :to="{name:'index'}">
              <img src="https://i.imgur.com/Yyxe9Fn.png" alt="logo" style="max-width:100px" />
            </router-link>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <font-awesome-icon class="bar" icon="bars" size="2x" />
            </button>

            <div class="collapse navbar-collapse col-6" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto">
                <!-- <li class="nav-item pl-4 m-auto">
                  <form class="form-inline search">
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button class="btn btn-outline-success" type="submit">
                      <font-awesome-icon icon="search" size="1x" />
                    </button>
                  </form>
                </li>-->
                <li class="nav-item pl-4 m-auto">
                  <router-link class="nav-link" :to="{name:'index'}">HOME</router-link>
                </li>
                <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                  <router-link class="nav-link" :to="{name:'about'}">關於我們</router-link>
                </li>

                <li class="nav-item dropdown my-auto pl-4 pl-md-0 ml-0 ml-md-4">
                  <a
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >購物商城</a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link
                      class="dropdown-item"
                      v-for="category in categories"
                      :key="category.id"
                      :to="{name:'products',query:{categoryId:category.id}}"
                    >{{category.category}}</router-link>
                  </div>
                </li>

                <li class="nav-item pl-4 my-auto">
                  <router-link class="nav-link" :to="{name:'index'}">FAQ</router-link>
                </li>
                <li class="nav-item pl-4 my-auto">
                  <a class="navbar-link" href="#" @click.stop.prevent="gotoContact('#contact')">聯絡我們</a>
                </li>
              </ul>
            </div>

            <div class="collapse navbar-collapse col-4" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <template v-if="!isAuthenticated || !currentUser.role === 'admin'">
                  <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                    <router-link class="nav-link" :to="{name:'signIn'}">Login / LogUp</router-link>
                  </li>
                </template>
                <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                  <router-link class="nav-link" :to="{name: 'cart', params:{id: currentUser.id}}">
                    <font-awesome-icon icon="shopping-cart" size="2x" />
                  </router-link>
                </li>
                <template v-if="isAuthenticated || currentUser.role === 'admin'">
                  <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                    <a href="#" class="nav-link my-2 my-sm-0" @click="logout">登出</a>
                  </li>
                  <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                    <router-link
                      class="nav-link"
                      :to="{name: 'orders', params:{id: currentUser.id}}"
                    >
                      <font-awesome-icon icon="user" size="2x" />
                    </router-link>
                  </li>
                  <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                    <router-link
                      class="nav-link"
                      :to="{name: 'userWishList', params:{id: currentUser.id}}"
                    >
                      <font-awesome-icon icon="heart" size="2x" />
                    </router-link>
                  </li>
                </template>
                <template v-if="currentUser.role === 'admin'">
                  <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                    <router-link class="nav-link" :to="{name: 'adminOrders'}">
                      <font-awesome-icon icon="user-cog" size="2x" />
                    </router-link>
                  </li>
                </template>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      categories: []
    };
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/index");
    },

    async fetchCategories() {
      try {
        const { data, statusText } = await categoriesAPI.getCategories();
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.categories = data.categories;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "取得類別資料失敗"
        });
      }
    },
    gotoContact(el) {
      this.$router.push({ name: "about", query: { el } });
    }
  }
};
</script>
<style>
.container {
  max-width: 90%;
}
.navigation-wrap {
  font-size: 12px;
  background-color: white;
}
.navigation-wrap a,
.navigation-wrap .navbar-toggler-icon,
.bar {
  color: rgb(125, 125, 125);
}
.navigation-wrap a:hover,
.navigation-wrap .bar:hover {
  color: #3b1c15;
  transition: all 0.5s;
}

.search .btn-outline-success {
  color: rgb(125, 125, 125);
  border-color: rgb(125, 125, 125);
  transition: all 0.5s;
}

.search .btn-outline-success:hover {
  color: white;
  border-color: #3b1c15;
  background-color: #3b1c15;
}
</style>
