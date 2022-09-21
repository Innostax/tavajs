<template>
  <div>
    <Modal id="bv-modal-editUser" title="Edit User">
      <template #body>
        <form>
          <div class="mb-3">
            <Label for="name-input" class="form-label" name="Name">Name</Label>
            <input type="text" class="form-control" id="name-input" placeholder="Name" v-model="user.name" />
          </div>
        <div class="mb-3">
          <Label for="username-input" class="form-label" name="Username"></Label>
          <input type="text" class="form-control" id="username-input" placeholder="Username" v-model="user.username" />
        </div>
        <div class="mb-3">
          <Label for="email-input" class="form-label" name="Email"></Label>
          <input type="text" class="form-control" id="email-input" placeholder="example@email.com" v-model="user.email" />
        </div> 
      </form>
      </template>
      <template #footer>
        <Button type="submit" color="primary" data-bs-dismiss="modal" @onClick="submitButonHandler" name="Edit User"></Button>
        <Button type="button" color="outline-secondary" data-bs-dismiss="modal" name="Cancel"></Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from "../components/atoms/Button.vue";
import Label from "../components/atoms/Label";
import Modal from "../components/organisms/Modal.vue";
import { mapGetters } from "vuex";

export default {
  name: "EditUser",
  components: {
    Button,
    Label,
    Modal
  },
  methods: {
    submitButonHandler() {
      const data = {
        id: this.selectedUser.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
      };
      this.$store.dispatch("editItem", data);
    },
  },
  computed: {
    ...mapGetters(['selectedUser']),
    user () {
      return { ...this.selectedUser }
    }
  },
};
</script>
