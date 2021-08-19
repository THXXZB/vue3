<template>
  <el-container>
    <el-header>
      <el-button class="add" @click="editTeam(null)">新增</el-button>
      <div class="input-box">
        <el-input placeholder="请输入内容" v-model="input4">
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
      <div class="select-unit">
        <span>护理单元：</span>
        <el-select v-model="currentNurseUnit" placeholder="请选择">
          <el-option
            v-for="item in nurseUnit"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-header>
    <el-main>
      <el-row>
        <!-- 分组 -->
        <el-col :span="16">
          <div class="grouped">
            <div class="team" v-for="(item, index) in teamList" :key="index">
              <div class="team_header">
                <el-row class="row-bg" justify="space-between">
                  <el-col :span="1" @click="item.expand = !item.expand"
                    ><img
                      :src="item.expand ? expandIconUrl : noExpandIconUrl"
                      alt=""
                      class="expand"
                  /></el-col>
                  <!-- <el-col :span="5" ><div class="tag" v-show="item.manageBed">管床</div></el-col> -->
                  <el-col :span="21">
                    <div class="text">{{ item.teamName }}</div>
                  </el-col>
                  <el-col :span="1" @click="editTeam(item)"
                    ><div class="edit">
                      <img
                        src="http://10.1.51.218:7505/DZHL/assets/%E7%BC%96%E8%BE%910@2x.png"
                        alt=""
                      /></div
                  ></el-col>
                  <el-col :span="1"
                    ><div class="delete">
                      <img
                        src="http://10.1.51.218:7505/DZHL/assets/%E5%88%A0%E9%99%A4@2x.png"
                        alt=""
                      /></div
                  ></el-col>
                </el-row>
              </div>
              <div class="team_body">
                <el-collapse-transition>
                  <div v-show="item.expand">
                    <el-row justify="space-between">
                      <el-col :span="1"
                        ><div class="add" @click="editTeam(item)">
                          <img
                            src="http://10.1.51.218:7505/DZHL/assets/%E6%96%B0%E5%BB%BA@2x.png"
                            alt=""
                          /></div
                      ></el-col>
                      <el-col :span="2"><div class="text">人员：</div></el-col>
                      <el-col :span="21">
                        <div class="member-grouped">
                          <div
                            class="mem-box"
                            v-for="(member, i) in item.memberList"
                            :key="member.id"
                          >
                            <span>{{ member.name }}</span>
                            <span>{{ member.code }}</span>
                            <img
                              @click="deleteMemberIndex(index, i, member)"
                              src="http://10.1.51.218:7505/DZHL/assets/%E5%85%B3%E9%97%AD01@2x.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row justify="space-between">
                      <el-col :span="1"
                        ><div class="add" @click="editTeam(item)">
                          <img
                            src="http://10.1.51.218:7505/DZHL/assets/%E6%96%B0%E5%BB%BA@2x.png"
                            alt=""
                          /></div
                      ></el-col>
                      <el-col :span="2"><div class="text">床位：</div></el-col>
                      <el-col :span="21">
                        <div class="bed-grouped">
                          <div
                            class="bed-box"
                            v-for="(bed, i) in item.bedList"
                            :key="bed.id"
                          >
                            <span>{{ bed.code }}</span>
                            <img
                              @click="deleteBedIndex(index, i, bed)"
                              src="http://10.1.51.218:7505/DZHL/assets/%E5%85%B3%E9%97%AD01@2x.png"
                              alt=""
                            />
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
                  ><img
                    src=""
                    alt=""
                  />
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
                  ><img
                    src=""
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <!-- 编辑小组弹窗 -->
    <el-dialog title="责任组编辑" v-model="showEditTeam" width="70%">
      <div class="teamName">
        <span><i>* </i>责任组名称：</span>
        <el-input placeholder="请输入内容" v-model="editTeamName"></el-input>
      </div>
      <div class="member">
        <div class="grouped">
          <div class="member__header">责任组成员</div>
          <div class="member__body">
            <div
              class="mem-box"
              v-for="(item, index) in editTeamMemberList"
              :key="index"
            >
              <span>{{ item.name }}</span
              ><span>{{ item.code }}</span
              ><img
                @click="deleteMember(item)"
                src="http://10.1.51.218:7505/DZHL/assets/%E5%85%B3%E9%97%AD01@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="no-group">
          <div class="member__header">未分组成员</div>
          <div class="member__body">
            <div
              class="mem-box"
              v-for="(item, index) in noGroupMemberList"
              :key="index"
            >
              <span>{{ item.name }}</span
              ><span>{{ item.code }}</span
              ><img
                @click="addMember(item)"
                src="http://10.1.51.218:7505/DZHL/assets/%E6%96%B0%E5%BB%BA01@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bed">
        <div class="grouped">
          <div class="bed__header">责任组床位</div>
          <div class="bed__body">
            <div
              class="bed-box"
              v-for="(item, index) in editTeamBedList"
              :key="index"
            >
              <span>{{ item.code }}</span
              ><img
                @click="deleteBed(item)"
                src="http://10.1.51.218:7505/DZHL/assets/%E5%85%B3%E9%97%AD01@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="no-group">
          <div class="bed__header">未分组床位</div>
          <div class="bed__body">
            <div
              class="bed-box"
              v-for="(item, index) in noGroupBedList"
              :key="index"
            >
              <span>{{ item.code }}</span>
              <img
                @click="addBed(item)"
                src="http://10.1.51.218:7505/DZHL/assets/%E6%96%B0%E5%BB%BA01@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="back">取 消</el-button>
          <el-button type="primary" @click="saveEditTeam">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      addOrEdit: null, // 判断当前编辑弹窗是增加小组还是编辑小组
      showEditTeam: false, // 护理小组编辑弹窗
      editTeamName: "", // 当前编辑小组的名称
      editTeamMemberList: [], //当前编辑小组的人员列表
      editTeamBedList: [], //当前编辑小组的床位列表
      tempMemberList: [],
      tempBedList: [],
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
          expand: false,
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
        // 人员总列表
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
        {
          id: 12,
          code: "N12",
          name: "张中来",
          grouped: false,
        },
        {
          id: 13,
          code: "N13",
          name: "林媛媛",
          grouped: false,
        },
        {
          id: 14,
          code: "N14",
          name: "赵欣欣",
          grouped: false,
        },
        {
          id: 15,
          code: "N15",
          name: "周少宇",
          grouped: false,
        },
      ],
      bedList: [
        // 床位总列表
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
        {
          id: 9,
          code: "09",
          grouped: false,
        },
        {
          id: 10,
          code: "10",
          grouped: false,
        },
        {
          id: 11,
          code: "11",
          grouped: false,
        },
        {
          id: 12,
          code: "12",
          grouped: false,
        },
        {
          id: 13,
          code: "13",
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
      expandIconUrl:
        "http://10.1.51.218:7505/DZHL/assets/%E4%B8%89%E8%A7%92%E5%B1%95%E5%BC%80@2x.png",
      noExpandIconUrl:
        "http://10.1.51.218:7505/DZHL/assets/%E4%B8%89%E8%A7%92%E6%94%B6%E8%B5%B7@2x.png",
    };
  },
  computed: {
    // 未分组人员列表
    noGroupMemberList() {
      return this.memberList.filter((item) => !item.grouped);
    },
    // 未分组床位列表
    noGroupBedList() {
      return this.bedList.filter((item) => !item.grouped);
    },
  },
  methods: {
    // 小组删除成员
    deleteMemberIndex(index, i, member) {
      console.log(index, i, member);
      this.teamList[index].memberList.splice(i, 1)
      let i2 = this.memberList.findIndex((item) => {
        return item.id === member.id;
      });
      this.memberList[i2].grouped = false;
    },
    // 小组删除床位
    deleteBedIndex(index, i, bed) {
      console.log(index, i, bed);
      this.teamList[index].bedList.splice(i, 1)
      let i2 = this.bedList.findIndex((item) => {
        return item.id === bed.id;
      });
      this.bedList[i2].grouped = false;
    },
    // 深复制
    deepClone(obj) {
      let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    },
    // 弹窗新增成员
    addMember(member) {
      // console.log(member)
      let index = this.memberList.indexOf(member);
      // console.log(this.memberList[index], this.tempMemberList[index]);
      this.memberList[index].grouped = true;
      // console.log(this.memberList[index], this.tempMemberList[index]);
      this.editTeamMemberList.push(member);
      // console.log(this.editTeamMemberList, this.memberList)
    },
    // 弹窗删除成员
    deleteMember(member) {
      // console.log(member)
      let index = this.editTeamMemberList.indexOf(member);
      this.editTeamMemberList.splice(index, 1);
      console.log(this.editTeamMemberList, this.memberList, member);
      // member.grouped = false
      // let index1 = this.memberList.indexOf(member)  // 为啥没用嘞
      let index2 = this.memberList.findIndex((item) => {
        return item.id === member.id;
      });
      this.memberList[index2].grouped = false;
    },
    // 弹窗新增床位
    addBed(bed) {
      // console.log(bed);
      let index = this.bedList.indexOf(bed);
      this.bedList[index].grouped = true;
      this.editTeamBedList.push(bed);
    },
    // 弹窗删除床位
    deleteBed(bed) {
      let index = this.editTeamBedList.indexOf(bed);
      this.editTeamBedList.splice(index, 1);
      // member.grouped = false
      // let index1 = this.memberList.indexOf(member)  // 为啥没用嘞
      let index2 = this.bedList.findIndex((item) => {
        return item.id === bed.id;
      });
      this.bedList[index2].grouped = false;
    },
    // 编辑小组
    editTeam(team) {
      // console.log('addEdit---------------', this.addOrEdit, team)
      this.showEditTeam = true; // 打开弹窗
      // 保存编辑之前的成员列表和床位列表
      this.tempMemberList = this.deepClone(this.memberList);
      this.tempBedList = this.deepClone(this.bedList);
      // console.log("team------", team);
      if (team) {
        // 编辑小组
        this.addOrEdit = team;
        this.editTeamName = team.teamName;
        this.editTeamMemberList = [...team.memberList];
        this.editTeamBedList = [...team.bedList];
      } else {
        this.addOrEdit = null;
      }
    },
    // 保存编辑小组
    saveEditTeam() {
      this.showEditTeam = false;
      if (this.addOrEdit) {
        // 编辑小组
        let index = this.teamList.indexOf(this.addOrEdit);
        // console.log(index);
        this.teamList[index].memberList = [...this.editTeamMemberList];
        this.teamList[index].bedList = [...this.editTeamBedList];

        // console.log(this.editTeamMemberList, this.editTeamBedList)
      } else {
        // 新增小组
        let team = {
          teamName: this.editTeamName,
          memberList: this.editTeamMemberList,
          bedList: this.editTeamBedList,
        };
        console.log(team);
        // 暂时还原成员列表和床位列表，待前后端对接后删除
        this.memberList = [...this.tempMemberList];
        this.bedList = [...this.tempBedList];
      }
      // 清空编辑之前保存的成员列表和床位列表
      this.tempMemberList.length = 0;
      this.tempBedList.length = 0;
      // 清空当前编辑小组信息
      this.editTeamName = "";
      this.editTeamMemberList = [];
      this.editTeamBedList = [];

      this.addOrEdit = null;
    },
    // 取消编辑
    back() {
      this.showEditTeam = false;
      this.addOrEdit = null;
      // console.log(this.tempMemberList, this.tempBedList);
      // 还原成员列表和床位列表
      this.memberList = [...this.tempMemberList];
      this.bedList = [...this.tempBedList];
    },
  },
};
</script>
<style lang="scss" scope>
.el-header {
  // border: 1px solid #abe;
  height: 30px !important;
  margin-bottom: 10px;
  padding: 0;
  display: flex;
  .add {
    width: 56px;
    height: 28px;
    min-height: 28px;
    padding: 0;
    background: rgba(51, 144, 248, 0.1);
    border: 1px solid rgba(51, 144, 248, 0.3);
    border-radius: 4px;
    span {
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #3390f8;
      line-height: 28px;
    }
  }
  .input-box {
    flex: 1;
    text-align: left;
    margin-left: 15px;
    .el-input-group {
      // flex: 1;
      width: 360px;
      height: 30px;
      .el-input__inner {
        width: 320px;
        height: 100%;
        box-shadow: 0 2px 4px 0 rgba(51, 144, 248, 0.1);
      }
      .el-input-group__append {
        width: 40px;
        height: 100%;
        padding: 0;
        background-color: #3390f8;
        border-radius: 0 4px 4px 0;
        .el-button {
          color: #fff;
          margin-left: -8px;
        }
      }
    }
  }
  .select-unit {
    width: 210px;
    span {
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #666666;
      line-height: 21px;
    }
    .el-select {
      width: 140px;
      height: 28px;
      line-height: 28px;
      .select-trigger {
        // height: 100%;
        .el-input {
          .el-input__inner {
            height: 28px;
          }
          .el-input__suffix {
            top: -5px;
          }
        }
      }
    }
  }
}
.el-main {
  padding: 0;
  .grouped {
    min-width: 740px;
    .team {
      margin-bottom: 20px;
      background: #ffffff;
      border: 1px solid #eeeeee;
      box-shadow: 0 2px 4px 0 rgba(51, 144, 248, 0.1);
      border-radius: 5px;
      .team_header {
        height: 29px;
        line-height: 29px;
        background: #f5f7fa;
        border-radius: 5px 5px 0 0;
        .el-row {
          .el-col {
            .expand {
              width: 8px;
              height: 8px;
            }
            .text {
              font-family: MicrosoftYaHei-Bold;
              font-size: 12px;
              color: #333333;
              text-align: left;
              margin-left: 30px;
            }
            .edit,
            .delete {
              width: 20px;
              height: 20px;
              margin-top: 4.5px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              img {
                width: 14px;
                height: 14px;
              }
            }
            .edit {
              background: rgba(230, 162, 60, 0.8);
            }
            .delete {
              background: rgba(245, 108, 108, 0.8);
            }
          }
        }
      }
      .team_body {
        .el-row {
          // height: 36px;
          .el-col {
            border-bottom: 1px solid #f5f7fa;
            .add {
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: rgba(51, 144, 248, 0.8);
              border-radius: 4px;
              margin: 8px auto;
              img {
                width: 14px;
                height: 14px;
              }
            }
            .text {
              line-height: 36px;
              text-align: right;
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #333333;
            }
            .member-grouped,
            .bed-grouped {
              display: flex;
              flex-wrap: wrap;
              padding: 7px 10px 0;
              .mem-box,
              .bed-box {
                margin-bottom: 7px;
              }
            }
          }
        }
      }
    }
  }
  .no-group {
    min-width: 380px;
    padding-left: 15px;
    .member,
    .bed {
      height: 200px;
      background: #ffffff;
      border: 1px solid #eeeeee;
      box-shadow: 0 2px 4px 0 rgba(51, 144, 248, 0.1);
      border-radius: 5px;
      margin-bottom: 16px;
      .member__header,
      .bed_header {
        height: 29px;
        line-height: 29px;
        background: #f5f7fa;
        border-radius: 5px 5px 0 0;
        padding: 0 10px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 12px;
        color: #333333;
        text-align: left;
      }
      .member_body,
      .bed_body {
        display: flex;
        flex-wrap: wrap;
        padding: 7px 10px;
        img {
          width: 10px;
          height: 10px;
          margin: 5.5px 0;
        }
      }
    }
  }
}
.el-overlay {
  .el-dialog {
    height: 62%;
    display: flex;
    flex-direction: column;
    .el-dialog__header {
      text-align: left;
      background: #f5f7fa;
      border-radius: 4px 4px 0 0;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      span {
        font-family: MicrosoftYaHei-Bold;
        font-size: 13px;
        color: #333333;
      }
      .el-dialog__headerbtn {
        top: 8px;
        right: 8px;
      }
    }
    .el-dialog__body {
      flex: 1;
      padding: 10px 20px 15px;
      .teamName {
        height: 28px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        // border: 1px solid #abe;
        span {
          width: 90px;
          font-family: MicrosoftYaHei;
          font-size: 13px;
          color: #2a2a2a;
          i {
            color: #f56c6c;
          }
        }
        .el-input {
          flex: 1;
          line-height: 28px;
          .el-input__inner {
            height: 28px;
          }
        }
      }
      .member,
      .bed {
        // width: calc(100% - 40px);
        margin-top: 20px;
        display: flex;
        .grouped,
        .no-group {
          width: 46%;
          height: 30%;
          min-width: 420px;
          min-height: 150px;
          background: rgba(245, 247, 250, 0.7);
          border-radius: 4px;
          padding: 8px 20px;
          .member__header,
          .bed__header {
            font-family: MicrosoftYaHei-Bold;
            font-size: 12px;
            color: #333333;
            line-height: 20px;
            text-align: left;
            margin-bottom: 8px;
          }
          .member__body,
          .bed__body {
            display: flex;
            flex-wrap: wrap;
          }
        }
        .no-group {
          margin-left: 20px;
        }
      }
    }
    .el-dialog__footer {
      height: 40px;
      padding: 0;
      margin: 0 20px;
      .el-button {
        width: 56px;
        height: 28px;
        min-height: 28px;
        padding: 0;
        span {
          line-height: 28px;
          font-family: MicrosoftYaHei;
          font-size: 13px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
        }
        &.el-button--default span {
          color: #666666;
        }
      }
    }
  }
}
.mem-box,
.bed-box {
  border-radius: 4px;
  margin: 0 10px 14px 0;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  span {
    line-height: 23px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #333333;
    text-align: left;
    margin-right: 5px;
  }
  img {
    width: 8px;
    height: 8px;
    display: inline-block;
    margin: 6.5px 0;
  }
}
.mem-box {
  min-width: 90px;
  height: 23px;
  background: rgba(51, 144, 248, 0.1);
  border: 1px solid rgba(51, 144, 248, 0.3);
}
.bed-box {
  min-width: 48px;
  height: 23px;
  background: rgba(30, 205, 147, 0.1);
  border: 1px solid rgba(30, 205, 147, 0.3);
}
</style>
