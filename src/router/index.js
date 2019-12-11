import Vue from 'vue'
import VueRouter from 'vue-router'
import notFound from "../views/notFound"

Vue.use(VueRouter)

const routes = [
  {
    path:"*",
    name:"notFound",
    component:notFound
  }
]

const router = new VueRouter({
  routes
})

export default router
