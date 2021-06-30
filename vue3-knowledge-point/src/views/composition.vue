<template>
  <div>
    <h1>Composition API</h1>
    <p>composition api 使代码能够共享重用，适用于大型的项目</p>
    <br />
    <hr />
    <h2>setup定义数据、方法(ref, reactive)</h2>
    {{ title }} <br />
    {{ userInfo }} <br />
    {{ obj }} <br />
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
  <div>
    组合api + provide inject
    <button @click="setMsg" style="color: #f40">
      在composition组件修改msg
    </button>
    <button @click="setTitle" style="color: #7ba">
      在composition组件修改title</button
    ><br />
    <br />
    <div style="color: #73a">
      dogName: <input type="text" v-model="aniName" /> dogAge:
      <input type="text" v-model="aniAge" />
    </div>
  </div>
  <hr />
  <Search :msg="msg"></Search>
  <hr />
  <use-composition-api></use-composition-api>
</template>
<script>
import { ref, reactive, toRefs, computed, provide, toRaw } from "vue";
import Search from "../components/search.vue";
import UseCompositionApi from "../components/use-composition-api.vue";
export default {
  components: { Search, "use-composition-api": UseCompositionApi },
  name: "Composition",
  data() {
    return { msg: "composition中的msg" };
  },
  // setup定义数据data和方法method
  // setup有两个方法ref和reactive，用来定义响应式数据用来
  setup() {
    // ref 定义number、string、boolean等简单类型
    let title = ref("I am a title from composition");
    // provide传值(key, value)
    provide("title", title);

    // reactive定义对象数组等复杂类型
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
    // originalObj和obj的关系
    // 引用关系：obj是一个proxy对象，在Proxy对象中引用了originalObj
    // 注意：如果直接修改originalObj，obj也会随之更新，但无法触发页面更新
    // 只有通过包装之后的对象来修改，才会触发页面更新
    let obj = reactive(originalObj);
    // toRaw：获取reactive和ref的原始数据
    // ref/reactive数据类型的特点:
    // 每次修改都会被追踪，都会更新UI界面，但是这样其实是非常消耗性能的
    // 所以如果我们有一些操作不需要追踪，不需要更新UI界面，
    // 那么这个时候，我们就可以通过toRaw方法拿到它的原始数据，对原始数据进行修改
    // 这样就不会被追踪，这样就不会更新UI界面，进而降低性能消耗

    let originalObj2 = toRaw(obj);
    console.log("toRaw:", originalObj === originalObj2);

    // readOnly将name变成只读模式
    // name = readonly(name);

    return {
      title,
      userInfo,
      obj,
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