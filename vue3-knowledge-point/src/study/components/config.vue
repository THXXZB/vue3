<template>
<!-- 请假 -->
  <Table :tableData="leaveTableData"></Table>
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
    let leaveTableData = reactive([])
    leaveTableData = prop.tableData.filter((item) => item.type === "请假");
    return {
      leaveTableData
    };
  },
  components: {
    Table,
  },
};
</script>