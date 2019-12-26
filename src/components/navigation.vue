<template>
  <div class="navigation-wrap start-header start-style fixed-top">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-expand-md">
            <a class="navbar-brand" href="#">WAP-D</a>

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

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item pl-4 m-auto">
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
                </li>
                <li class="nav-item pl-4 my-auto">
                  <a class="nav-link" href="#">HOME</a>
                </li>
                <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                  <a class="nav-link" href="#">最新商品</a>
                </li>

                <li class="nav-item dropdown my-auto pl-4 pl-md-0 ml-0 ml-md-4">
                  <a
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >store</a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Web Design</a>
                    <a class="dropdown-item" href="#">Web Development</a>
                    <a class="dropdown-item" href="#">SEO</a>
                    <a class="dropdown-item" href="#">AI Development</a>
                  </div>
                </li>
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
                  <router-link class="nav-link" :to="{name: 'orders', params:{id: currentUser.id}}">
                    <font-awesome-icon icon="user" size="2x" />
                  </router-link>
                </li>
                <li class="nav-item pl-4 my-auto pl-md-0 ml-0 ml-md-4">
                  <router-link class="nav-link" :to="{name: 'userWishList', params:{id: currentUser.id}}">
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
import {mapState} from "vuex"
export default {
  computed:{
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout(){
      this.$store.commit("revokeAuthentication")
      this.$router.push("/index")
    }
  }
}
</script>
<style>
.container {
  max-width: 90%;
}
.navigation-wrap {
  font-size: 16px;
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
