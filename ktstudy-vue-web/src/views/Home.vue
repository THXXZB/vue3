<template>
  <div class="home">
    <Sidebar class="side"></Sidebar>
    <Content :peopleData="data2" class="content"/>
  </div>
</template>

<script>
import Content from "@/components/Content.vue";
import Sidebar from "@/components/Sidebar.vue"
import {getData} from '../mock/index'

export default {
  name: "Home",
  data() {
    return {
      data: [],
      data2: {
        userCode: "SJT3311",
        pwd: "123456",
        name: "刘磊",
        sex: "1",
        branch: "集团",
        dept: "急诊科",
        cardType: "0",
        cardNum: "360231299183721134",
        mobile: "13565390912",
        state: "1",
        inputCode1: "LL",
        inputCode2: "YD",
        jobTitle: "副护士长",
        duty: "药师",
        role:{
          roleName: "管理员A",
          branchCode: "GM0618",
          branchName: "宁波金唐医院"
        },
        reportAccount: "平台账号112",
        reportPwd: "1234"
      }
    }
  },
  mounted() {
    getData().then(res => {
      console.log('success:', res)
      this.data = res.data.result
    }).catch(err => {
      console.label('fail:', err)
    })
  },
  components: {
    Content,
    Sidebar
  },
  methods: {

  },
};
</script>
<style lang="scss">
  .home{
    display: flex;
    padding: 20px 10px;
    box-sizing: border-box;
    background-color: #F0F2F5;
    height: 100%;
    .side{
      width: 320px;
      height: 100%;
      box-sizing: border-box;
      padding: 20px 15px;
      margin-right: 2px;
      // border: 1px solid #abe;
      background-color: #fff;
    }
    .content{
      flex: 1;
      min-width: 520px;
      box-sizing: border-box;
      padding: 20px 20px;
      // border: 1px solid #f40;
      background-color: #fff;
    }
  }
</style>
