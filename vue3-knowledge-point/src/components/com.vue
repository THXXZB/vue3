<template>
  <div style="color: #7ba">
    com >> : {{ title }} <br />
    <div style="color: #73a">
      dog.name: {{ aniName }} --- dog.age: {{ aniAge }} <br />
      dog.age: <input type="text" v-model="aniAge" /><br />
      props父子组件传值不可逆，但provide-inject可逆
    </div>
  </div>
</template>
<script>
import { inject, toRefs } from "vue";
export default {
  setup() {
    let title = inject("title");
    let dog = inject("dog");
    return {
      title,
      ...toRefs(dog),
    };
  },
};
</script>