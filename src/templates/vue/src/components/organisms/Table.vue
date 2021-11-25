<template>
  <div>
    <b-table :fields="fields" :items="items" striped>
      <template v-for="user in allUsers" #cell(edit)="">
        <b-button variant="primary" :key="user.id" v-on:click="$bvModal.show('bv-modal-editUser')" @click="editOne(user.id)"> Edit </b-button>
      </template>
      <template v-for="user in allUsers" #cell(delete)="">
        <b-button variant="danger" :key="user.id" v-on:click="removeOne(user.id)"> Delete </b-button>
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
