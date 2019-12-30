import Vue from 'vue'
import VueRouter from 'vue-router'
import notFound from '../views/notFound.vue'
import Index from '../views/index.vue'
import Products from '../views/products'
import Product from '../views/product'
import adminCategories from '../views/adminCategories'
import adminProduct from '../views/adminProduct'
import adminProducts from '../views/adminProducts'
import adminProductEdit from '../views/adminProductEdit'
import adminProductCreate from '../views/adminProductCreate'
import adminProductStatus from '../views/adminProductStatus.vue'
import adminProductStatusCreate from '../views/adminProductStatusCreate.vue'
import adminProductStatusEdit from '../views/adminProductStatusEdit.vue'
import adminUsers from '../views/adminUsers'
import adminUserOrders from '../views/adminUserOrders'
import adminOrders from '../views/adminOrders'
import adminOrder from '../views/adminOrder'
import adminOrderEdit from '../views/adminOrderEdit'
import userEdit from '../views/userEdit'
import userForgetPassword from '../views/userForgetPassword'
import userChangePassword from '../views/userChangePassword'
import userResetPassword from '../views/userResetPassword'
import userWishList from '../views/userWishList'
import cart from '../views/cart'
import checkout from '../views/checkout'
import paymentComplete from '../views/paymentComplete'
import orders from '../views/orders'
import order from '../views/order'
import signIn from '../views/signIn'
import user from '../views/user'
import spgatewayPayment from '../views/spgatewayPayment'
import store from '../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.current
  if (currentUser && !currentUser.role) {
    next('/404')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/index'
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'product',
    component: Product
  },
  {
    path: '/users/password_forget',
    name: 'userForgetPassword',
    component: userForgetPassword
  },
  {
    path: '/users/password_reset/:token_id/:token',
    name: 'userResetPassword',
    component: userResetPassword
  },
  {
    path: '/users/:id/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/orders/:id/checkout',
    name: 'checkout',
    component: checkout
  },
  {
    path: '/orders/:id/payment',
    name: 'spgatewayPayment',
    component: spgatewayPayment
  },
  {
    path: '/users/:id/paymentcomplete',
    name: 'paymentComplete',
    component: paymentComplete
  },
  {
    path: '/users/:id',
    name: 'users',
    component: user,
    children: [
      {
        path: 'orders',
        name: 'orders',
        component: orders
      },
      {
        path: 'orders/:order_id',
        name: 'order',
        component: order
      },
      {
        path: 'password_change',
        name: 'userChangePassword',
        component: userChangePassword
      },
      {
        path: 'edit',
        name: 'userEdit',
        component: userEdit
      },
      {
        path: 'wishlist',
        name: 'userWishList',
        component: userWishList
      }
    ]
  },
  {
    path: '/admin/categories',
    name: 'adminCategories',
    component: adminCategories,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'adminUsers',
    component: adminUsers,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users/:id/orders',
    name: 'adminUserOrders',
    component: adminUserOrders,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/orders',
    name: 'adminOrders',
    component: adminOrders,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/orders/:id/edit',
    name: 'adminOrderEdit',
    component: adminOrderEdit,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products',
    name: 'adminProducts',
    component: adminProducts,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products/:id/edit',
    name: 'adminProductEdit',
    component: adminProductEdit,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products/create',
    name: 'adminProductCreate',
    component: adminProductCreate,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products/:id/status',
    name: 'adminProductStatus',
    component: adminProductStatus,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products/:id/status/create',
    name: 'adminProductStatusCreate',
    component: adminProductStatusCreate,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products/:id/status/:stock_id/edit',
    name: 'adminProductStatusEdit',
    component: adminProductStatusEdit,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/products/:id',
    name: 'adminProduct',
    component: adminProduct,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/orders/:order_id',
    name: 'adminOrder',
    component: adminOrder,
    beforeEnter: authorizeIsAdmin
  },

  {
    path: '*',
    name: 'notFound',
    component: notFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = [
    'signIn',
    'index',
    'products',
    'product',
    'userForgetPassword',
    'userResetPassword'
  ]
  if (pathsWithoutAuthentication.includes(to.name)) {
    next()
    return
  }
  // 如果 token 無效
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }
  // 如果 token 有效
  if (isAuthenticated && to.name === 'sign-in') {
    next('/products')
    return
  }
  next()
})

export default router
