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
import { mapActions, mapGetters } from "vuex";
import Button from "../components/atoms/Button";
import Modal from "../components/organisms/Modal";

export default {
  name: "DeleteUser",
  components: {
    Button,
    Modal,
  },
  methods: {
    ...mapActions(["deleteUser"]),
    deleteButtonHandler: function (id) {
      this.deleteUser(id);
      this.$bvModal.hide("bv-modal-deleteUser");
    },
  },
  computed: {
    ...mapGetters(["selectedUser"]),
  },
};
</script>
