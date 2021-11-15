// Entrypoint for vuex

import Vuex from "vuex";
import Vue from "vue";
import users from "./modules/users";

// Load vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    users,
  },
});
