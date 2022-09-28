<template>
  <div>
    <Modal id="deletemodal"  :show="show">
    <template v-slot:header class="border-b-2" >
  <div class="flex border-b-2 w-full border-gray p-4">
  <div class="pt-2 text-xl pl-4">Delete User</div>
  <Button class="ml-auto text-gray rounded px-3 py-2 text-xl  hover:text-black" name="X" @onClick="close"/>
  </div>
    </template>
    <template v-slot:body>

      <div>Are you sure you want to delete

        <span class="font-bold">{{ selectedUser.name }}</span>
        <span>?</span>
      </div>
        </template>
    <template v-slot:footer>
        <Button
          id="show-btn"
          name="Delete"
          class="text-white rounded bg-red-500 px-3 py-2  m-3 ml-auto shadow-sm hover:bg-red-600"

          @onClick="deleteButtonHandler(selectedUser.id)"
        />

    </template>
  </Modal>
</div>
</template>
<script>
    // import { mapActions, mapGetters } from "vuex";
    import Modal from "../organisms/Modal.vue";
    import Button from "../atoms/Button.vue";

    export default {
      name: "DeleteUser",
      components: {
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
    deleteButtonHandler: function (id) {
      this.$store.dispatch("deleteUser", id);
      this.$emit("close-delete-modal")
    },
    close () {
       this.$emit("close-delete-modal")
     } ,
  },
  computed: {
    selectedUser: function () {
      return this.$store.getters["selectedUser"]
    }
  },

    };
    </script>
    