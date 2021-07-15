<template>
<!-- 换班 -->
  <Table :tableData="changeTableData"></Table>
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
    let changeTableData = reactive([])
    changeTableData = prop.tableData.filter((item) => item.type === "换班");
    return {
      changeTableData
    };
  },
  components: {
    Table,
  },
};
</script>