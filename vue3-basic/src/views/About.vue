<template>
  <div class="about">
    <!-- 对象绑定 -->
    <h1>This is an about page for {{ userInfo.name }}</h1>
    <p>{{ msg }}</p>
    <!-- html绑定 -->
    <p v-html="h2Label"></p>
    <br />
    <!-- 属性绑定 -->
    <img :src="logoSrc" alt="" />
    <img v-bind:src="logoSrc" alt="" />
    <p :title="title">放上去试试</p>
    <!-- 注意字符串加单引号 -->
    <a :[myHref]="'https://v3.cn.vuejs.org/api/'">点击跳转vue3官方文档</a>
    <br />
    <a :[myTitle]="link">移动显示vue3官方文档网址</a>
    <!-- 循环遍历数组 -->
    <ul>
      <li v-for="(item, index) in list" :key="index" :class="{'pink':index == 0, 'orange':index == 1}">
        {{ index }}: {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in list2" :key="index">
        {{ item.name }} <br />
        <ol>
          <li v-for="(value, i) in item.hobby" :key="i">
            {{ i }}: {{ value }}
          </li>
        </ol>
      </li>
    </ul>
    <br />
    <!-- 循环遍历数组 -->
    <ul>
      <li v-for="(value, key, index) in myObj" :key="index">
        {{ index }} {{ key }}: {{ value }}
      </li>
    </ul>
    <br />
    <!-- class绑定对象 -->
    <div @click="changeColor" :class="color"></div>
    <div @click="changeFontColor" :class="{ 'red': isRed, 'green': isGreen }">
      <h2>来呀~快活呀~~</h2>
    </div>
    <div @click="changeBig" :class="[red, green]">
      <h2>来呀~快活呀~~</h2>
    </div>
    <div @click="changeFalse" :class="[isTrue ? red : green]">
      <h2>来呀~快活呀~~</h2>
    </div>
    <!-- 绑定内联样式style -->
    <div :style="{'color': activeColor, 'font-size': fontSize+'px'}">阿勒</div>
    <div :style="styleObj">阿这~</div>
    <button data-stu-ame = 'tt' data-pass = '123' @click="eventFn('马上下班啦', $event), goHome('回家吃饭饭啦')">pick me</button>
  </div>
  <watch/>
</template>
<script>
import watch from '../components/watch.vue';
export default {
  components: { watch },
  data() {
    return {
      msg: "hello vue3",
      userInfo: {
        name: "tt",
      },
      h2Label: "<h2>我是一个html标签</h2>",
      logoSrc: "https://v3.cn.vuejs.org/logo.png",
      title: "惊不惊喜，意不意外",
      myHref: "href",
      myTitle: "title",
      link: "https://v3.cn.vuejs.org/api/",
      list: ["tt", "yy", "jj", "zz"],
      list2: [
        { name: "tt", hobby: ["painting", "sleep"] },
        { name: "yy", hobby: ["sleep", "eat"] },
      ],
      myObj: {
        name: "tt",
        nob: "102",
        age: "22",
      },
      color: "red",
      isRed: true,
      isGreen: false,
      red: 'red',
      green: 'green',
      isTrue: true,
      activeColor: 'red',
      fontSize: 36,
      styleObj: {
        'color': 'green',
        fontSize: '36px'
      }
    };
  },
  methods: {
    changeColor() {
      this.color = "green";
    },
    changeFontColor() {
      this.isGreen = true;
    },
    changeBig() {
      this.green = 'bigGreen';
    },
    changeFalse() {
      this.isTrue = false
    },
    eventFn(msg, e) {
      alert(msg)
      // https://www.cnblogs.com/moqiutao/p/4912784.html
      console.log(e.target.attributes[0].nodeName,e.target.attributes[0].nodeValue)
      console.log(e.srcElement.style.backgroundColor = '#ff0')
      console.log(e.srcElement.dataset.stuAme, e.srcElement.dataset.pass)
    },
    goHome(msg) {
      console.log(msg)
    }
  }
};
</script>
<style scoped>
.pink {
  color: pink;
}
.orange {
  color: orange;
}
.red {
  width: 100px;
  height: 100px;
  border: 5px solid #abe;
  background-color: #f40;
}
.green {
  width: 100px;
  height: 100px;
  color: #f40;
  background-color: #be0;
}
.bigGreen {
  width: 150px;
  height: 150px;
  color: #f40;
  background-color: #be0;
}
</style>
