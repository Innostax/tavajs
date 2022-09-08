<template>
  <div>
    <Modal id="bv-modal-editUser" title="Edit User">
      <template #body>
        <form>
          <b-form-group class="p-1">
            <Label class="p-1 pt-0" input-id="name-input" name="Name"></Label>
            <b-form-input
              id="name-input"
              type="text"
              placeholder="Name"
              v-model="user.name"
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
              v-model="user.username"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="p-1">
            <Label class="p-1" input-id="email-input" name="Email"></Label>
            <b-form-input
              id="email-input"
              type="email"
              placeholder="example@email.com"
              v-model="user.email"
            ></b-form-input>
          </b-form-group>
        </form>
      </template>
      <template #footer>
        <Button id="show-btn" name="Edit User" color="primary" @submit="submitButonHandler"/>
        <Button id="close-btn" name="Cancel" color="outline-secondary" @onClick="$bvModal.hide('bv-modal-editUser')"/>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "../components/atoms/Button.vue";
import Label from "../components/atoms/Label";
import Modal from "../components/organisms/Modal.vue";

export default {
  name: "EditUser",
  components: {
    Button,
    Label,
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
    ...mapActions(["selectedItem", "editItem"]),
    submitButonHandler() {
      const data = {
        id: this.selectedUser.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
      };
      this.editItem(data);
      this.$bvModal.hide('bv-modal-editUser')
    },
  },
  computed: {
    ...mapGetters(["selectedUser"]),
    user () {
      return { ...this.selectedUser }
    }
  },
};
</script>
