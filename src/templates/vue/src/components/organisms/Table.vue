<template>
  <div>
    <b-table :fields="fields" :items="items" striped hover>
      <template v-for="item in items" #cell(edit)="data">
        <Button color="primary" :key="item.id" data-bs-toggle="modal" data-bs-target="#bv-modal-editUser" @onClick="editButtonHandler(data.item.id)" name="Edit"/>
      </template>
      <template v-for="item in items" #cell(delete)="data">
        <Button color="danger" :key="item.id" data-bs-toggle="modal" data-bs-target="#bv-modal-deleteUser" @onClick="removeButtonHandler(data.item.id)" name="Delete"/> 
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Button from "../atoms/Button.vue"
export default {
  name: "Table", 
  components: {
    Button
  },
  props: ["fields","items"],
  methods: {
    ...mapActions(["selectedItem"]),
    removeButtonHandler: function (id) {
      this.selectedItem(id);
    },
    editButtonHandler: function (id) {
      this.selectedItem(id);
    },
    rowClass() {
      return 'align-middle'
    }
  },
  computed: {
    ...mapGetters(["selectedUser"]),
  },
  created() {
    this.mapActions;
  },
};
</script>

<style>
  .table{
    table-layout: fixed ;
    vertical-align: middle !important;
  }
</style>
