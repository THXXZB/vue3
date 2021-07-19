<template>
<!-- 全部 -->
  <Table :tableData="tableData" :name="name"></Table>
</template>
<script>
import Table from './table.vue';
// import { ref } from "vue";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return{
      name: 'all'
    }
  },
  // setup(prop) {
  //   console.log('user prop tableData', prop.tableData)
  //   let userTableData = prop.tableData.filter(item => item.type === '请假')
  //   return {

  //   };
  // },
  components: {
    Table
  }
};
</script>
<style lang="scss">
  .all-page{
    height: 600px;
    width: 100%;
  }
</style>