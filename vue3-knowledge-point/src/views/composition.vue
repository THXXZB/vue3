<template>
  <div>
    <h1>Composition API</h1>
    <p>composition api 使代码能够共享重用，适用于大型的项目</p>
    <br />
    <hr />
    <h2>setup定义数据、方法(ref, reactive)</h2>
    {{ title }} <br />
    {{ userInfo }} <br />
    <button @click="getInfo()">获取信息</button>
    <button @click="setInfo()">更新信息</button>
    <br />
    <input type="text" v-model="title" />
    <br />
    <h2>toRefs 结构响应式对象数据</h2>
    {{ username }} <br />
    <input type="text" v-model="username" />
    <h2>计算属性</h2>
    {{ fullName }} <br />
    firstName: <input type="text" v-model="firstName" /> <br />
    lastName: <input type="text" v-model="lastName" />
  </div>
</template>
<script>
import { ref, reactive, toRefs, computed } from "vue";
export default {
  name: "Composition",
  // setup定义数据data和方法method
  // setup有两个方法ref和reactive，用来定义响应式数据用来
  setup() {
    // ref 定义number、string、boolean 、数组
    let title = ref("I am a title");
    // reactive定义对象
    let userInfo = reactive({
      username: "tt",
      age: "22",
    });
    let name = reactive({
      firstName: "t",
      lastName: "hx",
    });
    let fullName = computed(() => {
      return name.firstName + ' ' + name.lastName
    })
    // 定义方法
    let getInfo = () => {
      console.log(title, title.value, userInfo, userInfo.username);
    };
    let setInfo = () => {
      (title.value = "update title"), (userInfo.username = "thx");
    };
    return {
      title,
      userInfo,
      getInfo,
      setInfo,
      // ...userInfo,  错误写法，失去响应式功能
      ...toRefs(userInfo),
      ...toRefs(name),
      fullName
    };
  },
};
</script>