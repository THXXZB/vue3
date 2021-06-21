<template>
  <div>
    <h2>我是子组件</h2>
    <!-- 子组件借助$parent主动获取父组件的数据和方法 -->
    {{this.$parent.parentMsg}}
    <br>
    <button @click="getParentRun()">获取父组件的run方法</button>
    <br>
    <button @click="setParentMsg()">修改父组件的msg</button>
    <button @click="sendParent">触发父组件自定义事件</button>
  </div>
  <div>
    <h3>mitt</h3>
    <!-- child向login传值：login 监听 ；  child  广播（触发） -->
    <button @click="sendLogin">触发登录组件中的事件，实现传值</button>
  </div>
  <hr>
</template>
<script>
import event from '../modules/event'
export default {
  data() {
    return {
      childMsg: '子组件的msg'
    }
  },
  methods: {
    chRun() {
      console.log('子组件中的run方法')
    },
    getParentRun() {
      this.$parent.pRun()
    },
    setParentMsg() {
      this.$parent.parentMsg = '修改后的父组件msg'
    },
    // 子组件触发父组件自定义事件并传参
    sendParent() {
      this.$emit('send', this.childMsg)
    },
    sendLogin() {
      // mitt.emit广播事件
      event.emit('toLogin', this.childMsg)
    }
  },
}
</script>