<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>1. 分离mixins模块（在组件中引入mixin并声明）</h2>
    <h2>2. 全局配置mixins（直接使用）</h2>
    {{ data }}<br />
    <button @click="fail()">执行mixins(module)中的方法</button>
    <Mixin></Mixin>
  </div>
</template>
<script>
import Mixin from "@/components/mixin.vue";
// import basicMixin from "../modules/mixinModule";

export default {
  // mixins: [basicMixin],
  components: {
    Mixin,
  },
};
</script>
