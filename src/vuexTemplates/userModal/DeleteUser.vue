<template>
  <div id="deleteModal">
    <Modal id="bv-modal-deleteUser" title="Delete User">
      <template #body>
        <div class="mx-1">Are you sure you want to delete <span class="fw-bold">{{ selectedUser.name }}</span> ?</div>
      </template>
      <template #footer>
        <Button
          id="show-btn"
          name="Delete"
          color="danger"
          @submit="deleteButtonHandler(selectedUser.id)"
        />
      </template>
    </Modal>
  </div>
</template>
<script>
import Button from "../components/atoms/Button";
import Modal from "../components/organisms/Modal";

export default {
  name: "DeleteUser",
  components: {
    Button,
    Modal,
  },
  methods: {
    deleteButtonHandler: function (id) {
      this.$store.dispatch("deleteUser", id);
      this.$bvModal.hide("bv-modal-deleteUser");
    },
  },
  computed: {
    selectedUser: function () {
      return this.$store.getters["selectedUser"]
    }
  },
};
</script>
