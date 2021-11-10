<template>
  <div>
    <vue-bootstrap4-table v-bind:columns="columns" v-bind:rows="rows" :config="config">
    </vue-bootstrap4-table>
  </div>
</template>

<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
export default {
  name: "Table",
  props: ["columns", "rows"],
   data: function() {
            return {
              config:{
                card_mode:false,
                pagination:false,
                pagination_info:false,
                highlight_row_hover:false,
                global_search:{visibility:false},
                show_refresh_button:  false,
                show_reset_button:  false,
                server_mode:  false,
                preservePageOnDataChange: false
              }
            }
            },
  components: {
    VueBootstrap4Table,
  },
};
</script>