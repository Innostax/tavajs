<template>
  <div>
    <h3 class="text-4xl dark:text-white">Welcome to Users Screen</h3>
    <% if(isStore) {%>
    <AddUser class="mt-4" />
    <br />
    <ShowUsers
      @edit-user="editButtonHandler"
      @delete-user="deleteButtonHandler"
    />
    <EditUser
      @close-edit-modal="shouldShowEditUserModal = false"
      :show="shouldShowEditUserModal"
    />
    <DeleteUser
      @close-delete-modal="shouldShowDeleteUserModal = false"
      :show="shouldShowDeleteUserModal"
    />
    <%}%>

  </div>
</template>
<% if(isStore) {  %>
<script>
import AddUser from "../userModal/AddUser";
import ShowUsers from "../userModal/ShowUsers";
import EditUser from "../userModal/EditUser";
import DeleteUser from "../userModal/DeleteUser";
import { mapGetters } from "vuex";

export default {
  name: "Users",
  components: {
    ShowUsers,
    AddUser,
    EditUser,
    DeleteUser,
  },
  data() {
    return {
      shouldShowEditUserModal: false,
      shouldShowDeleteUserModal: false,
    };
  },
  methods: {
    editButtonHandler(data) {
      this.$store.dispatch("selectedItem", data?.id);
      this.shouldShowEditUserModal = true;
    },
    deleteButtonHandler(data) {
      this.$store.dispatch("selectedItem", data?.id);
      this.shouldShowDeleteUserModal = true;
    },
  },
  computed: {
    ...mapGetters(["selectedUser"]),
  },
};
</script>
<%}%>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
