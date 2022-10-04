<template>
  <% if (isAuth0) { %>
  <div id="app" v-if="isAuthenticated">
    <% if (isNetworkInformer) { %>
    <NetworkStatus />
    <% } %>
    <Navbar />
    <router-view></router-view>
  </div>
  <% } else if (isOkta) { %>
  <div id="app">
    <% if (isNetworkInformer) { %>
    <NetworkStatus />
    <% } %>
    <div v-if="authState && authState.isAuthenticated">
      <Navbar />
    </div>
    <router-view></router-view>
  </div>
  <% } else if (isCognito) { %>
  <div id="app">
    <% if (isNetworkInformer) { %>
    <NetworkStatus />
    <% } %>
    <div v-if="auth.authStatus === 'authenticated'">
      <Navbar />
      <router-view></router-view>
    </div>
    <authenticator variation="modal" >
    </authenticator>
  </div>
  <% } else { %>
  <div id="app">
    <% if (isNetworkInformer) { %>
    <NetworkStatus />
    <% } %>
    <Navbar />
    <router-view></router-view>
  </div>
  <% } %>
</template>

<script>
import Navbar from "./components/organisms/Navbar.vue";
<% if (isCognito) { %>
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
const auth = useAuthenticator();
<% } %>
<% if (isNetworkInformer) { %>
import NetworkStatus from "./networkStatus/NetworkStatus.vue";
<% } %>

export default {
  name: "App",
  components: {
    Navbar,
  <% if (isCognito) { %>
    Authenticator,
  <% } %>
  <% if (isNetworkInformer) { %>
    NetworkStatus,
  <% } %>
  },
  <% if (isAuth0) { %>
  data () {
    return {
      isAuthenticated: this.$auth0?.isAuthenticated
    }
  }
  <% } %>
  <% if (isCognito) { %>
  data () {
    return {
      auth
    }
  }
  <% } %>

};
</script>
<% if (isBootstrap) { %>
<style src="./styles/index.css"/>
<% } %>
<% if (isTailWind) { %>
  <style>
    html.dark{
    @apply bg-vueBlack
  }
</style>
<% } %>
