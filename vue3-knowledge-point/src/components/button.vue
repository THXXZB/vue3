<template>
  <button class="btn">
    <!-- slot可以传字符串、html标签，还可以绑定父组件的数据 -->
    <!-- 还可以设置默认值 -->
    <slot>submit</slot>  
  </button>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scope>
 .btn{
    padding: 10px 20px;
    color: #fff;
    background-color: #aaa;
  }
  .primary{
    padding: 10px 20px;
    color: #fff;
    background-color: #ab2;
  }
  .back{
    padding: 10px 20px;
    color: #fff;
    background-color: #f40;
  }
</style>