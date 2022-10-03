<template>
  <% if(isBootstrap) {%>
    <div class="fs-4" @click="ThemeToggler">
      <i :class="mode === DARK ? 'fa-solid fa-sun' : 'fa-sharp fa-solid fa-moon'"></i>
    </div>
  <%}%>
  <% if(isTailWind) {%>
    <div class="text-xl" @click="ThemeToggler">
    <button
      :class="mode === DARK ? ' text-white fa-solid fa-sun' : 'fa-sharp fa-solid fa-moon'" />
  </div>
  <%}%>
</template>

<script>
import { THEMES } from './theme.constants.js'

const { DARK, LIGHT }  = THEMES
const htmlClass = document.documentElement.classList;

export default {
  name: "Theme",
  data () {
    return {
      mode: localStorage.mode || LIGHT,
      DARK
    };
  },
  mounted () {
    if (this.mode && this.mode === DARK) htmlClass.add(DARK);
  },
  methods: {
    ThemeToggler() {
      this.mode === DARK ? htmlClass.remove(DARK) : htmlClass.add(DARK);
      this.mode = this.mode === DARK ? LIGHT : DARK
      localStorage.mode = this.mode
    },
  }
};
</script>
