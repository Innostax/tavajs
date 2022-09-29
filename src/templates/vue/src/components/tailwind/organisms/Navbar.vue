<template>
<nav class="bg-white dark:bg-black border-gray-200 px-2">
  <div class="container flex flex-wrap items-center lg:justify-start mt-3 w-full">
    <div>
      <a href="#" class="flex">
        <span class="self-center text-xl dark:text-white ml-2  whitespace-nowrap">Made In India</span>
      </a>
    </div>
    <div class="flex ml-auto sm:ml-3">
      <button  type="button" class="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 
        rounded-lg inline-flex items-center justify-center" 
        v-on:click="toggleNavbar()"
      >
        <span class="sr-only">Open  menu</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
    <div class="md:block w-full md:w-auto" v-bind:class="{'hidden': !showMenu }" >
      <ul class="flex-col md:flex-row flex md:space-x-1 mt-1">
        <li>
          <a href="/" class="text-gray-500 hover:text-black block pl-3 text-base pr-4 py-2">Home</a>
        </li>
        <li>
          <a href="/users" class="text-gray-500 hover:text-black block pl-3 text-base pr-4 py-2 space-x-8" >Users</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default{
 name:"Navbar",
 data() {
    return {
      showMenu: false,
      isDark:false
    }
  },
  methods: {
    toggleNavbar: function() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
