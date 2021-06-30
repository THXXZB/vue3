<template>
  <div>
    props[msg]: {{ msg }}
    <div>
      <h2>watch watchEffect 数据监听</h2>
      watchEffect:在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它<br />
      num:{{ num }} <br />
      watch:懒执行，仅在侦听源变更时才执行回调；更明确哪些状态的改变会触发侦听器重新运行；
      可以访问侦听状态前后变化的值<br />
      count: {{ count }} <br />
      <input type="text" v-model="keyWord" />
      keyWord:{{ keyWord }} <br />
    </div>
    <div>
      <h2>setup生命周期函数</h2>
      <!-- https://blog.csdn.net/weixin_43899943/article/details/110388072?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control -->
      <s
        >setup函数是处于 生命周期函数 beforeCreate 和
        Created两个钩子函数之间的函数 </s
      ><br />
      因为 setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，
      所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在
      setup 函数中编写。<br />
      setup中无法使用option
      api中的data和method，为避免使用错误，setup中的this指向undefined <br />
      setup函数只能同步，不能异步<br />
      setup的声明周期函数有：onBeforeMount, onMounted, onBeforeUpdate,
      onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured, onRenderTracked,
      onRenderTriggered
      <br />
      <br />
      总结：https://blog.csdn.net/lhjuejiang/article/details/116601348
    </div>
    <div>
      <h2>toRow 获取原始对象</h2>
      {{ obj }} <br />
      <p>
        toRaw：获取reactive和ref定义的proxy对象的原始数据 <br />
        ref/reactive数据类型的特点: <br>
        每次修改都会被追踪，都会更新UI界面，但是这样其实是非常消耗性能的，<br>
        所以如果我们有一些操作不需要追踪，不需要更新UI界面，
        那么这个时候，我们就可以通过toRaw方法拿到它的原始数据，对原始数据进行修改<br>
        这样就不会被追踪，这样就不会更新UI界面，进而降低性能消耗
      </p>
    </div>
  </div>
  <div></div>
  <hr />
  <div>
    <h1>provide inject 多层嵌套父子组件传值</h1>
    非组合式api(无响应式)
    <no-com></no-com>
    组合式api
    <Com></Com>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  toRefs,
  toRaw,  
  watchEffect,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from "vue";
import NoCom from "@/components/no-com.vue";
import Com from "@/components/com.vue";
export default {
  name: "Search",
  props: ["msg"],
  setup(prop) {
    console.log("setup");
    console.log("父组件传值props", prop.msg);
    const data = reactive({
      count: 1,
      num: 1,
    });
    let keyWord = ref("关键字");

    // 当data.num改变时，会触发监听函数
    // 在初次渲染时，无论num是否改变，监听函数都会触发一次
    // count的值改变并不会触发该函数
    watchEffect(() => {
      console.log(`watchEffect: name=${data.num}`);
    });
    // setInterval(() => {
    //   data.num++
    // }, 3000)

    // watch监听:只能监听data对象，无法具体监听到对象内部的变量
    watch(data, () => {
      console.log(`watch: count=${data.count}`);
    });
    // setInterval(() => {
    //   data.count++
    // }, 3000)
    watch(keyWord, (newVal, oldVal) => {
      console.log(`oldValue:${oldVal}, newValue:${newVal}`);
    });

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
    let originalObj2 = toRaw(obj);
    console.log(originalObj, obj, originalObj2)
    console.log("reactive toRaw:", originalObj === originalObj2);
    // ref获取原始数据
    // ref的本质仍是reactive
    // ref(obj) -> reactive({value: obj})
    // ref也可以监听对象，但建议ref定义简单类型，reactive定义复杂类型
    let obj2 = ref(originalObj)
    let originalObj3 = toRaw(obj2.value)
    console.log(originalObj, obj2, originalObj3)
    console.log("ref toRaw:", originalObj === originalObj3);

    // 生命周期函数
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });

    return {
      ...toRefs(data),
      obj,
      keyWord,
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  components: {
    "no-com": NoCom,
    Com,
  },
};
</script>