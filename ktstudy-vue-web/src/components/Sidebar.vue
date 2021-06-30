<template>
  <div class="sidebar">
    <el-input
      class="search"
      placeholder="请输入关键字进行过滤"
      prefix-icon="el-icon-search"
      v-model="filterText"
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
          node-key="id"
          :default-expand-all="expandAll"
          :filter-node-method="filterNode"
          :render-content="renderContent"
          @node-click="handleNodeClick"
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
      filterText: "",
      personList: [
        {
          id: 1,
          label: "集团1",
          children: [
            {
              id: 2,
              label: "未来N+院区2",
              children: [],
            },
            {
              id: 3,
              label: "治疗科室3",
              children: [
                {
                  id: 6,
                  label: "科室名称6",
                  children: [
                    {
                      id: 10,
                      label: "1103张三10(stop)",
                      type: "stop",
                    },
                  ],
                },
                {
                  id: 7,
                  label: "科室名称7",
                  children: [
                    {
                      id: 11,
                      label: "1103张三11",
                      type: "delete",
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
              label: "治疗科室4",
              children: [
                {
                  id: 8,
                  label: "科室名称8",
                  children: [
                    {
                      id: 12,
                      label: "1103张三12(stop)",
                      type: "stop",
                    },
                  ],
                },
              ],
            },
            {
              id: 5,
              label: "急诊科室5",
              children: [
                {
                  id: 9,
                  label: "急诊科9",
                  children: [
                    {
                      id: 13,
                      label: "120327 王科亮13 (stop)",
                      type: "stop",
                    },
                    {
                      id: 14,
                      label: "120331 袁杰14",
                    },
                  ],
                },
              ],
            },
            {
              id: 5,
              label: "急诊科室5",
              children: [
                {
                  id: 9,
                  label: "急诊科9",
                  children: [
                    {
                      id: 13,
                      label: "120327 王科亮13 (stop)",
                      type: "stop",
                    },
                    {
                      id: 14,
                      label: "120331 袁杰14",
                    },
                  ],
                },
              ],
            },
            {
              id: 5,
              label: "急诊科室5",
              children: [
                {
                  id: 9,
                  label: "急诊科9",
                  children: [
                    {
                      id: 13,
                      label: "120327 王科亮13 (stop)",
                      type: "stop",
                    },
                    {
                      id: 14,
                      label: "120331 袁杰14",
                    },
                  ],
                },
              ],
            },
            {
              id: 5,
              label: "急诊科室5",
              children: [
                {
                  id: 9,
                  label: "急诊科9",
                  children: [
                    {
                      id: 13,
                      label: "120327 王科亮13 (stop)",
                      type: "stop",
                    },
                    {
                      id: 14,
                      label: "120331 袁杰14",
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
  watch: {
    filterText(val) {
      this.$refs.selectTree.filter(val);
    },
  },
  mounted() {},
  methods: {
    // 全部展开
    expand() {
      // 重新渲染树形控件，实现展开收起
      this.refreshTree = false;
      this.expandAll = !this.expandAll;
      this.$nextTick(() => {
        this.refreshTree = true;
      });
    },
    // 过滤关键字
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 自定义节点，即停用账号用红色字体显示
    renderContent(h, { node, data }) {
      // console.log(data);
      let className = "";
      if (data.type && data.type === "stop") {
        className = "active";
      }
      return h(
        "span",
        {
          class: className,
        },
        h("span", null, node.label)
      );
    },
    // 点击节点，获取当前账号的信息
    handleNodeClick(data) {
      console.log("点击节点:", data.label);
    },
  },
};
</script>
<style lang="scss">
.sidebar {
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
      .text {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.73px;
        font-weight: 400;
        // span{

        // }
      }
      .active {
        color: #ff6a6a;
      }
    }
  }
}
</style>