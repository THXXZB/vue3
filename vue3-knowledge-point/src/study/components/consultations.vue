<template>
<!-- 转科 -->
  <Table :tableData="consultationTableData"></Table>
</template>
<script>
import Table from './table.vue';
import { reactive } from "vue";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  setup(prop) {
    let consultationTableData = reactive([])
    consultationTableData = prop.tableData.filter(item => item.type === '会诊')
    return {
      consultationTableData
    };
  },
  components: {
    Table
  }
};
</script>