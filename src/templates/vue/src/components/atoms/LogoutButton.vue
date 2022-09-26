<template>
  <div>
    <Button id="logoutButton" name="Log Out" size="sm" color="outline-dark" @onClick="logout"></Button>
  </div>
</template>

<script>
import Button from './Button.vue'
<% if (isCognito) { %>      
import { useAuthenticator } from '@aws-amplify/ui-vue';
<% } %>

export default {
    name: "LogoutButton",
    components: {
        Button
    },
    methods: {
      <% if (isAuth0) { %>
      logout() {        
        this.$auth0.logout({ returnTo: window.location.origin });
      }
      <% } %>
      <% if (isOkta) { %>
      async logout () {
        await this.$auth.signOut()
      },
      <% } %>
      <% if (isCognito) { %>      
      logout () {
        const auth = useAuthenticator();
        auth.signOut()
      }
      <% } %>
    }
};
</script>
