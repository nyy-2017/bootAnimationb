import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "babel-polyfill";
import axios from "./axios/axios";
import VueAxios from "vue-axios";
import "./plugins/element-ui";
import "./assets/css/element/theme/index.css";
let bus = new Vue();
Vue.prototype.bus = bus;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
