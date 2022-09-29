<template>
  <div>
    <h1>Welcome to Users Screen</h1>
    <%if(isStore) { %>
    <AddUser />
    <br/>
    <ShowUsers />
    <EditUser />
    <DeleteUser />
    <% } %>
  </div>
</template>

<script>
<%if(isStore) { %>
import AddUser from "../userModal/AddUser";
import ShowUsers from "../userModal/ShowUsers";
import EditUser from "../userModal/EditUser";
import DeleteUser from "../userModal/DeleteUser";

export default {
  name: "Users",
  components: {
    ShowUsers,
    AddUser,
    EditUser,
    DeleteUser
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
