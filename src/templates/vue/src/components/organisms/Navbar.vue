<template>
  <b-navbar toggleable="lg">
    <b-navbar-brand class="mx-4" href="#">Made in India</b-navbar-brand>

    <b-navbar-toggle class="mx-4" target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/users">Users</b-nav-item>
      </b-navbar-nav>
      <% if(isThemeProvider) { %>
      <ThemeVue />
      <% } %> 
      <% if(isAuth0 || isOkta) { %> 
      <LogoutButton class="ms-2"/>
      <% } %>
    </b-collapse>
  </b-navbar>
</template>

<script>
<% if(isThemeProvider) { %> 
import ThemeVue from '../../theme.vue';
<% } %> 
<% if(isAuth0 || isOkta) { %> 
import LogoutButton from '../atoms/LogoutButton.vue'
<% } %> 
export default {
  name: "Navbar",
  components : {
  <% if(isThemeProvider) { %> 
    ThemeVue,
  <% } %>   
  <% if(isAuth0 || isOkta) { %> 
    LogoutButton,
  <% } %>   
  },
};
</script>

<% if(isAuth0 || isOkta) { %> 
<style>
  @media (max-width: 992px) {
    #logoutButton{
      margin-left: 0 !important;
      margin-top: 0.5rem !important;
    }
  }
</style>
<% } %> 
