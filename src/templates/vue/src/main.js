import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./router/index";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
<% if(isVuex){ %>
import store from "./store/index";
<% } %>
import Vuex from "vuex";
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  <% if(isVuex){ %>  store,  <% } %>
  router: router,
  render: (h) => h(App),
}).$mount("#app");
