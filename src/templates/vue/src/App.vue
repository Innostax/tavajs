<template>
  <% if (isAuth0) { %>
  <div id="app" v-if="isAuthenticated">
  <% } else { %> 
  <div id="app">
  <% } %>
  <% if (isOkta) { %>
  <template v-if="authState && authState.isAuthenticated">
  <Navbar />
  </template>
  <% } else { %>
    <Navbar />
  <% } %>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/organisms/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  <% if (isAuth0) { %>
  data () {
    return {
      isAuthenticated: this.$auth0.isAuthenticated
    }
  }
  <% } %>
};
</script>

<style src="./styles/index.css"/>
