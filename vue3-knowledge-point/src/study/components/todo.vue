<template>
  <div>
    <!-- {{activeTabList}} -->
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
        style="height: 100%"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in activeTabList"
          :key="index"
          :name="item.id"
          style="border: 1px solid #eee; padding: 10px"
        >
          <!-- 左侧边栏 -->
          <template #label>
            <div class="tabs-item">
              <div class="tabs-icon-box">
                <div
                  class="tabs-icon"
                  v-if="item.label !== '全部' && item.iconShow === true"
                ></div>
              </div>
              <span class="tabs-label">{{ item.label }}</span
              ><span class="tabs-number">{{ item.number }}</span>
            </div>
          </template>
          <!-- 右内容页 -->
          <el-scrollbar style="height: 100%">
            <async-com
              path="components/table"
              :type="item.label"
              :tableData="tableData"
              :key="componentKey"
            >
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
        <transition-group class="transition-wrapper" name="sort">
          <div
            class="item"
            v-for="item in itemList"
            :key="item.id"
            :class="{ active: item.isActive }"
            @click="activeItem(item.id)"
            :draggable="true"
            @dragstart="dragstart(item)"
            @dragenter="dragenter(item, $event)"
            @dragend="dragend(item, $event)"
            @dragover="dragover($event)"
          >
            <!-- 开关 -->
            <div class="switch">
              <el-switch
                v-model="item.switch"
                active-color="rgba(64, 158, 255, 1)"
                inactive-color="rgba(228, 228, 228, 1)"
                @change="changeSwitch($event, item.id)"
              ></el-switch>
            </div>
            <!-- 图标 -->
            <div class="icon" @click="toHome(item.id)">
              <img :src="item.iconUrl" alt="" />
            </div>
            <!-- 文字 -->
            <div class="text">{{ item.label }}</div>
            <!-- 箭头 -->
            <div class="arrows-box">
              <div class="up-arrows"></div>
              <div class="down-arrows"></div>
            </div>
          </div>
        </transition-group>
        <el-button @click="drawerClose" type="primary"> 确定 </el-button>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import AsyncComponent from "./async-component.vue";
