<template>
  <div>
    <h1>Welcome to Users Screen</h1>
    <%if(isStore) { %>
    <h3>Welcome to Vue Vuex Crash Course</h3>
    <AddUser />
    <ShowUsers />
    <EditUser />
    <% } %>
  </div>
</template>

<script>
<%if(isStore) { %>
import AddUser from "../userModal/AddUser";
import ShowUsers from "../userModal/ShowUsers";
import EditUser from "../userModal/EditUser";
export default {
  name: "Users",
  components: {
    ShowUsers,
    AddUser,
    EditUser,
  },
};
<% } %>
</script>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
