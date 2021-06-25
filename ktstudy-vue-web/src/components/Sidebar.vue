<template>
  <div class="sidebar">
    <el-input
      class="search"
      placeholder="请输入关键字进行过滤"
      prefix-icon="el-icon-search"
      v-model="search"
    >
    </el-input>
    <!-- <p class="open">全部展开</p> -->
    <el-button
      class="open-button open-button-text"
      @click="expand()"
      type="text"
      >全部展开</el-button
    >
    <el-scrollbar>
      <div class="menu">
        <el-tree
          :data="personList"
          v-if="refreshTree"
          ref="selectTree"
          :default-expand-all="expandAll"
          class="text"
        ></el-tree>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expandAll: false,
      refreshTree: true,
      search: "",
      personList: [
        {
          label: "集团",
          children: [
            {
              label: "未来N+院区",
              children: [],
            },
            {
              label: "治疗科室",
              children: [
                {
                  label: "科室名称",
                  children: [
                    {
                      label: "1103张三",
                      type: "stop",
                    },
                    {
                      label: "1106李四",
                      type: "using",
                    },
                  ],
                },
                {
                  label: "科室名称2",
                  children: [
                    {
                      label: "1103张三",
                      type: "delete",
                    },
                    {
                      label: "1106李四",
                      type: "stop",
                    },
                  ],
                },
                {
                  label: "科室名称3",
                  children: [
                    {
                      label: "1103张三",
                      type: "stop",
                    },
                    {
                      label: "1106李四",
                      type: "using",
                    },
                  ],
                },
                {
                  label: "科室名称4",
                  children: [
                    {
                      label: "1103张三",
                      type: "stop",
                    },
                    {
                      label: "1106李四",
                      type: "using",
                    },
                  ],
                },
                {
                  label: "科室名称4",
                  children: [
                    {
                      label: "1103张三",
                      type: "stop",
                    },
                    {
                      label: "1106李四",
                      type: "using",
                    },
                  ],
                },
              ],
            },
            {
              label: "急诊科室",
              children: [
                {
                  label: "急诊科",
                  children: [
                    {
                      label: "120327 王科亮",
                    },
                    {
                      label: "120331 袁杰",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    expand() {
      // 重新渲染树形控件，实现展开收起
      this.refreshTree = false;
      this.expandAll = !this.expandAll;
      this.$nextTick(() => {
        this.refreshTree = true;
      });
    },
  },
};
</script>
<style lang="scss">
.sidebar {
  // border: 1px solid #000;
  .search {
    width: 290px;
    height: 30px;
  }
  .open-button {
    margin-top: 10px;
    padding: 0;
    height: 19px;
    &.el-button {
      min-height: 19px;
      line-height: normal;
    }
    &.open-button-text {
      font-size: 14px;
      color: #339dff;
    }
  }
  .el-scrollbar {
    height: 87%;
    margin-top: 5px;
    // border: 1px solid #000;
    .menu {
      // height: 87%;
      // overflow: auto;
      .text {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.73px;
        font-weight: 400;
      }
    }
  }
}
</style>