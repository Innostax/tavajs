import { createApp } from "vue";
import router from "./router/index";
import BootstrapVue3 from "bootstrap-vue-3";
import App from "./App.vue";
<% if(isStore){ %>
import store from "./store/index";
<% } %>
import Vuex from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

createApp(App)
<% if(isStore){ %> .use(store)  <% } %>
.use(router)
.use(Vuex)
.use(BootstrapVue3)
.mount('#app')
