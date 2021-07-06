<template>
  <div id="study">
    <div id="nav">
      <router-link to="/study">Study</router-link> |
      <router-link to="/study/mainTab">mainTab</router-link>
    </div>
    <h1 style="font-size: 30px">一站式需求管理平台 study</h1>
    <br />
    内置组件
    component：可以动态绑定我们的组件，根据数据的不同更换不同的组件，无法保存组件状态<br />
    动态组件
    keep-alive：组件之间切换，可以保持这些组件的状态，以避免反复渲染导致的性能问题
    <br />
    异步组件 async component：在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
    为了简化，Vue 有一个 defineAsyncComponent 方法，可以在工厂函数中返回一个Promise并动态导入, (asyn component无法保存组件状态)
    <br />
    <div style="border: 3px solid #a2f">
      <div><button @click="changeComponent">changeComponent</button></div>
      <component :is="who"></component>
      <hr />
      <div><button @click="changeComponent2">changeAsyncComponent</button></div>
      <component :is="asyncComponent"></component>
    </div>
    <br />
    <hr />
    <br>
    <router-view />
  </div>
</template>
<script>
import factory from "./util/factory";
import componentA from "./components/componentA.vue";
import componentB from "./components/componentB.vue";
export default {
  data() {
    return {
      who: "componentB",
      path: "components/user",
      asyncComponent: ''
    };
  },
  mounted() {
    this.asyncComponent = factory(this.path)
  },
  components: {
    componentA,
    componentB,
  },
  methods: {
    changeComponent() {
      if (this.who == "componentB") {
        this.who = "componentA";
      } else {
        this.who = "componentB";
      }
      console.log(typeof this.who, this.who);
    },
    changeComponent2() {
      if (this.path == "components/user") {
        this.path = "components/role";
        this.asyncComponent = factory(this.path)
      } else {
        this.path = "components/user";
      }
      console.log(typeof this.path, this.path);
      this.asyncComponent = factory(this.path)
    },
  },
};
</script>
<style>
#study {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
