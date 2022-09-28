<template>
  <div>    
    <h3 class="mt-10 text-4xl">Welcome to Vue Vuex Crash Course</h3>
     <AddUser class="mt-4" />  
    <br/>
    <ShowUsers v-on:edit-user="editButtonHandler" v-on:delete-user="deleteButtonHandler"/>
    <EditUser v-on:close-edit-modal="shouldShowEditUserModal= false"  :show="shouldShowEditUserModal"/>
    <DeleteUser  v-on:close-delete-modal="shouldShowDeleteUserModal=false" :show="shouldShowDeleteUserModal"/>
  </div>
</template>
<script>

import AddUser from "../userModal/AddUser.vue";
import ShowUsers from "../userModal/ShowUsers.vue";
import EditUser from "../userModal/EditUser.vue";
import DeleteUser from "../userModal/DeleteUser.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Users",
  components: {
    ShowUsers,
  AddUser,
     EditUser,
    DeleteUser
  },
  data () {
    return {
      shouldShowEditUserModal: false,
      shouldShowDeleteUserModal: false
    }
  },
  methods: {
    editButtonHandler(data){
      this.$store.dispatch("selectedItem", data?.id)
      this.shouldShowEditUserModal = true
    },
    ...mapActions(["deleteUser"]),
    deleteButtonHandler(data) {
      this.$store.dispatch("selectedItem", data?.id)
      this.shouldShowDeleteUserModal=true
    },
   
    },
   computed: {
    ...mapGetters(["selectedUser"]),
  },
  }

</script>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
