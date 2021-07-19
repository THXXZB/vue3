<template>
  <div>list: {{ list }}</div>
  <button @click="getData()">getData</button><br />
  <!-- dataList: {{dataList}} -->
  <ul>
    <li v-for="(item, i) in dataList" :key="i">{{ item.title }}--</li>
  </ul>
</template>
<script>
// import detailReq from "../services/api/todo/todo-services";
import { awaitWrap } from "../services/service";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, onMounted, getCurrentInstance } from "vue";
export default {
  setup() {
    let dataList = reactive([1, 2]);
    // setup中获取定义的全局方法
    const internalInstance = getCurrentInstance();
    console.log("what)))))))))))))),", getCurrentInstance());
    // 获取全局绑定的axios
    const myAxios = internalInstance.appContext.config.globalProperties.Axios; 

    onMounted(async () => {
      console.log("获取dataList");
      // dataList = await awaitWrap(getDataList());   // 没有权限
      // dataList = await getData();             // axios
      let data = await awaitWrap(getData(myAxios)); // setup axios

      dataList.length = 0; //清空数组
      // dataList = data[0]    //无效，赋值成功，但响应失败
      dataList.push(...data[0]);

      ElMessage.warning("test elmessage");
    });

    // 没有权限无法获取
    
    // const getDataList = () => {
    //   return new Promise((resolve, reject) => {
    //     // 请求参数
    //     let params = {
    //       id: 100000,
    //       type: 1,
    //     };
    //     // 请求数据
    //     detailReq
    //       .getProcessTypeUserList(params)
    //       .then((data) => {
    //         resolve(data);
    //       })
    //       .catch((err) => {
    //         ElMessageBox(err, "错误", {
    //           confirmButtonText: "确定",
    //         });
    //         reject(err);
    //       });
    //   });
    // };

    return {
      dataList,
    };
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getData() {
      let api =
        "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
      this.Axios.get(api)
        .then((res) => {
          console.log("***********************", res.data);
          this.list = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
// setup数据请求
const getData = (axios) => {
  return new Promise((resolve, reject) => {
    let api =
      "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
    axios
      .get(api)
      .then((res) => {
        // console.log('AAAAAAAAAAAAAAA', res.data.result)
        resolve(res.data.result);
      })
      .catch((err) => {
        ElMessageBox(err, "错误", {
          confirmButtonText: "确定",
        });
        reject(err);
      });
  });
};
</script>
