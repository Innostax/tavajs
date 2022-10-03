<template>
  <div>
    <Modal id="bv-modal-editUser" title="Edit User">
      <template #body>
        <form>
          <div class="mb-3">
            <Label for="name-input" class="form-label" name="Name">Name</Label>
            <InputVue type="text" class="form-control" id="name-input" placeholder="Name" v-model="name" />
          </div>
        <div class="mb-3">
          <Label for="username-input" class="form-label" name="Username"></Label>
          <InputVue type="text" class="form-control" id="username-input" placeholder="Username" v-model="username" />
        </div>
        <div class="mb-3">
          <Label for="email-input" class="form-label" name="Email"></Label>
          <InputVue type="text" class="form-control" id="email-input" placeholder="example@email.com" v-model="email" />
        </div> 
      </form>
      </template>
      <template #footer>
        <Button type="submit" :color="isEditButtonDisabled ? 'secondary' : 'primary'"  data-bs-dismiss="modal" @onClick="submitButonHandler" name="Edit User" :isDisabled="isEditButtonDisabled"></Button>
        <Button type="button" color="outline-secondary" data-bs-dismiss="modal" name="Cancel"></Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from "../components/atoms/Button.vue";
import Label from "../components/atoms/Label";
import Modal from "../components/organisms/Modal.vue";
import InputVue from "../components/atoms/Input.vue";
import { mapGetters } from "vuex";

export default {
  name: "EditUser",
  components: {
    Button,
    Label,
    Modal,
    InputVue
  },
  data() {
    return {
        name: null,
        email: null,
        username: null
    }
  },
  methods: {
    submitButonHandler() {
      const data = {
        id: this.selectedUser.id,
        name: this.name,
        username: this.username,
        email: this.email,
      };
      this.$store.dispatch("editItem", data);
    },
  },
  computed: {
    ...mapGetters(['selectedUser']),
    isEditButtonDisabled() {
      return !this.email || !this.username || !this.name
    }
  },
  watch: {
    selectedUser : function (newValue) {
      this.name = newValue?.name
      this.username = newValue?.username
      this.email = newValue?.email
    }
  }
};
</script>
