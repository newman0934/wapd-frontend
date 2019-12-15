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
import adminProductCreate from "../views/adminProductCreate"
import adminUsers from "../views/adminUsers"
import adminUserOrders from "../views/adminUserOrders"
import adminOrders from "../views/adminOrders"
import adminOrder from "../views/order"
import adminOrderEdit from "../views/adminOrderEdit"
import userEdit from "../views/userEdit"
import userForgetPassword from "../views/userForgetPassword"
import userChangePassword from "../views/userChangePassword"
import userWishList from "../views/userWishList"
import cart from "../views/cart"
import orders from "../views/orders"
import order from "../views/order"
import signIn from "../views/signIn"



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/index"
  },
  {
    path: "/signIn",
    name: "signIn",
    component: signIn
  },
  {
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/products",
    name: "products",
    component: Products
  },
  {
    path: "/products/:id",
    name: "product",
    component: Product
  },
  {
    path: "/users/:id/passowrd_forget",
    name: "userForgetPassword",
    component: userForgetPassword
  },
  {
    path: "/users/:id/password_change",
    name: "userChangePassword",
    component: userChangePassword
  },
  {
    path: "/users/:id/edit",
    name: "userEdit",
    component: userEdit
  },
  {
    path: "/users/:id/wishlist",
    name: "userWishList",
    component: userWishList
  },
  {
    path: "/users/:id/cart",
    name: "cart",
    component: cart
  },
  {
    path: "users/:id/orders",
    name: "orders",
    component: orders
  },
  {
    path: "users/:id/orders/:order_id",
    name: "order",
    component: order
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
    path: "/admin/users/:id/orders",
    name: "adminUserorders",
    component: adminUserOrders
  },
  {
    path: "/admin/orders",
    name: "adminOrders",
    component: adminOrders
  },
  {
    path: "/admin/orders/:id",
    name: "adminOrder",
    component: adminOrder
  },
  {
    path: "/admin/orders/:id/edit",
    name: "adminOrderEdit",
    component: adminOrderEdit
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
    path: "/admin/products/create",
    name: "adminProductCreate",
    component: adminProductCreate
  },
  {
    path: "*",
    name: "notFound",
    component: notFound
  }
]

const router = new VueRouter({
  routes
})

export default router
