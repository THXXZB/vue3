<template>
  <div>
    <h2>mixins实现组件功能复用</h2>
    {{ comData }} ------- {{ mixinData }}
    <br />
    <button @click="success()">执行mixins中的方法</button>
  </div>
  <div>
    <h2>mixins的选项合并</h2>
    <!-- 当mixins中的变量或方法与组件中的变量和方法重名时，
    采取就近原，即使用组件本身的变量和方法，如：msg，run() -->
    {{ msg }}
    <br />
    <button @click="run()">执行run的方法</button>
  </div>
</template>
<script>
let baseMixin = {
  data() {
    return {
      mixinData: "mixins中的数据",
      msg: "mixins中的msg",
    };
  },
  methods: {
    success() {
      console.log("success~(^o^)~");
    },
    run() {
      console.log("mixins中的run方法")
    }
  },
};

export default {
  name: "Mixin",
  mixins: [baseMixin],
  data() {
    return {
      comData: "组件中的数据",
      msg: "组件中的msg",
    };
  },
  methods: {
    run() {
      console.log("组件中的run方法")
    }
  },
};
</script>