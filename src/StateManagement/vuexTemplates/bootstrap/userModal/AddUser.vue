<template>
  <div>
    <Button type="button" color="primary" name="Add User" data-bs-toggle="modal" data-bs-target="#bv-modal-addUser" @onClick="showAddUserModal"/>

    <Modal id="bv-modal-addUser" title="Add User">
      <template #body>
        <form>
          <div class="mb-3">
            <Label inputId="name-input" class="form-label" name="Name"></Label>
            <InputVue
              type="text"
              class="form-control"
              id="name-input"
              placeholder="Name"
              v-model="name"
            />
          </div>
          <div class="mb-3">
            <Label
              inputId="username-input"
              class="form-label"
              name="Username"
            ></Label>
            <InputVue
              type="text"
              class="form-control"
              id="username-input"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="mb-3">
            <Label
              inputId="email-input"
              class="form-label"
              name="Email"
            ></Label>
            <InputVue
              type="text"
              class="form-control"
              id="email-input"
              placeholder="example@email.com"
              v-model="email"
            />
          </div>
        </form>
      </template>
      <template #footer>
        <Button type="submit" :color="isAddButtonDisabled ? 'secondary' : 'primary'" :isDisabled="isAddButtonDisabled" data-bs-dismiss="modal" @submit="onSubmit" name="Add User"></Button>
        <Button type="button" color="outline-secondary" data-bs-dismiss="modal" name="Close" ></Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label";
import Modal from "../components/organisms/Modal";
import InputVue from "../components/atoms/Input.vue";

const emptyString = "";

export default {
  name: "AddUser",
  components: {
    Label,
    Button,
    Modal,
    InputVue
  },
  data() {
    return {
      name: null,
      username: null,
      email: null,
    };
  },
  methods: {
    onSubmit() {
      const data = {
        name: this.name,
        username: this.username,
        email: this.email,
      };
      this.$store.dispatch("addUser", data);
    },
    showAddUserModal() {
      this.name = emptyString;
      this.username = emptyString;
      this.email = emptyString;
    },
  },
  computed: {
    isAddButtonDisabled() {
      return !this.email || !this.username || !this.name
    }
  }
};
</script>
