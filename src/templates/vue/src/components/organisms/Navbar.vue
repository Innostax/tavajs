<template>
  <b-navbar toggleable="lg">
    <b-navbar-brand class="mx-4" href="#">Made in India</b-navbar-brand>

    <b-navbar-toggle class="mx-4" target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/users">Users</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <% if(isDark) { %> 
    <b-navbar-nav class="mx-2">
      <ThemeVue/>
    </b-navbar-nav>
    <% } %> 
    <% if(isAuth0) { %> 
    <b-navbar-nav class="mx-2">
      <LogoutButton/>
    </b-navbar-nav>
    <% } %> 
  </b-navbar>
</template>

<script>
<% if(isDark) { %> 
import ThemeVue from '../../light-dark-theme.vue';
<% } %> 
<% if(isAuth0) { %> 
import LogoutButton from '../atoms/LogoutButton.vue'
<% } %> 
export default {
  name: "Navbar",
  components : {
  <% if(isDark) { %> 
    ThemeVue,
  <% } %>   
  <% if(isAuth0) { %> 
    LogoutButton,
  <% } %>   
  },
};
</script>
