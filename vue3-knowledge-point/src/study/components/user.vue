<template>
  <!-- <div class="all-page">

  </div> -->
  <Table></Table>
</template>
<script>
import Table from './table.vue';
import { ref } from "vue";
export default {
  setup() {
    let { count, updateCount } = countHandler();

    return {
      count,
      updateCount,
    };
  },
  components: {
    Table
  }
};
function countHandler() {
  let count = ref(1);
  let updateCount = () => {

    count.value++;
  };
  return { count, updateCount };
}
</script>
<style lang="scss">
  .all-page{
    height: 600px;
    width: 100%;
  }
</style>