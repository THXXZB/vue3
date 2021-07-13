<template>
  <div style="width: 80%; margin: 0 auto; border: 2px solid #f4f">
    <slot :msg="data"></slot>
    <!-- <slot :msg="data" name="massage"></slot> -->
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "子组件msg---作用域插槽",
    };
  },
};
</script>