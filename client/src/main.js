import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueAxios from 'vue-axios'
import AsyncComputed from 'vue-async-computed'
import VueGoogleCharts from 'vue-google-charts'
import VueMoment from 'vue-moment'


Vue.use(VueMoment)
Vue.use(VueGoogleCharts)
Vue.use(AsyncComputed)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
