<template>
  <div>
    user page
    <p>count: {{ count }}</p>
    <button @click="updateCount()">update count</button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let { count, updateCount } = countHandler();

    return {
      count,
      updateCount,
    };
  },
};
function countHandler() {
  let count = ref(1);
  let updateCount = () => {

    count.value++;
  };
  return { count, updateCount };
}
</script>