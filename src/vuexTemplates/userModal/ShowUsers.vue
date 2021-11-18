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
          <Button id="show-btn" className="mt-3" name="Delete" color="danger" @onClick="removeOne(user.id)" />
        </td>
        <td>
          <Button id="show-btn" className="mt-3" name="Edit" color="primary" @submit="editOne(user.id)" @onClick="$bvModal.show('bv-modal-editUser')" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "../components/atoms/Button.vue";
export default {
  name: "ShowUsers",
  components: {
    Button,
  },

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
