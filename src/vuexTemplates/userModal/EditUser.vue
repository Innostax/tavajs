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
            <input type="text" v-model="selectedUser.name" placeholder="ABC" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="User Name:" />
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="selectedUser.username"
              placeholder="ABC"
            />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <Label name="Email:" />
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="selectedUser.email"
              placeholder="abc@gmail.com"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              class="mt-3"
              block
              variant="primary"
              v-on:click="onSubmitOne"
              @click="$bvModal.hide('bv-modal-edit')"
              >Edit User</b-button
            >
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Label from "../components/atoms/Label";
export default {
  name: "EditUser",
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
