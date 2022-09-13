<template>
  <div>
    <Table :fields=columns :items=allUsers> </Table>
  </div>
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
      columns:[
        {key:"name" },
        {key:"username"},
        {key:"email"},
        {key:"edit"},
        {key:"delete"}
      ],
      modalShow: true,
    };
  },
  computed: {
    allUsers: function () {
      return this.$store.getters["allUsers"]
    }
  },
  <% if(isCrudWithNode) { %>
  created () {
    this.$store.dispatch('getAllUsers')
  }
  <% } %>
};
</script>