// import todoReq from "../services/api/todo/service";
// import { awaitWrap } from "../services/service";
// import { ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      componentKey: 0,
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
          switch: true,
          iconShow: true,
        },
        {
          id: 2,
          label: "请假",
          number: 16,
          path: "components/config",
          switch: true,
          iconShow: true,
        },
        {
          id: 3,
          label: "换班",
          number: 15,
          path: "components/role",
          switch: false,
          iconShow: false,
        },
        {
          id: 4,
          label: "借调",
          number: 5,
          path: "components/task",
          switch: false,
          iconShow: false,
        },
        {
          id: 5,
          label: "转科",
          number: 12,
          path: "components/major",
          switch: false,
          iconShow: false,
        },
        {
          id: 6,
          label: "会诊",
          number: 8,
          path: "components/consultations",
          switch: true,
          iconShow: true,
        },
      ],
      // 表格内容
      tableData: [
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
          isActive: true,
          switch: true,
          iconShow: true,
          iconUrl:
            "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE@2x.png",
        },
        {
          id: 3,
          label: "换班",
          isActive: false,
          switch: false,
          iconShow: false,
          iconUrl:
            "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png",
        },
        {
          id: 4,
          label: "借调",
          isActive: false,
          switch: false,
          iconShow: false,
          iconUrl:
            "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png",
        },

        {
          id: 5,
          label: "转科",
          isActive: false,
          switch: false,
          iconShow: false,
          iconUrl:
            "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png",
        },
        {
          id: 6,
          label: "会诊",
          isActive: false,
          switch: true,
          iconShow: true,
          iconUrl:
            "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE@2x.png",
        },
      ],
      oldData: null, // 开始排序时按住的旧数据
      newData: null, // 拖拽过程的数据
    };
  },
  components: {
    "async-com": AsyncComponent, // 异步组件
  },
  computed: {
    activeTabList: function() {
      return this.tabList.filter((item) => {
        return item.switch;
      });
    },
  },
  async mounted() {
    // const data = await awaitWrap(this.getData2());
    const data = this.getData2()
    console.log("mounted data*************", data);
  },
  methods: {
    // test req
    getData2() {
      let api =
        "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
      this.Axios.get(api)
        .then((res) => {
          console.log("getData------------", res.data);
          this.list = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 请求个人代办事务数据
    // getData() {
    //   return new Promise((resolve, reject) => {
    //     // 请求参数
    //     let params = {
    //       // id: 100000,
    //       // type: 1,
    //     };
    //     // 请求数据
    //     todoReq
    //       .getTodoData(params)
    //       .then((data) => {
    //         console.log("todo data-------------", data);
    //         resolve(data);
    //       })
    //       .catch((err) => {
    //         ElMessageBox(err, "错误", {
    //           confirmButtonText: "确定",
    //         });
    //         reject(err);
    //       });
    //   });
    // },
    // 开始拖拽
    dragstart(value) {
      this.oldData = value;
      console.log("dragstart oldData", this.oldData);
    },
    // 记录拖拽过程中信息
    dragenter(value, e) {
      this.newData = value;
      e.preventDefault();
      console.log("dragenter newData", this.newData);
    },
    // 拖拽最终操作
    dragend() {
      if (this.oldData !== this.newData) {
        let oldIndex = this.itemList.indexOf(this.oldData);
        let newIndex = this.itemList.indexOf(this.newData);
        let newItems = [...this.itemList];
        let newTabs = [...this.tabList];
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        newTabs.splice(oldIndex + 1, 1);
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldData);
        newTabs.splice(newIndex + 1, 0, this.tabList[oldIndex + 1]);
        this.itemList = [...newItems];
        this.tabList = [...newTabs];
      }
      console.log("dragend itemList", this.itemList);
    },
    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover(e) {
      e.preventDefault();
    },

    handleClick() {},
    // 抽屉关闭
    drawerClose() {
      this.showDrawer = false;
    },
    // 抽屉内部列表active样式切换
    activeItem(i) {
      this.itemList.forEach((item) => {
        if (item.id == i) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
      // this.itemList[i].isActive = true;
    },
    // 根据查元素的id找到对应元素的索引
    arrFind(arr, id) {
      // forEach()无法在所有元素遍历完前,终止遍历,或者return 跳出当前循环,
      let index = "";
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
          index = i;
          break;
        }
      }
      return index;
    },
    // 抽屉内部开关切换
    changeSwitch(e, id) {
      // 找到索引
      let tabIndex = this.arrFind(this.tabList, id);
      // 左侧边栏显示
      this.tabList[tabIndex].switch = e;
      // 内容页
      if (e) {
        // 如果开关为开，内容页显示当前所打开的那一页
        this.activeTab = this.tabList[tabIndex].id;
        console.log("activeTab", this.activeTab, this.tabList[tabIndex].id);
      } else {
        // 如果开关为关
        if (this.activeTab === this.tabList[tabIndex].id) {
          // 如果内容页显示的正好是当前关闭的那一页，内容页显示当前页的上一页
          console.log("changeSwitch", this.tabList);
          for (let i = tabIndex - 1; i >= 0; i--) {
            if (this.tabList[i].switch) {
              this.activeTab = this.tabList[i].id;
              break;
            }
          }
        }
      }
      // 强制刷新内容页
      this.componentKey += 1;
      console.log("componentKey", this.componentKey);
    },
    // 抽屉内部图标点击，显示到首页
    toHome(id) {
      //找到索引值
      let itemIndex = this.arrFind(this.itemList, id);
      let tabIndex = this.arrFind(this.tabList, id);
      console.log(id, itemIndex);
      // 更新右侧抽屉图标样式
      this.itemList[itemIndex].iconShow = !this.itemList[itemIndex].iconShow;

      this.itemList[itemIndex].iconUrl =
        this.itemList[itemIndex].iconShow === true
          ? "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE@2x.png"
          : "http://10.1.51.218:7505/DZHL/assets/%E6%A0%87%E7%AD%BE1@2x.png";
      // 更新左侧边栏图标
      this.tabList[tabIndex].iconShow = !this.tabList[tabIndex].iconShow;
    },
  },
};
</script>
<style lang="scss" scope>
.todo-list {
  border: 1px solid #f40;
  height: 600px;
  position: relative;
  transform: scale(1); //使drawer相对于父元素定位
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
    height: 100%;
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
          .icon img {
            width: 14px;
            height: 14px;
          }
          .text {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #333333;
            line-height: 30px;
          }
          .arrows-box {
            width: 40px;
            display: flex;
            justify-content: space-around;
            .up-arrows,
            .down-arrows {
              width: 9px;
              height: 10px;
              background-size: contain;
            }
            .up-arrows {
              background-image: url(http://10.1.51.218:7505/DZHL/assets/%E4%B8%8A%E7%A7%BB@2x.png);
            }
            .down-arrows {
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
