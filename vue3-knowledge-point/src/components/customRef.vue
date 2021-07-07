<template>
  <div>
    <h3>customRef 自定义ref</h3>
    {{ msg }} <br />
    <button @click="update">update</button>
    {{ result }} ---- {{ result3 }} ---- {{ result3 }} ----- {{ result4 }}
    <ul>
      <li v-for="(item, index) in result3" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
import { customRef, ref } from "vue";

// customRef用法
function myRef1(val) {
  // 初始值val
  return customRef((track, trigger) => {
    return {
      get() {
        track(); // 告诉vue该数据需要追踪变化的
        console.log("ref1 get:", val);
        return val;
      },
      set(newVal) {
        val = newVal;
        console.log("ref1 set:", val);
        trigger(); // 告诉vue触发页面更新
      },
    };
  });
}
function myRef2(val) {
  return customRef((track, trigger) => {
    // 根据路径获取数据
    fetch(val)
      .then((res) => res.json())
      .then((data) => {
        val = data; // 数据获取成功
        console.log("val更新");
        trigger(); // 更新ui界面
      })
      .catch((err) => console.log(err));

    return {
      get: () => {
        track();
        console.log("get:", val);
        // 不能在get方法中直接发起请求
        // 原因：渲染页面->调用get->发送网络请求->更新数据->渲染页面（死循环）
        return val;
      },
      set: (newValue) => {
        val = newValue;
        console.log("set:", newValue);
        trigger();
      },
    };
  });
}
function getData() {
  let result = []; //无效
  // 注意：fetch的路径是相对于public/index.html
  // 其次，获取到的数据无法用变量result保存，只能在回调函数中使用
  fetch("./customRef-data.json")
    .then((res) => {
      // console.log('res', res)
      return res.json(); //response转换成json对象
    })
    .then((data) => {
      result = data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}
function getData2(result) {
  fetch("./customRef-data.json")
    .then((res) => res.json())
    .then((data) => {
      result.value = data;
      console.log("getData2", result.value);
    })
    .catch((err) => console.log(err));
  return result;
}
export default {
  // setup只能是个同步函数，不能异步
  setup() {
    let msg = myRef1("customRef");
    let update = () => {
      msg.value = "自定义ref";
    };

    // 方案一（失败）
    let result = getData(); // 无效无法获取请求的值

    // 方案二（成功，阅读性差）
    let result2 = ref([]);
    fetch("./customRef-data.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        result2.value = data; // 注意：result2 = data 无效
        console.log("result2", result2);
      })
      .catch((err) => {
        console.log(err);
      });

    // 方案三（成功，阅读性良好）
    let result3 = ref([]);
    result3 = getData2(result3);

    // 方案四（成功，阅读性良好）
    // // 将fetch代码移入customRef
    let result4 = myRef2("./customRef-data.json"); // 传入获取数据的路径
    
    return {
      msg,
      update,
      result,
      result2,
      result3,
      result4,
    };
  },
};
</script>