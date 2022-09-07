<template>
  <div id="addModal">
    <Button id="show-btn" className="mt-3" name="Add User" color="primary" @onClick="showAddUserModal"/>

    <Modal id="bv-modal-addUser" title="ADD USER:"> 
      <template #body>
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
              <Input type="text" v-model="email" placeholder="example@email.com" />
            </b-col>
          </b-row>
        </div>
      </template>
      <template #footer>
          <Button id="show-btn" name="Add User" color="primary" @submit="onSubmit"/>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Label from "../components/atoms/Label";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Modal from "../components/organisms/Modal";

const emptyString = "";

export default {
  name: "AddUser",
  components: {
    Label,
    Button,
    Input,
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
