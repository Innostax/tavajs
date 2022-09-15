<template>
  <div class="fs-5" @click="themeToggle">
    <i :class="darkMode ? 'fa-solid fa-sun' : 'fa-sharp fa-solid fa-moon'"></i>
  </div>
</template>

<script>
export default {
  name: "Theme",
  data () {
    return {
      darkMode: false,
    };
  },
  methods: {
    themeToggle() {
      const htmlClass = document.documentElement.classList;
      this.darkMode ? htmlClass.remove("dark") : htmlClass.add("dark");
      this.darkMode = !this.darkMode;
    },
  },
};
</script>
