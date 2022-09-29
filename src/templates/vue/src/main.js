import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
<% if(isStore){ %>
import store from "./store/index";
<% } %>

<% if (isBootstrap) { %>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapVue3 from "bootstrap-vue-3";
<% } %>

<% if (isTailWind) { %>
  import './styles/index.css';
  <% } %>


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

<% if (isCognito) { %>
import { Amplify } from 'aws-amplify';
const { VUE_APP_AWS_USER_POOLS_ID, VUE_APP_AWS_USER_POOLS_WEB_CLIENT_ID }  = process.env
Amplify.configure({
    "aws_user_pools_id": VUE_APP_AWS_USER_POOLS_ID,
    "aws_user_pools_web_client_id": VUE_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
});
<% } %>

const app = createApp(App)
<% if(isStore){ %> .use(store)  <% } %>
.use(router)
<% if (isBootstrap) { %>
.use(BootstrapVue3)
<% } %>
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
