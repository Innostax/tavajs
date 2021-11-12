<template>
  <div id="addModal">
    <Button name="Add User" color="primary" @onClick="$bvModal.show('bv-modal-example')"/>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> ADD USER: </template>
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
        <b-row>
          <b-col>
            <Button name="Add User" color="primary" @submit="onSubmit" @onClick="$bvModal.hide('bv-modal-example')" />
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Label from "../components/atoms/Label";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
export default {
  name: "AddUser",
  components: {
    Label,
    Button,
    Input
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
