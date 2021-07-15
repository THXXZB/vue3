<template>
<!-- 借调 -->
  <Table :tableData="transferTableData"></Table>
</template>
<script>
import Table from "./table.vue";
import { reactive } from "vue";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup(prop) {
    console.log("user prop tableData", prop.tableData);
    let transferTableData = reactive([])
    transferTableData = prop.tableData.filter((item) => item.type === "借调");
    return {
      transferTableData
    };
  },
  components: {
    Table,
  },
};
</script>