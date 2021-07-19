<template>
<!-- 转科 -->
  <div>
    <Table :tableData="majorTableData" :name="name"></Table>
  </div>
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
    console.log('-------------------majorData', majorTableData)
    return {
      majorTableData
    };
  },
  data() {
    return {
      name: 'mojor'
    }
  },
  components: {
    Table
  },
  // mounted() {
  //   this.majorTableData = this.tableData.filter(item => item.type === '转科')
  // },
};
</script>