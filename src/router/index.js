import Vue from 'vue'
import VueRouter from 'vue-router'
import notFound from "../views/notFound.vue"
import Index from "../views/index.vue"
import Products from "../views/products"
import Product from "../views/product"
import adminCategories from "../views/adminCategories"
import adminProduct from "../views/adminProduct"
import adminProducts from "../views/adminProducts"
import adminProductEdit from "../views/adminProductEdit"
import adminProductNew from "../views/adminProductNew"
import adminUsers from "../views/adminUsers"
import user from "../views/user"

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"root",
    redirect: "/index"
  },
  {
    path:"/index",
    name:"index",
    component: Index
  },
  {
    path:"/products",
    name: "products",
    component: Products
  },
  {
    path: "/products/:id",
    name: "product",
    component: Product
  },
  {
    path: "/users/:id",
    name: "user",
    component: user
  },
  {
    path: "/admin/categories",
    name: "adminCategories",
    component: adminCategories
  },
  {
    path: "/admin/users",
    name: "adminUsers",
    component: adminUsers
  },
  {
    path: "/admin/products",
    name: "adminProducts",
    component: adminProducts,
  },
  {
    path: "/admin/products/:id",
    name: "adminProduct",
    component: adminProduct
  },
  {
    path: "/admin/products/:id/edit",
    name: "adminProductEdit",
    component: adminProductEdit
  },
  {
    path: "/admin/products/:id/new",
    name: "adminProductNew",
    component: adminProductNew
  },
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
