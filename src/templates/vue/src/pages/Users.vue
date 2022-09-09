<template>
  <div>
    <h1>Welcome to Users Screen</h1>
    <%if(isStore) { %>
    <h3>Welcome to Vue Vuex Crash Course</h3>
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
import { mapGetters, mapActions } from "vuex";
import AddUser from "../userModal/AddUser";
import Table from "../components/organisms/Table.vue";
import EditUser from "../userModal/EditUser";
import DeleteUser from "../userModal/DeleteUser";

export default {
  name: "Users",
  components: {
    AddUser,
    Table,
    EditUser,
    DeleteUser
  },
   data() {
    return {
      columns: [
        { key: "name" },
        { key: "username" },
        { key: "email" },
        { key: "edit" },
        { key: "delete" },
      ],
      modalShow: true,
    };
  },
  methods: {
    ...mapActions([<%if(isCrudWithNode) { %>"getAllUsers",<% } %> "deleteUser", "selectedItem"]),
    removeOne: function (id) {
      this.deleteUser(id);
    },
    editOne: function (id) {
      this.selectedItem(id);
      this.modalShow = false;
    },
  },
  computed: {
    ...mapGetters(["allUsers", "selectedUser"]),
  },
  created() {
    this.mapActions;
  },
  <%if(isCrudWithNode) { %>
  mounted() {
    this.getAllUsers();
  },
  <% } %>
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
