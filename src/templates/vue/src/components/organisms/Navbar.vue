<template>
  <b-navbar toggleable="lg" variant="light">
    <b-navbar-brand href="#">Made in India</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <router-link to="/"><b-nav-item href="/">Home</b-nav-item></router-link>
        <router-link to="/users">
          <b-nav-item href="/users">Users</b-nav-item></router-link
        >
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto"> </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
