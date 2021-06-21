<template>
  <div class="home">
    <button @click="setMsg">修改msg</button>
    <p>{{msg}}</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <v-form/>
  </div>
  <!-- 事件修饰符 -->
  <div>
    <a href="http://www.baidu.com" target="_blank" @click="prevent1($event)">跳转链接1</a>
    <!-- 事件修饰符 .prvennt\.stop阻止冒泡\.capture\.self\.once\.passive -->
    <a href="http://www.baidu.com" @click.prevent="prevent2()">跳转链接2</a>
  </div>
  <!-- 按键修饰符 .enter/.tab/.delete/.esc/.space/.up/.down/.left/.right -->
  <div>
    <input type="text" @keyup = "doSearch($event)" />
    <input type="text" @keyup.enter = "doSearch2()" />

  </div>
</template>

<script>
// 引入组件
import HelloWorld from '@/components/HelloWorld.vue'
import Form from '../components/form.vue'

export default {
  name: 'Home',
  data() {
    return {
      msg: 'old msg'
    }
  },
  components: {  // 挂载主键
    HelloWorld,
    "v-form": Form
  },
  methods: {
    setMsg() {
      this.msg = 'update msg'
    },
    prevent1(e) {
      console.log('阻止默认行为1')
      e.preventDefault();
      
    },
    prevent2() {
      console.log('阻止默认行为2')
    },
    doSearch(e) {
      // 问题：doSearch方法被触发了多次
      console.log(e.keyCode)
      if (e.keyCode === 13) {
        // 回车键
        console.log('按下回车键')
      }
    },
    doSearch2() {
      console.log('当按下回车键时才触发')
    }
  },
}
</script>
