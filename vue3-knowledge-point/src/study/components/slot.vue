<template>
  <div>
    <br />
    <h1>v-slot 插槽</h1>
    <slot-child>
      <template #default>
        <p>content 默认区域的内容</p>
      </template>
      <template v-slot:header>
        <h2>header 具名插槽</h2>
      </template>
      <template #footer>
        <p>footer 内容</p>
      </template>
    </slot-child>
  </div>
</template>

<script>
import SlotChild from "./slot-child.vue";
export default {
  components: {
    "slot-child": SlotChild,
  },
  
};
</script>

<style>
</style>