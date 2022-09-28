import { createRouter, createWebHistory } from "vue-router";
<% if (isTailWind) { %>
  import Home from "../components/pages/Home.vue";
  import Users from "../components/pages/Users.vue";
  <% } %>
<% if (isBootstrap) { %>
  import Home from "../components/pages/Home.vue";
  import Users from "../components/pages/Users.vue";
<% } %>
<% if (isAuth0) { %>
import { authGuard } from '@auth0/auth0-vue';
<% } %>
<% if (isOkta) { %>
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
<% } %>

<% if (isAuth0) { %>
const routes = [
  { path: "/", component: Home, beforeEnter: authGuard },
  { path: "/users", component: Users, beforeEnter: authGuard },
];
<% } else if (isOkta) { %>
  const routes = [
    { path: "/", component: Home, meta: { requiresAuth: true } },
    { path: "/users", component: Users, meta: { requiresAuth: true }},
    { path: '/login/callback', component: LoginCallback },
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
  
<% if (isOkta) { %>
router.beforeEach(navigationGuard)
<% } %>

export default router;
