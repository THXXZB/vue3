<template>
  <div>
    <h2>vue3 iframe嵌入</h2>
    <div style="" class="todo-list">
      <!-- 左侧边栏头部 -->
      <div class="left-header">
        <div class="blue-box"></div>
        <div class="title">快捷录入</div>
        <div class="icon" @click="showDrawer = true"></div>
      </div>
      <el-tabs
        v-model="activeTab"
        :tab-position="tabPosition"
        style="height: 300px"
      >
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.id"
          style="border: 1px solid #eee; padding: 10px"
        >
          <!-- 左侧边栏 -->
          <template #label>
            <div class="tabs-item">
              <div class="tabs-icon-box">
                <div v-if="item.iconShow" class="tabs-icon"></div>
              </div>
              <span class="tabs-label">{{ item.label }}</span
              ><span class="tabs-number">{{ item.number }}</span>
            </div>
          </template>
          <!-- 右内容页 -->
          <el-scrollbar style="height: 300px">
            <async-com :path="item.path" :name="item.id" :data="data">
            </async-com>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <!-- 右侧临时侧边栏 -->
      <el-drawer
        title="待办事项显示设置"
        v-model="showDrawer"
        direction="rtl"
        destroy-on-close
      >
        <div
          class="item"
          v-for="(item, index) in itemList"
          :key="index"
          :class="{ active: item.isActive }"
          @click="activeItem(index)"
        >
        <!-- 开关 -->
          <div class="switch">
            <el-switch
              v-model="item.switch"
              active-color="rgba(64, 158, 255, 1)"
              inactive-color="rgba(228, 228, 228, 1)"
              @change="changeSwitch($event, index)"
            ></el-switch>
          </div>
        <!-- 图标 -->
          <div class="icon">
            <img :src="item.iconUrl" alt="">
          </div>
        <!-- 文字 -->
          <div class="text">{{ item.label }}</div>
        <!-- 箭头 -->
          <div class="arrows-box">
            <div class="up-arrows"></div>
            <div class="down-arrows"></div>
          </div>
        </div>
        <el-button @click="drawerClose" type="primary"> 确定 </el-button>
      </el-drawer>
    </div>
  </div>
  <div style="height: 300px"></div>
