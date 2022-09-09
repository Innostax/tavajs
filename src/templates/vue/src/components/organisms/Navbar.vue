<template>
  <b-navbar toggleable="lg" variant="light">
    <b-navbar-brand class="mx-4" href="#">Made in India</b-navbar-brand>

    <b-navbar-toggle class="mx-4" target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/users">Users</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
