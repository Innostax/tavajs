<template>
  <div>
    <Table :fields=columns :items=allUsers> </Table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["allUsers"]),
  },
};
</script>
