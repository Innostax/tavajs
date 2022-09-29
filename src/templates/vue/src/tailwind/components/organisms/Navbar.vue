<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal p-6 mb-2">
    <div class="flex items-center flex-no-shrink text-black mr-6">
        <a href="#" class="flex">
          <span
            class="self-center text-xl dark:text-white ml-2 whitespace-nowrap"
            >Made In India</span
          >
        </a>
    </div>
    <div class="block md:hidden">
      <button
        @click="toggleNavbar()"
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-gray-600 hover:border-gray-600 text-gray-600"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="showMenu ? 'block' : 'hidden'"
      class="w-full flex-grow md:flex md:items-center md:w-auto"
    >
      <div class="md:flex-grow md:flex md:justify-start">
        <a
          href="/"
          class="no-underline block mt-4 md:inline-block md:mt-0 text-gray-500 dark:hover:text-white hover:text-black mr-4"
        >
          Home
        </a>
        <a
          href="/users"
          class="no-underline block mt-4 md:inline-block md:mt-0 text-gray-500 dark:hover:text-white hover:text-black mr-4"
        >
          Users
        </a>
      </div>
      <% if(isThemeProvider) { %> 
        <ThemeVue class="md:mt-0 mt-4" />
      <% } %> 
      <% if(isAuth0 || isOkta || isCognito) { %> 
        <LogoutButton class="md:mt-0 mt-4" />
      <% } %> 
    </div>
  </nav>
</template>
<script>
<% if(isThemeProvider) { %> 
import ThemeVue from '../../theme.vue';
<% } %> 
<% if(isAuth0 || isOkta || isCognito) { %> 
import LogoutButton from '../atoms/LogoutButton.vue'
<% } %>

export default {
  name: "Navbar",
  components : {
    <% if(isThemeProvider) { %> 
      ThemeVue,
    <% } %>   
    <% if(isAuth0 || isOkta || isCognito) { %> 
      LogoutButton,
    <% } %>   
    },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
