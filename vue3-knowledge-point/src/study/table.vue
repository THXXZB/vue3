<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin: 0 auto; text-align: center"
    >
      <el-table-column label="test" width="100">
        <template #default="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="test2" width="200">
        <!-- scope.row属性是因为el-table-column还是template？应该是el-table-column -->
        <template #default="scope">
          <el-popover
            :width="200"
            placement="top-start"
            effect="light"
            trigger="hover"
          >
            <!-- 弹出框内容 -->
            <span>{{scope.row}}</span>
            <!-- <template #default> {{ scope.row }}</template> -->
            <!-- 触发popover的组件 -->
            <template #reference>
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="200"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
  <Slot></Slot>
</template>
<script>
import Slot from "./components/slot.vue";
export default {
  data() {
    return {
      visiable: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          checked: true,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          checked: false,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          checked: false,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          checked: true,
        },
      ],
    };
  },
  methods: {
    selectChange() {
      console.log("selectChange");
    },
  },
  components: {
    Slot,
  },
};
</script>
