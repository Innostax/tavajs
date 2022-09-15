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

<% if (isAuth0) { %>
import { createAuth0 } from '@auth0/auth0-vue';
const { VUE_APP_AUTH0_DOMAIN, VUE_APP_AUTH0_CLIENT_ID } = process.env
<% } %>

const app = createApp(App)
<% if(isStore){ %> .use(store)  <% } %>
.use(router)
.use(Vuex)
.use(BootstrapVue3)

<% if (isAuth0) { %>
app.use(
    createAuth0({
      domain: VUE_APP_AUTH0_DOMAIN,
      client_id: VUE_APP_AUTH0_CLIENT_ID,
      redirect_uri: window.location.origin
    })
);
<% } %>

app.mount('#app')
