<template>
  <div>
    <h2>vue3 iframe嵌入</h2>
    <div style="border: 2px solid #294" class="todo-list">
      <div class="left-header"></div>
      <el-tabs
        v-model="activeTab"
        :tab-position="tabPosition"
        style="height: 300px"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          style="border:1px solid #000; padding: 10px; background-color: #abe"
        >
          <template #label>
            <div class="tabs-item">
              <img class="tabs-icon" /><span class="tabs-label">{{
                item.label
              }}</span
              ><span class="tabs-number">{{ item.number }}</span>
            </div>
          </template>
          <el-scrollbar style="height: 300px">
            <async-com :path="item.path" :name="item.name"> </async-com>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <div style="height: 300px"></div>
</template>
<script>
import AsyncComponent from "./components/async-component.vue";
export default {
  data() {
    return {
      tabPosition: "left",
      activeTab: "2",
      tabList: [
        {
          name: "1",
          label: "全部",
          number: 56,
          path: "components/user",
        },
        {
          name: "2",
          label: "请假",
          number: 16,
          path: "components/config",
        },
        {
          name: "3",
          label: "换班",
          number: 25,
          path: "components/role",
        },
        {
          name: "4",
          label: "借调",
          number: 15,
          path: "components/task",
        },
      ],
    };
  },
  components: {
    "async-com": AsyncComponent,
  },
  methods: {
    homeData() {
      console.log("home data activeTab", this.activeTab);
    },
  },
};
</script>
<style lang="scss">
.todo-list {
  position: relative;
  background: #F5F7FA;
  .left-header {
    border: 1px solid #f40;
    position: absolute;
    top: 1px;
    width: 200px;
    height: 40px;
    background-color: #FAFBFC;
  }
  .tabs-item {
    // border: 1px solid #000;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    font-family: MicrosoftYaHeiUI;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
    // line-height: 21px;
    .tabs-icon {
      width: 12px;
      height: 12px;
      margin-top: 12px;
      background-image: url("http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE0@2x.png");
      background-size: contain;
      border: none;
    }
    .tabs-label {
      width: 80px;
      color: #333333;
    }
    .tabs-number {
      width: 34px;
      height: 16px;
      line-height: 16px;
      margin-top: 10px;
      background: rgba(245, 108, 108, 0.15);
      border-radius: 8px;
      font-size: 12px;
      text-align: center;
      color: #f56c6c;
    }
  }
  .el-tabs__header{
    background-color: #FAFBFC;
  }
  .el-tabs__content{
    background-color: #fff;
  }
  .el-tabs--left .el-tabs__header.is-left {
    width: 200px;
    margin-top: 40px;
  }
  .el-tabs--left .el-tabs__nav .el-tabs__item {
    height: 36px;
    padding: 0 35px 0 20px;
  }
  .el-tabs--left .el-tabs__nav .el-tabs__item.is-active {
    background-color: rgba(51, 144, 248, 0.15) !important;
    span.tabs-label {
      color: #3390f8;
    }
  }
  .el-tabs__nav-wrap::after{
    background-color: #FAFBFC;
  }

  // .el-tabs--left .el-tabs__nav.is-left,
  // .el-tabs--left .el-tabs__nav.is-right,
  // .el-tabs--right .el-tabs__nav.is-left,
  // .el-tabs--right .el-tabs__nav.is-right {
  //   height: 100%;
  //   overflow-y: scroll;
  // }
}
</style>