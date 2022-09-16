<template>
  <div>
    <Button id="logoutButton" name="Log Out" size="sm" color="outline-dark" @onClick="logout"></Button>
  </div>
</template>

<script>
import Button from './Button.vue'

export default {
    name: "LogoutButton",
    components: {
        Button
    },
    methods: {
      logout() {
        this.$auth0.logout({ returnTo: window.location.origin });
      }
    }
};
</script>
