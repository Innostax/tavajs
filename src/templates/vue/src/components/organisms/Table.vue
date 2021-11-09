<template>
  <div>
    <b-table striped :items="allTodos" :fields="fields"></b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Table",
  data() {
    return {
      fields: ["name", "username", "email"],
      items: [],
    };
  },
  computed: {
    ...mapGetters(["allTodos"]),
  },
};
</script>
