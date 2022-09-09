<template>
  <div id="addModal">
    <Button id="show-btn" className="mt-3" name="Add User" color="primary" @onClick="showAddUserModal"/>

    <Modal id="bv-modal-addUser" title="Add User"> 
      <template #body>
        <form ref="form">
          <b-form-group class="p-1">
            <Label class="p-1" input-id="name-input" name="Name"></Label>
            <b-form-input
              id="name-input"
              type="text"
              placeholder="Name"
              v-model="name"
              autofocus
            ></b-form-input>
          </b-form-group>
          <b-form-group class="p-1">
            <Label
              class="p-1"
              input-id="username-input"
              name="Username"
            ></Label>
            <b-form-input
              id="username-input"
              type="text"
              placeholder="Username"
              v-model="username"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="p-1">
            <Label class="p-1" input-id="email-input" name="Email"></Label>
            <b-form-input
              id="email-input"
              type="email"
              placeholder="example@email.com"
              v-model="email"
            ></b-form-input>
          </b-form-group>
        </form>
      </template>
      <template #footer>
        <Button id="show-btn" name="Add User" color="primary" @submit="onSubmit"/>
        <Button id="close-btn" name="Cancel" color="outline-secondary" @onClick="$bvModal.hide('bv-modal-addUser')"/>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label";
import Modal from "../components/organisms/Modal";

const emptyString = "";

export default {
  name: "AddUser",
  components: {
    Label,
    Button,
    Modal
  },
  data() {
    return {
      name: null,
      username: null,
      email: null,
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    onSubmit() {
      const data = {
        name: this.name,
        username: this.username,
        email: this.email,
      };
      this.addUser(data);
      this.$bvModal.hide('bv-modal-addUser')
    },
    showAddUserModal () {
      this.$bvModal.show('bv-modal-addUser')
      this.name = emptyString;
      this.username = emptyString;
      this.email = emptyString;
    },
  },
};
</script>
