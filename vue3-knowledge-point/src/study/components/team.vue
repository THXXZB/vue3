import { computed } from 'vue';
<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2"><el-button>新增</el-button></el-col>
        <el-col :span="4"
          ><el-input placeholder="请输入内容" v-model="input4">
            <template #prefix>
              <i class="el-input__icon el-icon-search"></i>
            </template> </el-input
        ></el-col>
        <el-col :span="6" :offset="12"
          ><div class="select-unit">
            <span>护理单元：</span
            ><el-select v-model="currentNurseUnit" placeholder="请选择">
              <el-option
                v-for="item in nurseUnit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <!-- 分组 -->
        <el-col :span="16">
          <div class="grouped">
            <div class="team" v-for="(item, index) in teamList" :key="index">
              <div class="team_header">
                <el-row class="row-bg" justify="space-between">
                  <el-col :span="2" @click="item.expand = !item.expand"
                    >图标</el-col
                  >
                  <!-- <el-col :span="5" ><div class="tag" v-show="item.manageBed">管床</div></el-col> -->
                  <el-col :span="16">{{ item.teamName }}</el-col>
                  <el-col :span="3" @click="showEditTeam = !showEditTeam"
                    >编辑</el-col
                  >
                  <el-col :span="3">删除</el-col>
                </el-row>
              </div>
              <div class="team_body">
                <el-collapse-transition>
                  <div class="team_body" v-show="item.expand">
                    <el-row justify="space-between">
                      <el-col :span="1">+</el-col>
                      <el-col :span="4">人员:</el-col>
                      <el-col :span="19">
                        <div class="member-grouped">
                          <div
                            class="mem-box"
                            v-for="member in item.memberList"
                            :key="member.id"
                          >
                            <span>{{ member.name }}</span>
                            <span>{{ member.code }}</span>
                            <i>+</i>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row justify="space-between">
                      <el-col :span="1">+</el-col>
                      <el-col :span="4">床位:</el-col>
                      <el-col :span="19">
                        <div class="bed-grouped">
                          <div
                            class="bed-box"
                            v-for="bed in item.bedList"
                            :key="bed.id"
                          >
                            <span>{{ bed.code }}</span>
                            <i>+</i>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-transition>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 未分组 -->
        <el-col :span="8">
          <div class="no-group">
            <div class="member">
              <div class="member__header">未分组人员</div>
              <div class="member_body">
                <div
                  class="mem-box"
                  v-for="item in noGroupMemberList"
                  :key="item.id"
                >
                  <span>{{ item.name }}</span
                  ><span>{{ item.code }}</span
                  ><i>+</i>
                </div>
              </div>
            </div>
            <div class="bed">
              <div class="bed_header">未分组床位</div>
              <div class="bed_body">
                <div
                  class="bed-box"
                  v-for="item in noGroupBedList"
                  :key="item.id"
                >
                  <span>{{ item.code }}</span
                  ><i>+</i>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog title="责任组编辑" v-model="showEditTeam" width="70%">
      <div class="teamName">
        <i>*</i><span>责任组名称：</span
        ><el-input placeholder="请输入内容" v-model="editName"></el-input>
      </div>
      <div class="grouped">
        <div class="member">
          <div class="member__header">责任组成员</div>
          <div class="member__body">
            <div
              class="mem-box"
              v-for="(item, index) in editTeamMemberList"
              :key="index"
            >
              {{ item.name }}{{item.code}}
            </div>
          </div>
        </div>
        <div class="bed">
          <div class="bed__header">责任组床位</div>
          <div class="bed__body">
            <div
              class="bed-box"
              v-for="(item, index) in editTeamBedList"
              :key="index"
            >
              {{ item.code }}
            </div>
          </div>
        </div>
      </div>
      <div class="no-group">
        <div class="member">
          <div class="member__header">未分组成员</div>
          <div class="member__body">
            <div
              class="mem-box"
              v-for="(item, index) in noGroupMemberList"
              :key="index"
            >
              {{ item.name }}{{item.code}}
            </div>
          </div>
        </div>
        <div class="bed">
          <div class="bed__header">未分组床位</div>
          <div class="bed__body">
            <div
              class="bed-box"
              v-for="(item, index) in noGroupBedList"
              :key="index"
            >
              {{ item.code }}
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditTeam = false">取 消</el-button>
          <el-button type="primary" @click="saveEditTeam"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      showEditTeam: true, // 护理小组编辑弹窗
      editTeamName: "",
      editTeamMemberList: [],
      editTeamBedList: [],
      teamList: [
        //小组列表
        {
          id: 1,
          teamName: "责任组1",
          manageBed: true,
          expand: true,
          memberList: [
            {
              id: 1,
              code: "N1",
              name: "程潇潇",
              grouped: true,
            },
            {
              id: 2,
              code: "N2",
              name: "李绅",
              grouped: true,
            },
          ],
          bedList: [
            {
              id: 1,
              code: "01",
              grouped: true,
            },
            {
              id: 2,
              code: "02",
              grouped: true,
            },
          ],
        },
        {
          id: 2,
          teamName: "责任组2",
          manageBed: false,
          expand: true,
          memberList: [
            {
              id: 4,
              code: "N4",
              name: "黄海成",
              grouped: true,
            },
            {
              id: 5,
              code: "N5",
              name: "司徒晴",
              grouped: true,
            },
          ],
          bedList: [
            {
              id: 5,
              code: "05",
              grouped: true,
            },
            {
              id: 6,
              code: "06",
              grouped: true,
            },
          ],
        },
        {
          id: 3,
          teamName: "责任组3",
          manageBed: true,
          expand: true,
          memberList: [
            {
              id: 9,
              code: "N9",
              name: "袁娜娜",
              grouped: true,
            },
            {
              id: 10,
              code: "N10",
              name: "黄璐",
              grouped: true,
            },
          ],
          bedList: [
            {
              id: 3,
              code: "03",
              grouped: true,
            },
            {
              id: 4,
              code: "04",
              grouped: true,
            },
          ],
        },
      ],
      memberList: [
        // 人员列表
        {
          id: 1,
          code: "N1",
          name: "程潇潇",
          grouped: true,
        },
        {
          id: 2,
          code: "N2",
          name: "李绅",
          grouped: true,
        },
        {
          id: 3,
          code: "N3",
          name: "陆因仪",
          grouped: false,
        },
        {
          id: 4,
          code: "N4",
          name: "黄海成",
          grouped: true,
        },
        {
          id: 5,
          code: "N5",
          name: "司徒晴",
          grouped: true,
        },
        {
          id: 6,
          code: "N6",
          name: "陈芊芊",
          grouped: false,
        },
        {
          id: 7,
          code: "N7",
          name: "晓晨",
          grouped: false,
        },
        {
          id: 8,
          code: "N8",
          name: "袁莎",
          grouped: false,
        },
        {
          id: 9,
          code: "N9",
          name: "袁娜娜",
          grouped: true,
        },
        {
          id: 10,
          code: "N10",
          name: "黄璐",
          grouped: true,
        },
        {
          id: 11,
          code: "N11",
          name: "卢芳成",
          grouped: false,
        },
      ],
      bedList: [
        // 床位列表
        {
          id: 1,
          code: "01",
          grouped: true,
        },
        {
          id: 2,
          code: "02",
          grouped: true,
        },
        {
          id: 3,
          code: "03",
          grouped: true,
        },
        {
          id: 4,
          code: "04",
          grouped: true,
        },
        {
          id: 5,
          code: "05",
          grouped: true,
        },
        {
          id: 6,
          code: "06",
          grouped: true,
        },
        {
          id: 7,
          code: "07",
          grouped: false,
        },
        {
          id: 8,
          code: "08",
          grouped: false,
        },
      ],
      nurseUnit: [
        // 护理单元列表
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      // 当前护理单元
      currentNurseUnit: "",
    };
  },
  computed: {
    noGroupMemberList() {
      return this.memberList.filter((item) => !item.grouped);
    },
    noGroupBedList() {
      return this.bedList.filter((item) => !item.grouped);
    },
  },
  methods: {
    saveEditTeam() {
      this.showEditTeam = false
    }
  },
};
</script>
<style lang="scss" scope>
.el-header {
  border: 1px solid #abe;
  height: 44px !important;
  margin-bottom: 10px;
  .el-row {
    .el-col {
      .select-unit {
      }
    }
  }
}
.el-main {
  padding: 0;
  .grouped {
    .team {
      margin-bottom: 20px;
      .team_header {
        background-color: #eee;
        .el-row {
          .el-col {
            border: 1px solid rgb(169, 216, 115);
          }
        }
      }
      .team_body {
        .el-row {
          .el-col {
            border: 1px solid rgb(45, 105, 155);
            .member-grouped,
            .bed-grouped {
              display: flex;
              padding: 5px 10px;
            }
          }
        }
      }
    }
  }
  .no-group {
    padding-left: 10px;
    .member,
    .bed {
      height: 200px;
      .member__header,
      .bed_header {
        background-color: #eee;
      }
      .member_body,
      .bed_body {
        display: flex;
        padding: 5px 5px;
      }
    }
  }
}
.el-overlay {
  .el-dialog {
    height: 70%;
    display: flex;
    flex-direction: column;
    .el-dialog__header {
      text-align: left;
      height: 40px;
    }
    .el-dialog__body {
      flex: 1;
      // border: 1px solid #abe;
      padding: 10px 20px;
      .teamName {
        height: 40px;
        display: flex;
        .el-input {
          width: 80%;
        }
      }
      .grouped,
      .no-group {
        height: 45%;
        display: flex;
        // border: 1px solid #f3f;
      }
      .member,
      .bed {
        width: calc(50% - 10px);
        height: 100%;
        border: 1px solid #409eff;
        .member__header,
        .bed__header {
          text-align: left;
        }
        .member__body,
        .bed__body {
          display: flex;
          .mem-box,
          .bed-box {
          }
        }
      }
      .bed {
        margin-left: 20px;
      }
    }
    .el-dialog__footer {
      height: 40px;
      padding: 0;
    }
  }
}
.mem-box {
  border: 1px solid #409eff;
  margin-right: 10px;
}
.bed-box {
  border: 1px solid #67c23a;
  margin-right: 10px;
}
</style>
