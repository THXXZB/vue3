<template>
<!-- 转科 -->
  <Table :tableData="majorTableData"></Table>
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
    let majorTableData = reactive([])
    majorTableData = prop.tableData.filter(item => item.type === '转科')
    return {
      majorTableData
    };
  },
  components: {
    Table
  }
};
</script>