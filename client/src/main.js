import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import VueAxios from 'vue-axios'
import 'sweetalert2/dist/sweetalert2.min.css';
import AsyncComputed from 'vue-async-computed'
 
Vue.use(AsyncComputed)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
