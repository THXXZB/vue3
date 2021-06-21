<template>
  <div>
    自定义组件的双向数据绑定 username<br />
    firstName: <input
      type="text"
      class="input"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)"
    /><br />
    lastName: <input
      type="text"
      class="input"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)"
    /><br />
  </div>
</template><script>
export default {
  // 接收Home传过来的值
  props: ["firstName", "lastName"],
};
</script>
<style lang="scss">
.input {
  width: 400px;
  height: 32px;
  line-height: 32px;
}
</style>
