<template> 
  <Modal id="editUser" title="Edit User" :show="show">
    <template v-slot:header class="border-b-2 ">
      <div class="flex border-b-2 w-full h-15 border-gray p-4">
        <div class="pt-2 text-xl pl-4">Edit User</div>
        <button class="ml-auto text-gray rounded px-3 py-2 text-xl hover:text-black"  @click="close">X</button>
      </div>
    </template>
    <template v-slot:body>
      <form>
        <div class="p-1 text-left">
          <Label class="p-1 pt-0" input-id="name-input" name="Name"/>
          <input
            id="name-input"
            type="text"
            placeholder="Name"
            class="px-3 py-3 placeholder-slate-300 text-slate-600 relative 
              h-10 rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            v-model="user.name"
          >
        </div>
        <div class="p-1 text-left">
          <Label class="p-1" input-id="username-input" name="Username"/>
          <input
            id="username-input"
            type="text"
            placeholder="Username"
            class="px-3 py-3 placeholder-slate-300 text-slate-600 relative h-10
              rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            v-model="user.username"
          >
        </div>
        <div class="p-1 text-left">
          <Label class="p-1" input-id="email-input" name="Email"/>
          <input
            id="email-input"
            type="email"
            class="px-3 py-3 placeholder-slate-300 text-slate-600 relative h-10  
              rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            placeholder="example@email.com"
            v-model="user.email"
          >
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <Button
        type="submit"
        data-bs-dismiss="modal"
        @onClick="submitButonHandler"
        class="text-white rounded bg-blue-400 px-3 py-2  m-3 ml-auto shadow-sm hover:bg-blue-600" 
        name="Edit User"/>
      <Button 
        class="text-gray border border-gray-500 px-3 py-2 ml-auto
          m-3 shadow-sm hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold
          rounded outline-none focus:outline-none" 
        type="button" 
        name="Cancel" 
        @onClick="close"/>
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import Label from "../atoms/Label.vue";
import Button from "../atoms/Button.vue";
import Modal from "../organisms/Modal.vue";

export default {
  name: "EditUser",
  components: {
    Label,
    Button,
    Modal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitButonHandler () {
      const data = {
        id: this.selectedUser.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
      };
      this.$store.dispatch("editItem", data);
      this.$emit("close-edit-modal")
    },
    close () {
      this.$emit("close-edit-modal")
    }
  },
  computed: {
    ...mapGetters(["selectedUser"]),
    user () {
      return { ...this.selectedUser }
    }
  },
};
</script>
