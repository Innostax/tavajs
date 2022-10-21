/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Users from "../pages/Users.vue";
<% if (isAuth0) { %>
import { authGuard } from '@auth0/auth0-vue';
<% } else if (isOkta) { %>
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
<% } %>

const routes = [
  { path: "/", component: Home },
  { path: "/users", component: Users },
];

<% if (isAuth0) { %>
routes.forEach((route) => (route.beforeEnter = authGuard));
<% } else if (isOkta) { %>
routes.forEach((route) => (route.meta = { requiresAuth: true }));
routes.push({ path: "/login/callback", component: LoginCallback });
<% } %>

const router = createRouter({
  history: createWebHistory(),
  routes
})
  
<% if (isOkta) { %>
router.beforeEach(navigationGuard)
<% } %>

export default router;
