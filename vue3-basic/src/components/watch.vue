<template>
  <hr />
  <h2>js表达式</h2>
  <div>
    {{ a * 9 }}
    {{ flag ? "It is true" : "It is false" }}
    <br />
    {{ msg.split("").reverse().join("") }}
  </div>
  <hr />
  <div>
    <span v-if="flag === true">it is true</span>
    <span v-else>it is false</span>
  </div>
  <div>
    <span v-if="a === 4">四</span>
    <span v-else-if="a === 5">五</span>
    <span v-else-if="a === 6">六</span>
    <span v-else>不详</span>
  </div>
  <template v-if="flag">
    <h1>it is h1</h1>
    <div>it is div</div>
    <p>it is p</p>
  </template>
  <div>
    <!-- v-if：dom操作；v-show: css的显示隐藏，若频繁切换使用v-show -->
    <div v-if="flag">v-if 显示</div>
    <div v-show="flag">v-show 显示</div>
  </div>
  <hr />
  <div>
    <!-- 计算属性computed -->
    {{ reverseMsg }}
    <button @click="setMsg">改变msg的值</button>
    <br />
    <!-- 计算属性实现筛选功能 -->
    <!-- 要求：显示包含关键词的单词 -->
    <input type="text" v-model="keyWord" placeholder="输入关键词" />
    <ul>
      <li v-for="(item, index) in searchData" :key="index">{{ item }}</li>
    </ul>
  </div>
  <div>
    <!-- 使用watch监听数据变化，建议使用计算属性监听数据变化 -->
    <input type="text" v-model="firstName" placeholder="firstName" />
    <br/>
    <input type="text" v-model="lastName" placeholder="lastName" />
    <br>
    watch: {{fullName}}  computed: {{fullName2}}
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: 4,
      flag: true,
      msg: "三国演义",
      list: ["apple", "orange", "pear", "banana"],
      keyWord: "",
      firstName: '',
      lastName: '',
      fullName: ''
    };
  },
  computed: {
    reverseMsg() {
      return this.msg.split("").reverse().join("");
    },
    searchData() {
      let tempArr = [];
      this.list.forEach((value) => {
        if (value.indexOf(this.keyWord) !== -1 && this.keyWord !== "") {
          tempArr.push(value);
        }
      });
      return tempArr;
    },
    fullName2() {
      return this.firstName + " " + this.lastName
    }
  },
  methods: {
    setMsg() {
      this.msg = "西游记";
    },
  },
  watch: {
    // 当firstName和lastName改变时，fullName也随之改变
    // 不能写匿名函数
    firstName: function (value) {
      this.fullName = value + ' ' + this.lastName
    },
    lastName: function (value) {
      this.fullName = this.firstName + ' ' + value
    }
  },
};
</script>