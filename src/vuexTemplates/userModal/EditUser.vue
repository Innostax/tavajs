<template>
  <div>
      <Modal id="bv-modal-editUser" title="Edit User">
        <template #body>
          <div class="d-block text-center">
        <b-row>
          <b-col>
            <Label name="Name:" />
          </b-col>
          <b-col>
            <Input type="text" v-model="user.name" placeholder="Name" />
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
              v-model="user.username"
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
              v-model="user.email"
              placeholder="example@email.com"
            />
          </b-col>
        </b-row>       
      </div>
        </template>
        <template #footer>
            <Button id="show-btn" name="Edit User" color="primary" @submit="submitButonHandler"/>
        </template>
      
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Label from "../components/atoms/Label.vue";
import Button from "../components/atoms/Button.vue";
import Input from "../components/atoms/Input.vue";
import Modal from "../components/organisms/Modal.vue"

export default {
  name: "EditUser",
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
