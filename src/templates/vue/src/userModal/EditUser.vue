<template>
  <div>
    <b-modal id="bv-modal-edit" hide-footer>
      <template #modal-title> Edit User </template>

      <div class="d-block text-center">
        <b-row>
          <b-col>
            <Label name="Name:" />
          </b-col>
          <b-col>
            <Input type="text" v-model="selectedUser.name" placeholder="Name" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="User Name:" />
          </b-col>
          <b-col>
            <Input
              type="text"
              v-model="selectedUser.username"
              placeholder="Username"
            />
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
              v-model="selectedUser.email"
              placeholder="example@email.com"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <Button name="Edit User" color="primary" @submit="onSubmitOne" @onClick="$bvModal.hide('bv-modal-edit')" />
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Label from "../components/atoms/Label.vue";
import Button from "../components/atoms/Button.vue";
import Input from "../components/atoms/Input.vue"
export default {
  name: "EditUser",
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
    ...mapActions(["selectedItem", "editItem"]),
    onSubmitOne() {
      const data = {
        id: this.selectedUser.id,
        name: this.selectedUser.name,
        username: this.selectedUser.username,
        email: this.selectedUser.email,
      };
      this.editItem(data);
    },
  },
  computed: {
    ...mapGetters(["selectedUser"]),
  },
};
</script>
