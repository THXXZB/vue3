<template>
  <div class="table">
    <!-- {{tableData}} <br>
    {{name}} -->
    <el-table :data="tableData" style="width: 100%; margin: 0 auto; border: 1px solid #f40">
      <el-table-column label="操作" width="124">
        <template #default="scope">
          <div class="operation" v-show="(scope.row.state !== '已审批') && (scope.row.verifier.indexOf('蔡文姬') !== -1)">
            
            <div class="icon icon1"><img src="http://10.1.51.218:7505/DZHL/assets/%E4%BF%A1%E6%81%AF%E8%AF%A6%E6%9F%A5@2x.png" alt=""></div>
            <div class="icon icon2"><img src="http://10.1.51.218:7505/DZHL/assets/%E4%BA%BA%E5%91%98%E6%A1%A3%E6%A1%88@2x.png" alt=""></div>
            <div class="icon icon3"><img src="http://10.1.51.218:7505/DZHL/assets/%E5%AE%A1%E6%89%B9%E7%9B%96%E7%AB%A0@2x.png" alt=""></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="150"> </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="content" label="内容" width="240"> </el-table-column>
      <el-table-column prop="proposer" label="申请人" width="220"> </el-table-column>
      <el-table-column prop="verifier" label="审核人"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: 'defaul'
    }
  },
  data() {
    return {
      userName: '蔡文姬'
    };
  },
};
</script>
<style lang="scss">
.table {
  .el-table__header-wrapper {
    height: 28px;
    // border: 1px solid #f93;
    .el-table__header thead.has-gutter {
      th,
      tr {
        background-color: #f5f7fa;
      }
      .cell {
        padding-left: 12px;
        font-family: MicrosoftYaHeiUI-Bold;
        font-size: 12.5px;
        color: #888888;
        letter-spacing: 0;
        line-height: 28px;
      }
    }
    .el-table__body-wrapper {
      .el-table__row {
        // height: 28px;
      }
    }
  }
  .el-table__body-wrapper {
    .el-table__row {
      .cell {
        .operation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 20px;
          .icon {
            width: 22px;
            height: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            img{
              width: 14px;
              height: 14px;
            }
            &.icon1 {
              background: rgba(51, 144, 248, 0.8);
            }
            &.icon2 {
              background: rgba(30, 205, 147, 0.8);
            }
            &.icon3 {
              background: rgba(230, 162, 60, 0.8);
            }
          }
        }
      }
    }
  }
}
.el-table td,
.el-table th {
  padding: 0 !important;
  // border: 1px solid #333333;
}
.el-table .cell {
  line-height: 28px !important;
  font-family: MicrosoftYaHeiUI;
  font-size: 13px;
  color: #333333;
  letter-spacing: 0;
}
</style>