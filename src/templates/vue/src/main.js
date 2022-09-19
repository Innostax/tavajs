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

<% if (isAuth0) { %>
import { createAuth0 } from '@auth0/auth0-vue';
const { VUE_APP_AUTH0_DOMAIN, VUE_APP_AUTH0_CLIENT_ID } = process.env
<% } %>

<% if (isOkta) { %>
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
const { VUE_APP_OKTA_ISSUER, VUE_APP_OKTA_CLIENT_ID } = process.env
const oktaAuth = new OktaAuth({
  clientId: VUE_APP_OKTA_CLIENT_ID,
  issuer: VUE_APP_OKTA_ISSUER,
  redirectUri: window.location.origin + '/login/callback',
})
<% } %>

const app = createApp(App)
<% if(isStore){ %> .use(store)  <% } %>
.use(router)
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

<% if (isOkta) { %>
.use(OktaVue, { oktaAuth })
<% } %>


app.mount('#app')
