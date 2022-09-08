<template>
  <div>
    <b-table :fields="fields" :items="items" striped hover fixed :tbody-tr-class="rowClass">
      <template v-for="user in allUsers" #cell(edit)="data">
        <b-button variant="primary" :key="user.id" @click="editButtonHandler(data.item.id)"> Edit </b-button>
      </template>
      <template v-for="user in allUsers" #cell(delete)="data">
        <b-button variant="danger" :key="user.id" @click="removeButtonHandler(data.item.id)"> Delete </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Table",
  components: {
  },
  props: ["fields","items"],
  methods: {
    ...mapActions(["deleteUser", "selectedItem"]),
    removeButtonHandler: function (id) {
      this.deleteUser(id);
    },
    editButtonHandler: function (id) {
      this.selectedItem(id);
      this.modalShow = false;
      this.$bvModal.show('bv-modal-editUser')
    },
    rowClass() {
      return 'align-middle'
    }
  },
  computed: {
    ...mapGetters(["allUsers", "selectedUser"]),
  },
  created() {
    this.mapActions;
  },
};
</script>
