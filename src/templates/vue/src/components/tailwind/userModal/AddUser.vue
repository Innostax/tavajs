<template>
<div>
  <div><Button 
class="text-white rounded bg-blue-400 px-3 py-2 shadow-sm hover:bg-blue-600"
@onClick="show=true" name="Add User"></Button></div>
 
<Modal title="Add User" :show="show" >
  <template v-slot:header class="border-b-2 ">
<div class="flex border-b-2 w-full h-15 border-gray p-4">
<div class="pt-2 text-xl pl-4">Add User</div>
<Button class="ml-auto text-gray rounded px-3 py-2 text-xl  hover:text-black" name="X" @onClick="show=false"></Button>
</div>
  </template>
  <template v-slot:body>
    <form>
    <div class="p-1 text-left">
      <Label class="p-1" input-id="name-input" name="Name"></Label>
      <input
        id="name-input"
        type="text"
        placeholder="Name"
        v-model="name"
        class="px-3 py-3 placeholder-slate-300 focus-auto text-slate-600 relative  rounded h-10  border border-slate-300 outline-none focus:outline-none focus:ring w-full"
        >
    </div>
    <div></div>
    <div  class="p-1 text-left">
      <Label
        class="p-1"
        input-id="username-input"
        name="Username"
      ></Label>
      <input
        id="username-input"
        type="text"
        placeholder="Username"
        v-model="username"
       class="px-3 py-3 placeholder-slate-300 text-slate-600 relative h-10  rounded  border border-slate-300 outline-none focus:outline-none focus:ring w-full"
      >          </div>
    <div class="p-1 text-left">
      <Label class="p-1" input-id="email-input" name="Email"></Label>
      <input
        id="email-input"
        type="email"
        variant="danger"
        class="px-3 py-3 placeholder-slate-300 text-slate-600 relative h-10  rounded  border border-slate-300 outline-none focus:outline-none focus:ring w-full"
        placeholder="example@email.com"
        v-model="email"

      >
    </div>
 </form>
  </template>
  <template v-slot:footer>
     <Button
    type="submit"
    color="primary"
    data-bs-dismiss="modal"
    @onClick="onSubmit"
    name="Add User"
     class="text-white rounded bg-blue-400 px-3 py-2  m-3 ml-auto shadow-sm hover:bg-blue-600"
  ></Button>
  <Button class="text-gray border border-gray-500 px-3 py-2 ml-auto  m-3  shadow-sm  hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold rounded outline-none focus:outline-none" name="Cancel" type="button" @onClick="show=false"
>
</Button>
  </template>
</Modal>
</div>

</template>
<script>
import Button from "../atoms/Button.vue";
  import Label from "../atoms/Label.vue";
  import Modal from "../organisms/Modal.vue";
  //  import { ref } from 'vue';

  const emptyString = "";
  
  export default {
    name: "AddUser",
    components: {
      Label,
      Button,
      Modal
    },
    data() {
      return {
        name: null,
        username: null,
        email: null,
        show: false
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
        this.show=false
        this.showAddUserModal()
      },
      showAddUserModal() {
        this.name = emptyString;
        this.username = emptyString;
        this.email = emptyString;
      },
    },
    }

  </script>
  
   
    
   