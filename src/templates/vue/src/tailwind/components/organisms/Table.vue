<template>
  <div class="overflow-x-auto">
    <table class="w-full text-center table-auto table-border-1">
      <thead class="border-b-2 border-gray-700">
        <tr class="capitalize">
          <th v-for="(column, index) in tableColumns" :key="index">
            <div class="flex justify-center">
              <div class="mt-1 flex flex-row cursor-pointer dark:text-white">
                <span>
                  {{ column.name }}
                </span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(eachRow, rowIndex) in tableData"
          :key="rowIndex"
          class="dark:text-white h-10 hover:bg-gray-200 dark:hover:bg-vueBlack-lighter cursor-pointer"
        >
          <td v-for="(column, columnIndex) in tableColumns" :key="columnIndex">
            <div class="flex justify-center">
              <div class="mt-1 mb-1 flex flex-row cursor-pointer">
                <span>
                  {{ eachRow[column.key] }}
                </span>
                <span v-if="column.dataFormatter === 'button'">
                  <button
                    :name="column.buttonName"
                    :class="column.buttonClasses"
                    class="text-white rounded px-3 py-2 shadow-sm"
                    @click="ButtonHandler(column.buttonName, eachRow)"
                  >
                    {{ column.buttonName }}
                  </button>
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  components: {},
  props: {
    tableColumns: {
      type: Array,
      required: true,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    ButtonHandler(buttonName, data) {
      buttonName === "Edit" ? this.$emit("edit-button-clicked", data) : this.$emit("delete-button-clicked", data);
    },
  },
};
</script>

<style>
table {
  vertical-align: middle !important;
}
@media (min-width: 992px) {
  table {
    table-layout: fixed;
  }
}
tbody tr:nth-of-type(odd) {
  /* 'teal lighten-5' basides on material design color */
  @apply bg-gray-100 dark:bg-vueBlack-lightest;
}
</style>
