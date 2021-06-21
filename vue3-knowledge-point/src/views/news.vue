<template>
  <div>
    <h2>axios和fetch-jsonp实现数据请求</h2>
    <button @click="getData()">axios获取数据</button>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item.title }}</li>
    </ul>
    <button @click="getJsonpData()">fetch-jsonp获取数据</button>
    <ul>
      <li v-for="(item, index) in jsonpList" :key="index">{{ item }}</li>
    </ul>
  </div>
  <Baidu></Baidu>
</template>
<script>
import Baidu from '../components/baidu.vue';
export default {
  components: { Baidu },
  name: "News",
  data() {
    return {
      list: [],
      jsonpList: []
    };
  },
  mounted() {
    this.Storage.set("username", "tt");
  },
  methods: {
    getData() {
      let api =
        "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
      this.Axios.get(api)
        .then((res) => {
          // console.log(res.data)
          this.list = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getJsonpData() {
      // https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=vue&cb=xxx
      // jsonp请求会加上回调函数，此处百度搜索回调函数名是cb
      let api = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=vue";
      this.FetchJsonp(api, { jsonpCallback: "cb" }).then((res) => {
        // 固定写法
        return res.json();
      }).then(json => {
        // 获取到数据
        console.log(json.s)
        // 注意箭头指向，此处是箭头函数
        this.jsonpList = json.s
      }).catch(err => {
        console.log(err)
      });
    },
  },
};
</script>