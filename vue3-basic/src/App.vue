<template>
<!-- 创建了一个 Vue 组件，那么它只能有一个根节点，
原因是代表任何 Vue 组件的 Vue 实例都需要绑定到单个 DOM 元素中。
创建具有多个 DOM 节点的组件的唯一方法是创建一个没有基础 Vue 实例的功能组件。-->
<!-- vue3支持template中有多个节点 -->
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/doList">doList</router-link>|
    <router-link to="/shopping">shopping</router-link>|
    <router-link to="/parent">parent</router-link>
  </div>
  <!-- 若多节点报错，但运行没问题，可以关闭Eslint中template的校验 -->
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
