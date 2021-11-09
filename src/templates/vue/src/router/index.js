import VueRouter from "vue-router";

import Home from "../pages/Home.vue";
import Users from "../pages/Users.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users", component: Users },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
