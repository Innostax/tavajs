<template>
  <% if (isOkta) { %>
  <div v-if="authState && authState.isAuthenticated">
  <% } else { %>
  <div>
  <% } %>
    <h1 class="text-4xl dark:text-white dark:bg-vueBlack">Welcome to Home Screen</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
