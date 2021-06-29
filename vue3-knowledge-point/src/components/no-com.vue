<template>
  <div style="color:#f40">
    no-com组件 >> ：{{msg}}
  </div>
</template>
<script>
export default {
  // 父组件msg值改变，子组件中inject接收到的msg不变，无法实现响应式
  // 可以结合 组合式api来实现provide-inject的响应式
  inject:['msg']
}
</script>