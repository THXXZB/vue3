<template>
  <div>
    <!-- {{activeTabList}} -->
    <div style="" class="nurse-team">
      <el-tabs
        v-model="activeTab"
        :tab-position="tabPosition"
        style="height: 100%"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :name="item.id"
          :label="item.label"
          style="border: 1px solid #eee; padding: 10px"
        >
          <!-- 右内容页 -->
          <el-scrollbar style="height: 100%">
            <!-- {{item}} -->
            <async-com
              :path="item.path"
            >
            </async-com>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AsyncComponent from "./components/async-component.vue";
export default {
  data() {
    return {
      tabPosition: "left", // 选项卡所在位置
      activeTab: 1, // 当前显示的tab页面
      // 左侧边栏
      tabList: [
        {
          id: 1,
          label: "院区设置",
          content: '院区',
          path: "components/team",
        },
        {
          id: 2,
          label: "护理责任小组设置",
          content: '护理责任小组',
          path: "components/team",
        },
        {
          id: 3,
          label: "年休假设置",
          content: '年休假',
          path: "components/team",
        },
      ],
    };
  },
  components: {
    "async-com" : AsyncComponent
  }, 
  computed: {
  },
  methods: {
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
    }
  },
};
</script>
<style lang="scss" scope>
.nurse-team {
  border: 1px solid #f40;
  height: 600px;
  background: #f5f7fa;
  .el-tabs__item {
    height: 36px;
    line-height: 36px;
    font-family: MicrosoftYaHeiUI;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
    text-align: left !important;
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
    margin-top: 30px;
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