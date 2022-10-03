<template>
    <Button
      id="logoutButton"
      name="Log Out"
      class="text-sm border border-vueBlack hover:bg-vueBlack hover:text-white rounded p-1 ml-2 
      dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
      @onClick="logout"
    />
</template>

<script>
import Button from './Button.vue'
<% if (isCognito) { %>      
import { useAuthenticator } from '@aws-amplify/ui-vue';
const auth = useAuthenticator();
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
        auth.signOut()
      }
      <% } %>
    }
};
</script>
