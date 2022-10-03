<template>
  <Modal id="deletemodal" :show="show" class="dark:text-white">
    <template v-slot:header>
      <div class="flex w-full p-4 text-xl">
        <div>Delete User</div>
        <Button
          class="ml-auto text-gray px-3"
          name="X"
          @onClick="close"
        />
      </div>
    </template>
    <template v-slot:body>
      <div class="text-left">
        Are you sure you want to delete
        <span class="font-bold">{{ selectedUser.name }}</span>
        <span>?</span>
      </div>
    </template>
    <template v-slot:footer>
      <Button
        id="show-btn"
        name="Delete"
        class="text-white rounded px-3 py-2 ml-auto shadow-sm bg-red-600"
        @onClick="deleteButtonHandler(selectedUser.id)"
      />
    </template>
  </Modal>
</template>

<script>
import Modal from "../components/organisms/Modal.vue";
import Button from "../components/atoms/Button";

export default {
  name: "DeleteUser",
  components: {
    Button,
    Modal,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deleteButtonHandler: function (id) {
      this.$store.dispatch("deleteUser", id);
      this.$emit("close-delete-modal");
    },
    close() {
      this.$emit("close-delete-modal");
    },
  },
  computed: {
    selectedUser: function () {
      return this.$store.getters["selectedUser"];
    },
  },
};
</script>
