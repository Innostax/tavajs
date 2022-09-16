import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Users from "../pages/Users.vue";
<% if (isAuth0) { %>
import { authGuard } from '@auth0/auth0-vue';
<% } %>

<% if (isAuth0) { %>
const routes = [
  { path: "/", component: Home, beforeEnter: authGuard },
  { path: "/users", component: Users, beforeEnter: authGuard },
];
<% } else { %> 
const routes = [
  { path: "/", component: Home },
  { path: "/users", component: Users },
];
<% } %>

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
