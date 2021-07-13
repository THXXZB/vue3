<template>
  <div class="main-tab">
    <p>el tabs切换原理：display：block/none，并没有保存组件状态</p>
    <el-tabs v-model="activeTab">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        class="tab-container"
      >
        <el-scrollbar>
          <async-com
          :path="item.path"
          :name="item.name"
          >

          </async-com>
          <!-- <div class="content">
            {{ item.label }}
          </div> -->
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <test-emit @homeEmit="homeData()" ></test-emit>
  </div>
</template>
<script>
import AsyncComponent from './components/async-component.vue'
import TestEmit from './components/test-emit.vue'
export default {
  data() {
    return {
      activeTab: "2",
      tabList: [
        {
          name: "1",
          label: "用户管理",
          path: 'components/user'
        },
        {
          name: "2",
          label: "配置管理",
          path: 'components/config'
        },
        {
          name: "3",
          label: "角色管理",
          path: 'components/role'
        },
        {
          name: "4",
          label: "定时任务补偿",
          path: 'components/task'
        },
      ],
    };
  },
  components: {
    'async-com': AsyncComponent,
    'test-emit': TestEmit
  },
  methods: {
    homeData() {
      console.log("home data activeTab", this.activeTab);
    },
  }
  
};
</script>
<style scoped>
.main-tab {
  border: 1px solid #888;
  width: 80%;
  margin: auto;
  text-align: center;
}
.main-tab >>> .el-tabs__header {
  border: 1px solid #abe;
  text-align: center;
}
.main-tab >>> .el-tabs__content{
  border: 2px solid #f40;
  height: 300px;
}
.tab-container {
  height: calc(100% - 4px);
  border: 2px solid #000;
}
.tab-container .content{
  height: 500px;
  background: rgb(190, 228, 52);
  border: 5px solid #abe;
}
</style>