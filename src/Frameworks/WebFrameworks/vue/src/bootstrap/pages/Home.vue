<template>
  <% if (isOkta) { %>
  <div v-if="authState && authState.isAuthenticated">
    <% } else { %>
  <div>
    <% } %>
    <h1>Welcome to Home Screen</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
