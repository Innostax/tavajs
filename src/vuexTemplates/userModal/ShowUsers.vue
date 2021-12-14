<template>
  <div>
    <Table :fields="columns" :items="allUsers"> </Table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Table from "../components/organisms/Table.vue";
export default {
  name: "ShowUsers",
  components: {
    Table,
  },

  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "username", label: "UserName" },
        { key: "email", label: "Email" },
        { key: "edit", label: "" },
        { key: "delete", label: "" },
      ],
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
