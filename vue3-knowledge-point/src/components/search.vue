<template>
  <div>
    props[msg]: {{msg}}
    <h2>watch watchEffect 数据监听</h2>
    watchEffect:在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它<br />
    num:{{ num }} <br />
    watch:懒执行，仅在侦听源变更时才执行回调；更明确哪些状态的改变会触发侦听器重新运行；
    可以访问侦听状态前后变化的值<br />
    count: {{ count }} <br />
    <input type="text" v-model="keyWord" />
    keyWord:{{ keyWord }} <br />
    <h2>setup生命周期函数</h2>
    <!-- https://blog.csdn.net/weixin_43899943/article/details/110388072?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control -->
    <s>setup函数是处于 生命周期函数 beforeCreate 和 Created两个钩子函数之间的函数 </s><br />
    因为 setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，
    所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 setup 函数中编写。<br>
    setup中无法使用option api中的data和method，为避免使用错误，setup中的this指向undefined <br>
    setup函数只能同步，不能异步<br>
    setup的声明周期函数有：onBeforeMount, onMounted, onBeforeUpdate, onUpdated,
    onBeforeUnmount, onUnmounted, onErrorCaptured, onRenderTracked,
    onRenderTriggered
    <br />
    <br />
    总结：https://blog.csdn.net/lhjuejiang/article/details/116601348
  </div>
  <hr>
  <div>
    <h1>provide inject 多层嵌套父子组件传值</h1>
    非组合式api(无响应式)
    <no-com></no-com>
    组合式api
    <Com></Com>
  </div>
</template>
<script>
import { ref, reactive, toRefs, watchEffect, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated  } from "vue";
import NoCom from '@/components/no-com.vue'
import Com from '@/components/com.vue'
export default {
  name: "Search",
  props:['msg'],
  setup(prop) {
    console.log('setup')
    console.log('父组件传值props', prop.msg)
    const data = reactive({
      count: 1,
      num: 1,
    });
    let keyWord = ref('关键字')

    // 当data.num改变时，会触发监听函数
    // 在初次渲染时，无论num是否改变，监听函数都会触发一次
    // count的值改变并不会触发该函数
    watchEffect(() => {
      console.log(`watchEffect: name=${data.num}`)
    })
    // setInterval(() => {
    //   data.num++
    // }, 3000)

    // watch监听:只能监听data对象，无法具体监听到对象内部的变量
    watch(data, () => {
      console.log(`watch: count=${data.count}`)
    })
    // setInterval(() => {
    //   data.count++
    // }, 3000)
    watch(keyWord, (newVal, oldVal) => {
      console.log(`oldValue:${oldVal}, newValue:${newVal}`)
    })

    // 生命周期函数
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })

    return {
      ...toRefs(data),
      keyWord
    };
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  components: {
    "no-com": NoCom,
    Com
  }
};
</script>