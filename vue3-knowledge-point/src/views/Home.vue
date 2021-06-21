<template>
  <div class="home">
    <!-- 自定义组件实现双向数据绑定 -->
    <div>
      {{ keyWord }}<button @click="setKey">update keyWord</button><br />
      <!-- v-model绑定属性 -->
      <v-input v-model:keyValue="keyWord"></v-input>
      {{ firstName }}-{{ lastName }}<br />
      <user-name
        v-model:firstName="firstName"
        v-model:lastName="lastName"
      ></user-name>
    </div>
    <h3>非prop的attribute继承</h3>
    <!-- slot 实现button组件可以自定义内容 -->
    <!-- 非prop的attribute继承：一个非prop的attribute是指向一个组件，
    但该组件并没有相应的props或emits定义的attribute，常见的包括class， style和id属性
    当组件返回单个根节点时，非prop attribute将自动添加到根节点的attribute中
    eg：v-button绑定的class被子组件button的根标签继承，使之在调用时可以设置自定义样式 -->
    <v-button class="back">取消</v-button><v-button class="primary"></v-button>
    <v-button class="btn"><i>Icon</i>{{ keyWord }}</v-button>
    <h3>自定义attribute继承</h3>
    <!-- data-item默认被子组件的根节点继承
    要求：子组件中的input标签继承data-item -->
    <date-picker data-item="2021-6-15"></date-picker>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <hr />
    <br />
    <div>
      <h3>生命周期函数</h3>
      <button @click="isShow = !isShow">挂载/卸载组件</button>
      <!-- 动态组件keep-alive -->
      <!-- 当组件切换或不同路由切换时，要求保持组件的状态，
      以避免反复重复渲染导致的性能问题，可以使用keep-alive -->
      <!-- keep-alive缓存的组件在挂载和卸载的时候是不会触发
      其他生命周期函数，只会触发activated和deactivated -->
      <keep-alive>
        <life-cycle v-if="isShow"></life-cycle>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Input from "@/components/Input.vue";
import UserName from "@/components/userName.vue";
import Button from "@/components/button.vue";
import DatePicker from "@/components/date-picker.vue";
import LifeCycle from "../components/life-cycle.vue";
export default {
  name: "Home",
  data() {
    return {
      keyWord: "寻",
      firstName: "",
      lastName: "",
      isShow: true,
    };
  },
  components: {
    HelloWorld,
    "v-input": Input,
    UserName,
    "v-button": Button,
    DatePicker,
    "life-cycle": LifeCycle,
  },
  methods: {
    setKey() {
      this.keyWord = "三亩田";
      console.log(this.keyWord);
    },
  },
};
</script>
