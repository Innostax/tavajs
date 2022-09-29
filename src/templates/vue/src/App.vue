<template>
  <% if (isAuth0) { %>
  <div id="app" v-if="isAuthenticated">
    <Navbar />
    <router-view></router-view>
  </div>
  <% } else if (isOkta) { %>
  <div id="app">
    <div v-if="authState && authState.isAuthenticated">
      <Navbar />
    </div>
    <router-view></router-view>
  </div>
  <% } else if (isCognito) { %>
  <div id="app">
    <div v-if="auth.authStatus === 'authenticated'">
      <Navbar />
      <router-view></router-view>
    </div>
    <authenticator variation="modal" >
    </authenticator>
  </div>
  <% } else { %>
  <div id="app">
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

export default {
  name: "App",
  components: {
    Navbar,
  <% if (isCognito) { %>
    Authenticator,
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
<style src="./components/styles/index.css"/>
<% } %>
<% if (isTailWind) { %>
  <style>
  html.dark{
    background-color: #212529;
  }
</style>
<% } %>
