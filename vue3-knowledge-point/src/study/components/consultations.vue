<template>
<!-- 会诊 -->
  <Table :tableData="consultationTableData" :name='name'></Table>
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
  data() {
    return {
      name: '会诊'
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