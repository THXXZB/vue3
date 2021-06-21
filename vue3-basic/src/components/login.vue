<template>
  <div>
    <h2>用户登录</h2>
    <input type="text" placeholder="用户名" v-model="username">
    <input type="text" placeholder="密码" v-model="password">
    <button @click="login">登录</button>
  </div>
  <hr>
  <div>

  </div>
</template>
<script>
import event from '../modules/event'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
    // 当toLogin被触发（广播）运行
    event.on('toLogin', data => {
      console.log('mitt.on监听广播事件toLogin，获取传过来的值：', data)
    })
  },
  // 建议配置所有发出的事件，以便更好的记录组件该如何工作
  // emits检验：要求子组件传给父组件的登录信息不能为空
  emits: {
    doLogin: ({username, password}) => {
      if (username !== "" && password !== "") {
        return true
      } else {
        console.error('用户名和密码不能为空')
        return false
      }
    }
  },
  methods: {
    login() {
      this.$emit('doLogin', {
        username: this.username,
        password: this.password
      })
    }
  },
}
</script>