
<template>
  <div class="overflow-x-auto">
      <table class="w-full text-center table-auto table-border-1 ">
          <thead class="border-b-2 border-gray-300">
              <tr class="text-sg-small capitalize">
                  <th v-for="(column, index) in tableColumns" :key="index">
                      <div class="flex justify-around">
                          <div class="mt-1 flex flex-row cursor-pointer">
                              <span :class="column.columnHeaderStyleClasses"> {{column.name}} </span>  
                          </div>   
                      </div>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr 
                v-for="(eachRow, rowIndex) in tableData" 
                :key="rowIndex" 
                class="text-sg-body border-b border-gray-30 h-10 hover:bg-blue-10  cursor-pointer" 
              >
                  <td v-for="(column, columnIndex) in tableColumns" :key="columnIndex">
                    <div class="flex justify-around ml-10">  
                    <div class="mt-1 mb-1 flex flex-row cursor-pointer ">
                          <span v-if="column.dataFormatter === 'button'">
                              <button :name="column.buttonName" type="button" :class="column.buttonClasses" :color="column.buttonColor" class="text-white rounded px-3 py-2 shadow-sm "
                              @click="ButtonHandler(column.buttonName, eachRow)">{{column.buttonName }}</button>
                          </span>
                          <span :class="column.rowStyleClasses"> {{ eachRow[column.key] }} </span>
                      </div></div>
                  </td>
              </tr>               
          </tbody>
      </table>
  </div>   
</template>

<script>
  // import { mapGetters, mapActions } from "vuex";

export default {

  name: "Table",
  components: {
  },
  props: {
      tableColumns: {
          type: Array,
          required: true,
          default: () => []
      },
      tableData: {
          type: Array,
          default: () => [],
          required: true,
      },
      
  },
  methods: {
   
  ButtonHandler(buttonName, data){      
      if (buttonName === 'Edit') {
        console.log(buttonName=='Edit')
        this.$emit("edit-button-clicked",data)
      } else this.$emit("delete-button-clicked", data);
    }
  
    },
    
  

  };

      
  

</script>
<style>
  table{    
    vertical-align: middle !important;
  }
  @media (min-width: 992px) {
    table{
      table-layout: fixed ;
    }
  }
  tbody tr:nth-of-type(odd) {
      /* 'teal lighten-5' basides on material design color */
      background-color: #ebeff3;
  }
</style>
