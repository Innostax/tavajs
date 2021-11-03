<template>
  <div id="addModal">
    <b-button
      id="show-btn"
      @click="$bvModal.show('bv-modal-example')"
      class="mt-3"
      variant="primary"
      >Add User</b-button
    >

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> ADD USER: </template>
      <div class="d-block text-center">
        <b-row>
          <b-col>
            <Label name="Name:" />
          </b-col>
          <b-col>
            <input type="text" v-model="name" placeholder="ABCD" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="User Name:" />
          </b-col>
          <b-col>
            <input type="text" v-model="username" placeholder="ABC" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="Email:" />
          </b-col>
          <b-col>
            <input type="text" v-model="email" placeholder="abc@gmail.com" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              class="mt-3"
              block
              variant="primary"
              v-on:click="onSubmit"
              @click="$bvModal.hide('bv-modal-example')"
              >Add User</b-button
            >
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Label from "../components/atoms/Label";
export default {
  name: "AddUser",
  components: {
    Label,
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
