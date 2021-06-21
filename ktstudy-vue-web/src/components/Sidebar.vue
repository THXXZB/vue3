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
    <el-button class="open-button open-button-text" @click="expand()" type="text"
      >全部展开</el-button
    >
    <div class="menu">
      <el-tree :data="personList" v-if="refreshTree" ref="selectTree" :default-expand-all="expandAll" class="text"></el-tree>
    </div>
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
          label: "机构编码-机构名称（机构状态）",
          children: [
            {
              label: "科室类型",
              children: [
                {
                  label: "科室名称",
                  children: [
                    {
                      label: "1103张三",
                    },
                    {
                      label: "1106李四",
                    },
                  ],
                },
                {
                  label: "科室名称2",
                  children: [
                    {
                      label: "1103张三",
                    },
                    {
                      label: "1106李四",
                    },
                  ],
                },
              ],
            },
            {
              label: "科室类型2",
              children: [
                {
                  label: "科室名称",
                  children: [
                    {
                      label: "1103张三",
                    },
                    {
                      label: "1106李四",
                    },
                  ],
                },
                {
                  label: "科室名称2",
                  children: [
                    {
                      label: "1103张三",
                    },
                    {
                      label: "1106李四",
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
      this.refreshTree = false
      this.expandAll = !this.expandAll
      // this.$nextTick(() => {
      //   this.refreshTree = true
      // })
    }
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
    // margin: 10px 0;
    margin-top: 10px;
    padding: 0;
    height: 19px;
    // border: 1px solid #000;
  }
  .el-button {
    min-height: 19px;
    line-height: normal;
  }
  .open-button-text {
    font-size: 14px;
    color: #339dff;
  }
  .menu {
    margin-top: 20px;
    .text {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.73px;
      font-weight: 400;
    }
  }
}
</style>