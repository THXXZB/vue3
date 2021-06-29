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
    firstName:
    <input type="text" v-model="firstName" placeholder="输入firstName" /> <br />
    lastName:
    <input type="text" v-model="lastName" placeholder="输入lastName" /><br />
    分数：<input type="text" v-model="score" placeholder="输入分数" /><br />
    是否及格：{{ pass }}
    <h2>readOnly“深层”的只读代理</h2>
    传入一个对象(响应式或普通)或ref，返回一个原始对象的只读代理，即无法更改只能读取
    原始数据(非响应式数据)：{{ originalObj.aniName }} <br />
    <input type="text" v-model="originalObj.aniName" />
  </div>
  <br />
  <button @click="setMsg" style="color: #f40">在composition组件修改msg</button>
  <button @click="setTitle" style="color: #7ba">
    在composition组件修改title</button
  ><br /> <br>
  <div style="color: #73a">
    dogName: <input type="text" v-model="aniName" /> dogAge:
    <input type="text" v-model="aniAge" />
  </div>

  <hr />
  <search :msg="msg"></search>
</template>
<script>
import { ref, reactive, toRefs, computed, provide } from "vue";
import search from "../components/search.vue";
export default {
  components: { search },
  name: "Composition",
  data() {
    return { msg: "composition中的msg" };
  },
  // setup定义数据data和方法method
  // setup有两个方法ref和reactive，用来定义响应式数据用来
  setup() {
    // ref 定义number、string、boolean 、数组
    let title = ref("I am a title from composition");
    // provide传值(key, value)
    provide("title", title);

    // reactive定义对象
    let userInfo = reactive({
      username: "tt",
      age: "22",
      score: 88,
    });
    let name = reactive({
      firstName: "t",
      lastName: "hx",
    });
    let dog = reactive({
      aniName: "Jack",
      aniAge: "3",
    });
    provide("dog", dog);

    // 计算属性
    let fullName = computed(() => {
      return name.firstName + " " + name.lastName;
    });
    let pass = computed(() => {
      if (userInfo.score >= 60) return "及格";
      else return "不及格";
    });

    // 定义方法
    let getInfo = () => {
      console.log(title, title.value, userInfo, userInfo.username);
    };
    let setInfo = () => {
      (title.value = "update title"), (userInfo.username = "thx");
    };

    // 原始对象：非响应式数据
    let originalObj = {
      type: "dog",
      aniName: "Tom",
    };
    // readOnly将name变成只读模式
    // name = readonly(name);

    return {
      title,
      userInfo,
      getInfo,
      setInfo,
      // ...userInfo,  错误写法，失去响应式功能
      ...toRefs(userInfo),
      ...toRefs(name),
      fullName,
      pass,
      originalObj,
      ...toRefs(dog), //* 解构后出现重名的变量会覆盖
    };
  },
  // provide传值的两种写法
  // provide: {
  //   title: 'composition中的title'
  // }
  provide() {
    return {
      msg: this.msg,
    };
  },
  methods: {
    setMsg() {
      this.msg = "修改后composition中的msg";
      console.log("修改后的msg", this.msg);
    },
    setTitle() {
      this.title = "修改后composition中的title";
      console.log("修改后的msg", this.title);
    },
  },
};
</script>