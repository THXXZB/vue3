<template>
  <div>
    <!-- <h2>vue3 iframe嵌入</h2> -->
    <div style="height: 100px"></div>
    <to-do></to-do>
    <div style="height: 50px"></div>
    <test-axios></test-axios>
  </div>
</template>
<script>
import ToDo from "./components/todo.vue";
import TestAxios from "./components/test-axios.vue"
export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    "to-do": ToDo,
    "test-axios": TestAxios
  },
  methods: {
    forceRerender() {
      console.log('运行 forceRerender')
      this.componentKey += 1;
      console.log('componentKey', this.componentKey)
    },
  },
};
</script>
