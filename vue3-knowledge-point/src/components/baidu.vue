<template>
  <div>
    <h2>百度搜索下拉框</h2>
    回车搜索：<input
      type="text"
      v-model="keyWord"
      @keyup.enter="getData()"
    /><br />
    原始搜索：<input
      type="text"
      v-model="keyWord2"
      @keyup="getData2()"
    /><br />
    防抖节流（1000ms）：<input
      type="text"
      v-model="keyWord3"
      @keyup="getData3()"
    /><br />
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyWord: "",
      keyWord2: "",
      keyWord3: "",
      list: [],
      timer: "",
    };
  },
  methods: {
    getData() {
      if (this.keyWord !== "") {
        console.log('getData')
        this.jsonpReq(this.keyWord);
      } else {
        this.list = "";
      }
    },
    getData2() {
      if (this.keyWord2 !== "") {
        console.log('getData2')
        this.jsonpReq(this.keyWord2);
      } else {
        this.list = "";
      }
    },
    getData3() {
      // 防抖节流，减少请求次数
      if (this.keyWord3 !== "") {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log('getData3')
          this.jsonpReq(this.keyWord3);
        }, 1000);
      } else {
        this.list = "";
      }
    },
    jsonpReq(keyWord) {
      let api =
        "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + keyWord;
      this.FetchJsonp(api, { jsonpCallback: "cb" })
        .then((res) => res.json())
        .then((res) => {
          this.list = res.s;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>