</template>
<script>
import AsyncComponent from "./components/async-component.vue";
export default {
  data() {
    return {
      tabPosition: "left", // 选项卡所在位置
      activeTab: 1, // 当前显示的tab页面
      showDrawer: false, // 右侧临时侧边栏显示
      // 左侧边栏
      tabList: [
        {
          id: 1,
          label: "全部",
          number: 56,
          path: "components/user",
          iconShow: false,
        },
        {
          id: 2,
          label: "请假",
          number: 16,
          path: "components/config",
          iconShow: true,
        },
        {
          id: 3,
          label: "换班",
          number: 15,
          path: "components/role",
          iconShow: false,
        },
        {
          id: 4,
          label: "借调",
          number: 5,
          path: "components/task",
          iconShow: false,
        },
        {
          id: 5,
          label: "转科",
          number: 12,
          path: "components/major",
          iconShow: false,
        },
        {
          id: 6,
          label: "会诊",
          number: 8,
          path: "components/consultations",
          iconShow: true,
        },
      ],
      // 表格内容
      data: [
        {
          id: 1,
          state: "待护理部审批",
          type: "会诊",
          content: "XXXXXX病区XXXX会诊申请",
          proposer: "祝无双 2021.07.14 10:23",
          verifier: "蔡文姬 2021.07.14 12:23",
        },
        {
          id: 2,
          state: "已审批",
          type: "换班",
          content: "XXXXXX病区XXXX会诊申请",
          proposer: "祝有双 2021.07.14 10:23",
          verifier: "蔡文姬 2021.07.14 12:23",
        },
        {
          id: 3,
          state: "已审批",
          type: "借调",
          content: "XXXXXX病区XXXX会诊申请",
          proposer: "祝无双 2021.07.14 10:23",
          verifier: "蔡文姬 2021.07.14 12:23",
        },
        {
          id: 4,
          state: "待护理部审批",
          type: "转科",
          content: "XXXXXX病区XXXX会诊申请",
          proposer: "祝有双 2021.07.14 10:23",
          verifier: "蔡文姬 2021.07.14 12:23",
        },
        {
          id: 5,
          state: "已审批",
          type: "请假",
          content: "XXXXXX病区XXXX会诊申请",
          proposer: "祝有双 2021.07.14 10:23",
          verifier: "蔡文姬 2021.07.14 12:23",
        },
        {
          id: 6,
          state: "待护理部审批",
          type: "请假",
          content: "XXXXXX病区XXXX会诊申请",
          proposer: "蔡文姬 2021.07.14 12:23",
          verifier: "温文 2021.07.14 14:23",
        },
      ],
      // 右侧边栏
      itemList: [
        {
          id: 2,
          label: "请假",
          iconShow: true,
          isActive: true,
          switch: true,
          iconUrl: 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE@2x.png'
        },
        
        {
          id: 4,
          label: "借调",
          iconShow: false,
          isActive: false,
          switch: false,
          iconUrl: 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png'
        },
        {
          id: 3,
          label: "换班",
          iconShow: false,
          isActive: false,
          switch: false,
          iconUrl: 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png'
        },
        {
          id: 5,
          label: "转科",
          iconShow: false,
          isActive: false,
          switch: false,
          iconUrl: 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png'
        },
        {
          id: 6,
          label: "会诊",
          iconShow: true,
          isActive: false,
          switch: true,
          iconUrl: 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE@2x.png'
        },
      ],
    };
  },
  components: {
    "async-com": AsyncComponent, // 异步组件
  },
  methods: {
    // 抽屉关闭
    drawerClose() {
      this.showDrawer = false;
    },
    // 抽屉内部列表active样式切换
    activeItem(i) {
      this.itemList.forEach((item) => {
        item.isActive = false;
      });
      this.itemList[i].isActive = true;
    },
    // 抽屉内部开关切换
    changeSwitch(e, i) {
      if (e) {
        this.itemList[i].iconShow = true;
        this.itemList[i].iconUrl = 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE@2x.png';
        this.tabList[i+1].iconShow = true;
      } else {
        this.itemList[i].iconShow = false;
        this.itemList[i].iconUrl = 'http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png'
        this.tabList[i+1].iconShow = false;
      }
      console.log(this.itemList[i], this.tabList[i+1])
    },
  },
};
</script>
<style lang="scss">
.todo-list {
  position: relative;
  transform: scale(1);   //使drawer相对于父元素定位
  background: #f5f7fa;
  .left-header {
    // border: 1px solid #f40;
    position: absolute;
    top: 1px;
    width: 200px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 11px;
    background-color: #fafbfc;
    border-right: 1px solid #eee;
    .blue-box {
      width: 3px;
      height: 13px;
      background: #3390f8;
    }
    .title {
      flex: 1;
      margin-left: 7px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 13px;
      color: #333333;
      text-align: left;
    }
    .icon {
      width: 14px;
      height: 14px;
      background-image: url(http://10.1.51.218:7505/DZHL/assets/%E8%AE%BE%E7%BD%AE@2x.png);
      background-size: contain;
    }
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
    .tabs-icon-box {
      width: 12px;
      height: 12px;
      margin-top: 12px;
      .tabs-icon {
        width: 100%;
        height: 100%;
        background-image: url("http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE0@2x.png");
        background-size: contain;
      }
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
  .el-tabs__header {
    background-color: #fafbfc;
  }
  .el-tabs__content {
    background-color: #fff;
  }
  .el-overlay {
    .el-drawer.rtl {
      border: 2px solid #abe;
      width: 320px !important;
      .el-drawer__header {
        height: 32px;
        background: #f5f7fa;
        padding: 0 0 0 10px;
        margin: 0 0 4px 0;
        font-family: MicrosoftYaHei-Bold;
        font-size: 13px;
        color: #333333;
        text-align: left;
      }
      .el-drawer__body {
        .item {
          height: 30px;
          margin: 6px 10px 0;
          padding: 0 10px;
          background: #f5f7fa;
          border: 1px solid #eeeeee;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &.active {
            background: rgba(51, 144, 248, 0.05);
            box-shadow: 0 5px 8px 0 rgba(51, 144, 248, 0.2);
          }
          .switch {
            .el-switch {
              height: 14px;
              .el-switch__core {
                height: 14px;
                .el-switch__action {
                  width: 12px;
                  height: 12px;
                  margin-left: -12px;
                  top: 0;
                  left: 13px;
                }
              }
              &.is-checked {
                .el-switch__core {
                  .el-switch__action {
                    // margin-left: -12px;
                    left: 38px;
                  }
                }
              }
            }
          }
          .icon img{
            width: 14px;
            height: 14px;
          }
          .text {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #333333;
            line-height: 30px;
          }
          .arrows-box{
            width: 40px;
            display: flex;
            justify-content: space-around;
            .up-arrows,
            .down-arrows{
              width: 9px;
              height: 10px;
              background-size: contain;
            }
            .up-arrows{
              background-image: url(http://10.1.51.218:7505/DZHL/assets/%E4%B8%8A%E7%A7%BB@2x.png);
            }
            .down-arrows{
              background-image: url(http://10.1.51.218:7505/DZHL/assets/%E4%B8%8B%E7%A7%BB@2x.png);
            }
          }
        }
      }
    }
  }
  .el-tabs--left .el-tabs__header.is-left {
    width: 200px;
    margin-top: 44px;
    box-sizing: border-box;
    border-right: 2px solid #eee;
    margin-right: 8px;
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
  .el-tabs__nav-wrap::after {
    background-color: #fafbfc;
  }
}
</style>