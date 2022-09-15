import { createApp } from "vue";
import router from "./router/index";
import BootstrapVue3 from "bootstrap-vue-3";
import App from "./App.vue";
<% if(isStore){ %>
import store from "./store/index";
<% } %>
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css"

createApp(App)
<% if(isStore){ %> .use(store)  <% } %>
.use(router)
.use(BootstrapVue3)
.mount('#app')
