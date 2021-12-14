<template>
  <div id="addModal">
    <Button
      id="show-btn"
      className="mt-3"
      name="Add User"
      color="primary"
      @onClick="$bvModal.show('bv-modal-addUser')"
    />
    <Modal id="bv-modal-addUser" title="ADD USER:">
      <div class="d-block text-center">
        <b-row>
          <b-col>
            <Label name="Name:" />
          </b-col>
          <b-col>
            <Input type="text" v-model="name" placeholder="Name" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="User Name:" />
          </b-col>
          <b-col>
            <Input type="text" v-model="username" placeholder="Username" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="Email:" />
          </b-col>
          <b-col>
            <Input
              type="text"
              v-model="email"
              placeholder="example@email.com"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <Button
              id="show-btn"
              className="mt-3"
              name="Add User"
              color="primary"
              @submit="onSubmit"
              @onClick="$bvModal.hide('bv-modal-addUser')"
            />
          </b-col>
        </b-row>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "../components/organisms/Modal.vue";
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label.vue";
import Input from "../components/atoms/Input.vue";
export default {
  name: "AddUser",
  components: {
    Button,
    Modal,
    Label,
    Input,
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
