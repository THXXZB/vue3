<template>
  <div>
    自定义组件的双向数据绑定<br />
    <!-- @input... 当输入框中的值改变时触发自定义事件，将值传给keyValue，实现双向数据绑定  -->
    <input
      type="text"
      class="input"
      :value="keyValue"
      @input="$emit('update:keyValue', $event.target.value)"
    /><br />
  </div>
</template><script>
export default {
  // 接收Home传过来的值
  props: ["keyValue"],
};
</script>
<style lang="scss">
.input {
  width: 400px;
  height: 32px;
  line-height: 32px;
}
</style>
