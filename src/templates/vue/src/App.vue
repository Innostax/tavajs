<template>
  <% if (isAuth0) { %>
  <div v-if="isAuthenticated" id="app">
  <% } else { %> 
  <div id="app">
  <% } %>
    <Navbar />
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

<style src="./App.css"/>
