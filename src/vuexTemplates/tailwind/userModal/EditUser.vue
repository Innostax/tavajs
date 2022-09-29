<template>
  <Modal id="editUser" title="Edit User" :show="show">
    <template v-slot:header class="border-b-2">
      <div class="flex border-b-2 w-full h-15 border-gray p-4 dark:text-white">
        <div class="pt-2 text-xl pl-2">Edit User</div>
        <button
          class="ml-auto text-gray rounded px-3 py-2 text-xl"
          @click="close"
        >
          X
        </button>
      </div>
    </template>
    <template v-slot:body>
      <form>
        <div class="p-1 text-left">
          <Label class="p-1 pt-0" input-id="name-input" name="Name"></Label>
          <input
            id="name-input"
            type="text"
            placeholder="Name"
            class="px-3 py-5 mt-1 placeholder-slate-300 text-slate-600 relative h-10 rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            v-model="name"
          />
        </div>
        <div class="p-1 text-left">
          <Label class="p-1" input-id="username-input" name="Username"></Label>
          <input
            id="username-input"
            type="text"
            placeholder="Username"
            class="px-3 py-5 mt-1 placeholder-slate-300 text-slate-600 relative h-10 rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            v-model="username"
          />
        </div>
        <div class="p-1 text-left">
          <Label class="p-1" input-id="email-input" name="Email"></Label>
          <input
            id="email-input"
            type="email"
            class="px-3 py-5 mt-1 placeholder-slate-300 text-slate-600 relative h-10 rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            placeholder="example@email.com"
            v-model="email"
          />
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <Button
        type="submit"
        data-bs-dismiss="modal"
        @onClick="submitButonHandler"
        :isDisabled="isEditButtonDisabled"
        class="text-white rounded px-3 py-2 m-3 ml-auto shadow-sm"
        :class="isEditButtonDisabled ? 'bg-blue-400' : 'bg-blue-600'"
        name="Submit"
      />
      <Button
        class="text-gray border border-gray-500 px-3 py-2 ml-auto m-3 shadow-sm hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold rounded outline-none focus:outline-none dark:text-white"
        type="button"
        name="Cancel"
        @onClick="close"
      />
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import Label from "../components/atoms/Label";
import Button from "../components/atoms/Button";

import Modal from "../components/organisms/Modal.vue";

export default {
  name: "EditUser",
  components: {
    Label,
    Button,
    Modal,
  },
  data() {
    return {
      name: null,
      email: null,
      username: null,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
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
      this.$emit("close-edit-modal");
    },
    close() {
      this.$emit("close-edit-modal");
    },
  },
  computed: {
    ...mapGetters(["selectedUser"]),
    isEditButtonDisabled() {
      return !this.email || !this.username || !this.name;
    },
  },
  watch: {
    selectedUser: function (newValue) {
      this.name = newValue?.name;
      this.username = newValue?.username;
      this.email = newValue?.email;
    },
  },
};
</script>
