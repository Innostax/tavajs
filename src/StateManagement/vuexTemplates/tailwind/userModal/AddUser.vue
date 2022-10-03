<template>
  <div>
    <div>
      <Button
        class="text-white rounded px-3 py-2 shadow-sm bg-blue-600"
        @onClick="show = true"
        name="Add User"
      ></Button>
    </div>
    <Modal title="Add User" :show="show">
      <template v-slot:header>
        <div class="flex w-full h-15 p-4 dark:text-white text-xl">
          <div>Add User</div>
          <Button
            class="ml-auto text-gray px-3"
            name="X"
            @onClick="close()"
          ></Button>
        </div>
      </template>
      <template v-slot:body>
        <form>
          <div class="text-left mb-4">
            <Label class="my-4" input-id="name-input" name="Name"></Label>
            <InputVue
              id="name-input"
              type="text"
              placeholder="Name"
              v-model="name"
              class="px-3 py-5 mt-1 placeholder-slate-300 focus-auto text-slate-600 relative rounded 
              h-10 border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div></div>
          <div class="text-left mb-4">
            <Label input-id="username-input" name="Username"></Label>
            <InputVue
              id="username-input"
              type="text"
              placeholder="Username"
              v-model="username"
              class="px-3 py-5 mt-1 placeholder-slate-300 text-slate-600 relative h-10 rounded border 
              border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div class="text-left">
            <Label input-id="email-input" name="Email"></Label>
            <InputVue
              id="email-input"
              type="email"
              variant="danger"
              class="px-3 py-5 mt-1 placeholder-slate-300 text-slate-600 relative h-10 rounded border 
              border-slate-300 outline-none focus:outline-none focus:ring w-full"
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
          :isDisabled="isAddButtonDisabled"
          @onClick="onSubmit"
          name="Add User"
          class="text-white rounded px-3 py-2 ml-auto shadow-sm mr-3"
          :class="isAddButtonDisabled ? 'bg-blue-400' : 'bg-blue-600'"
        ></Button>
        <Button
          class="text-gray border border-gray-500 px-3 py-2 ml-auto shadow-sm hover:bg-gray-500 
          hover:text-white active:bg-gray-600 font-bold rounded outline-none focus:outline-none dark:text-white"
          name="Cancel"
          type="button"
          @onClick="close()"
        >
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label";
import Modal from "../components/organisms/Modal";
import InputVue from "../components/atoms/Input.vue";

const emptyString = "";

export default {
  name: "AddUser",
  components: {
    Label,
    Button,
    Modal,
    InputVue,
  },
  data() {
    return {
      name: null,
      username: null,
      email: null,
      show: false,
    };
  },
  methods: {
    onSubmit() {
      const data = {
        name: this.name,
        username: this.username,
        email: this.email,
      };
      this.$store.dispatch("addUser", data);
      this.show = false;
      this.showAddUserModal();
    },
    showAddUserModal() {
      this.name = emptyString;
      this.username = emptyString;
      this.email = emptyString;
    },
    close() {
      this.show = false
      this.showAddUserModal()
    }
  },
  computed: {
    isAddButtonDisabled() {
      return !this.email || !this.username || !this.name;
    },
  },
};
</script>
