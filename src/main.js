import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch, faBars, faShoppingCart, faHeart, faUserCog, faUserLock, faKey, faSadTear, faCommentDollar,faQuestion, faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLine, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import "./vee-validate.js"
import SocialSharing from 'vue-social-sharing'
import VueScrollTo from 'vue-scrollto'

library.add(faUser, faSearch, faBars, faShoppingCart, faFacebook, faLine, faInstagram, faHeart, farHeart, faUserCog, faUserLock, faKey, faSadTear, faCommentDollar, faQuestion, faMapMarker, faPhone, faEnvelope);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(SocialSharing)
Vue.use(VueScrollTo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
