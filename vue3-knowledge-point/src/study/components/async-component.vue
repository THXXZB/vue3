<template>
  <component :is="asyncComponent" :tableData="data">
    
  </component>
</template>
<script>
import factory from "../util/factory";
export default {
  props: {
    path: {
      type: String,
    },
    // 延迟加载时间
    delay: {
      type: Number,
      default: 20,
    },
    // 超时警告时间
    timeout: {
      type: Number,
      default: 5000,
    },
    // 表格数据
    data: {
      typep: Array,
      default: () => []
    }
  },
  data() {
    return {
      asyncComponent: factory(this.path, this.delay, this.timeout),
    };
  },
  
};
</script>