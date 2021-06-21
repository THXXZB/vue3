<template>
  <div class="date-picker">
    <!-- v-bind="$attrs"使input继承attribute属性 -->
    <input type="date" v-bind="$attrs"/>
  </div>
</template>
<script>
export default {
  // 禁用默认继承
  inheritAttrs:false
};
</script>