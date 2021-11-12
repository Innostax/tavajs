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
          <Button name="Delete" color="danger" @onClick="removeOne(user.id)" />
        </td>
        <td>
          <Button name="Edit" color="primary" @onClick="$bvModal.show('bv-modal-edit')" />
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
