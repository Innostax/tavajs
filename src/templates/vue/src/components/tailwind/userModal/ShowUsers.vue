<template>
  <Table
    :tableData="allUsers"
    :tableColumns="tableColumns"
    v-on:edit-button-clicked="editButtonHandler"
    v-on:delete-button-clicked="deleteButtonHandler"
  />
</template>

<script>
import Table from '../organisms/Table.vue'
// import { mapGetters } from "vuex";

export default ({
  name: "ShowUsers",
  components: {
    Table
  },
  data () {
    return {
      tableColumns: [
        {name: "Name",  key: "name", columnHeaderStyleClasses: "pl-8", rowStyleClasses: "text-primary-70"},
        {name: "User name", key: "username", rowStyleClasses: "pr-12"},
        {name: "email", key: "email", rowStyleClasses: "pr-12"},
        {name: "Edit",  key: "edit", rowStyleClasses:"pr-14", dataFormatter: 'button', buttonName: 'Edit', buttonClasses: 'bg-blue-400' },
        {name: "Delete", color:"#3366ff", key: "delete",  rowStyleClasses: "pr-14" , dataFormatter: 'button', buttonName: 'Delete', style:"btnStyles", buttonClasses: 'bg-red-400'},

      ],
    }
  },
  computed: {
    allUsers:function(){
      return this.$store.getters["allUsers"]
    }
  },
  methods: {
   editButtonHandler(data){
    console.log("i am here", data)
    this.$emit("edit-user",data)
    
   },
   deleteButtonHandler(data){
    this.$emit("delete-user",data)
   }
    
     }
})
</script>


