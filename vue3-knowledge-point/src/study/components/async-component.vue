<template>
  <component :is="asyncComponent" v-bind="$attrs">
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
  },
  data() {
    return {
      asyncComponent: factory(this.path, this.delay, this.timeout),
    };
  },
  mounted() {
    console.log('跳转到：', this.path)
  },
  
};
</script>