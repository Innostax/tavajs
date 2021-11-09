<template>
  <div>
    <table width="100%" border="1px">
      <tr>
        <th>Name</th>
        <th>User Name</th>
        <th>Email</th>
      </tr>
      <tr v-for="user in allUsers" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <b-button variant="danger" v-on:click="removeOne(user.id)"
            >Delete</b-button
          >
        </td>
        <td>
          <b-button
            variant="primary"
            v-on:click="editOne(user.id)"
            @click="$bvModal.show('bv-modal-edit')"
            >Edit</b-button
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ShowUsers",

  data() {
    return {
      modalShow: true,
    };
  },
  methods: {
    ...mapActions(["deleteUser", "selectedItem"]),
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
};
</script>
