<template>
  <div id="deleteModal">
    <Modal id="bv-modal-deleteUser" title="Delete User">
      <template #body>
        <div class="d-flex fs-6 flex-row">
          <p class="mx-1">Are you sure you want to delete</p>
          <p class="fw-bold">{{ selectedUser.name }}</p>
          <p>?</p>
        </div>
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
