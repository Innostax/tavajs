<template>
  <Table
    :tableData="allUsers"
    :tableColumns="tableColumns"
    @edit-button-clicked="editButtonHandler"
    @delete-button-clicked="deleteButtonHandler"
  />
</template>

<script>
import Table from "../components/organisms/Table.vue";

export default {
  name: "ShowUsers",
  components: {
    Table,
  },
  data() {
    return {
      tableColumns: [
        { name: "Name", key: "name",  },
        { name: "User name", key: "username", },
        { name: "email", key: "email", },
        { name: "Edit", key: "edit", dataFormatter: "button", buttonName: "Edit", buttonClasses: "bg-blue-600" },
        { name: "Delete", key: "delete", dataFormatter: "button", buttonName: "Delete", buttonClasses: "bg-red-600" },
      ],
    };
  },
  computed: {
    allUsers: function () {
      return this.$store.getters["allUsers"];
    },
  },
  methods: {
    editButtonHandler(data) {
      this.$emit("edit-user", data);
    },
    deleteButtonHandler(data) {
      this.$emit("delete-user", data);
    },
  },
};
</script>
