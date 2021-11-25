<template>
  <div id="addModal">
    <Button id="show-btn" className="mt-3" name="Add User" color="primary" @onClick="$bvModal.show('bv-modal-addUser')"/>
    <Modal id="bv-modal-addUser" title="ADD USER:"></Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "../components/organisms/Modal.vue";
import Button from "../components/atoms/Button";
export default {
  name: "AddUser",
  components: {
    Button,
    Modal,
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
      this.name = "";
      this.username = "";
      this.email = "";
    },
  },
};
</script>

<style scoped>
#app {
  margin-bottom: "20px";
}
</style>
