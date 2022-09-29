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
        { name: "Name", key: "name", columnHeaderStyleClasses: "pl-8", rowStyleClasses: "text-primary-70" },
        { name: "User name", key: "username", rowStyleClasses: "pr-12" },
        { name: "email", key: "email", rowStyleClasses: "pr-12" },
        { name: "Edit", key: "edit", rowStyleClasses: "pr-14", dataFormatter: "button", buttonName: "Edit", buttonClasses: "bg-blue-400 hover:bg-blue-600" },
        { name: "Delete", key: "delete", rowStyleClasses: "pr-14", dataFormatter: "button", buttonName: "Delete", buttonClasses: "bg-red-400 hover:bg-red-600" },
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
