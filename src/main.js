import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch, faBars, faShoppingCart,faHeart,faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLine, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'



library.add(faUser, faSearch, faBars, faShoppingCart, faFacebook, faLine, faInstagram, faHeart, faUserCog);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
