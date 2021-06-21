<template>
  <div>
    <h1>我是父组件</h1>
    <button @click="getChildMsg()">获取子组件的msg</button>
    <br>
    <button @click="getChildRun()">获取子组件的run方法</button>
    <br>
    <button @click="setChildMsg()">修改子组件的msg</button>
    <hr>
  </div>
  <!-- 父组件通过ref主动获取子组件的数据和方法 -->
  <!-- 父组件自定义事件send，子组件通过$emit触发（一般用于子组件给父组件传值）-->
  <Child ref="child" @send="getChMsg"></Child>
  <login @doLogin="login"></login>
</template>
<script>
import Child from '../components/child.vue'
import Login from '../components/login.vue'
export default {
  data() {
    return {
      parentMsg: '父组件的msg'
    }
  },
  components: {
    Child,
    Login
  },
  methods: {
    pRun() {
      console.log('父组件中的run方法')
    },
    getChildMsg() {
      alert(this.$refs.child.childMsg)
    },
    getChildRun() {
      this.$refs.child.chRun()
    },
    setChildMsg(){
      this.$refs.child.childMsg = '修改后的子组件msg'
      alert(this.$refs.child.childMsg)
    },
    getChMsg(chMsg) {
      console.log("触发父组件自定义事件,输出子组件传的值：", chMsg)
    },
    login(user) {
      console.log('父组件获取登录信息：',user)
    }
  },
}
</script>