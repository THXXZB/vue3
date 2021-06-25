<template>
  <div class="content">
    <!-- 工具按钮栏 -->
    <div class="toolbox">
      <el-button type="primary" icon="el-icon-sort" class="toolbtn text"
        >同步</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-upload"
        class="toolbtn"
        @click="savePeopleInfo()"
        >保存</el-button
      >
      <el-button type="primary" icon="el-icon-refresh" class="toolbtn"
        >重置</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-lock"
        class="toolbtn reset-pwd"
        @click="resetPwd()"
        >重置密码</el-button
      >
    </div>
    <!-- 图标目录栏 -->
    <div class="iconbox">
      <div class="basic-info icon-box">
        <div class="basic-info-top icon-top">
          <img
            :src="isActive[0] ? iconSrc.basicIcon[0] : iconSrc.basicIcon[1]"
          />
        </div>
        <div
          class="basic-info-bottom icon-bottom"
          :class="{ active: isActive[0] }"
        >
          <img
            :src="isActive[0] ? iconSrc.basicIcon[1] : iconSrc.basicIcon[0]"
          />
          <span>基础信息</span>
        </div>
      </div>
      <div class="short-line">
        <div class="space"></div>
        <div class="line">
          <img
            src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12608.png"
          />
        </div>
      </div>
      <div class="duty-info icon-box">
        <div class="basic-info-top icon-top">
          <img :src="isActive[1] ? iconSrc.dutyIcon[0] : iconSrc.dutyIcon[1]" />
        </div>
        <div
          class="basic-info-bottom icon-bottom"
          :class="{ active: isActive[1] }"
        >
          <img :src="isActive[1] ? iconSrc.dutyIcon[1] : iconSrc.dutyIcon[0]" />
          <span>职务信息</span>
        </div>
      </div>
      <div class="short-line">
        <div class="space"></div>

        <div class="line">
          <img
            src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12608.png"
          />
        </div>
      </div>
      <div class="role-info icon-box">
        <div class="basic-info-top icon-top">
          <img :src="isActive[2] ? iconSrc.roleIcon[0] : iconSrc.roleIcon[1]" />
        </div>
        <div
          class="basic-info-bottom icon-bottom"
          :class="{ active: isActive[2] }"
        >
          <img :src="isActive[2] ? iconSrc.roleIcon[1] : iconSrc.roleIcon[0]" />
          <span>角色信息</span>
        </div>
      </div>
      <div class="short-line">
        <div class="space"></div>
        <div class="line">
          <img
            src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12608.png"
          />
        </div>
      </div>
      <div class="account-info icon-box">
        <div class="basic-info-top icon-top">
          <img
            :src="isActive[3] ? iconSrc.accountIcon[0] : iconSrc.accountIcon[1]"
          />
        </div>
        <div
          class="basic-info-bottom icon-bottom"
          :class="{ active: isActive[3] }"
        >
          <img
            :src="isActive[3] ? iconSrc.accountIcon[1] : iconSrc.accountIcon[0]"
          />
          <span>上报账户</span>
        </div>
      </div>
    </div>
    <!-- 表单内容 -->
    <!-- {{ peopleData }}<br />
    {{ formData }}---{{ cardType }} -->
    <div class="formbox" @scroll="scrollGet($event)">
      <!-- 基础信息 -->
      <div class="basic-form-box">
        <!-- 基础信息标题分割线 -->
        <div class="title">
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
          <div class="text"><p>基础信息</p></div>
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
        </div>
        <!-- 基础信息表单列表 -->
        <div class="form-box">
          <div class="branch-box">
            <p><span>所属机构 :</span></p>
            <el-select
              v-model="formData.branch"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in branchList"
                :key="index"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="dept-box">
            <p><span>所属科室 :</span></p>
            <el-select
              v-model="formData.dept"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in deptList"
                :key="index"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="user-code-box">
            <p><span>账号 :</span></p>
            <el-input
              v-model="formData.userCode"
              class="input"
              placeholder="定时同步"
            ></el-input>
          </div>
          <div class="pwd-box">
            <p><span>密码 :</span></p>
            <el-input
              v-model="formData.pwd"
              class="input"
              placeholder="可更改"
            ></el-input>
          </div>
          <div class="name-box">
            <p><span>姓名 :</span></p>
            <el-input
              v-model="formData.name"
              class="input"
              placeholder="定时同步"
            ></el-input>
          </div>
          <div class="sex-box">
            <p><span>性别 :</span></p>
            <el-select
              v-model="formData.sex"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in sexList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="card-type-box">
            <p><span>证件类型 :</span></p>
            <el-select
              v-model="formData.cardType"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in cardTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="card-number-box">
            <p><span>证件号码 :</span></p>
            <el-input
              v-model="formData.cardNum"
              class="input"
              placeholder="定时同步"
            ></el-input>
          </div>
          <div class="mobile-box">
            <p><span>联系方式 :</span></p>
            <el-input
              v-model="formData.mobile"
              class="input"
              placeholder="定时同步"
            ></el-input>
          </div>
          <div class="state-box">
            <p><span>使用状态 :</span></p>
            <el-select
              v-model="formData.state"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in stateList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="input-code-box">
            <p><span>辅码一 :</span></p>
            <el-input
              v-model="formData.inputCode1"
              class="input"
              :disabled="true"
              placeholder="自动生成"
            ></el-input>
          </div>
          <div class="input-code-box">
            <p><span>辅码二 :</span></p>
            <el-input
              v-model="formData.inputCode2"
              class="input"
              :disabled="true"
              placeholder="自动生成"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 职务信息 -->
      <div class="duty-form-box">
        <!-- 职务信息标题分割线 -->
        <div class="title">
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
          <div class="text"><p>职务信息</p></div>
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
        </div>
        <!-- 职务信息表单列表 -->
        <div class="form-box">
          <div class="job-title-box">
            <p><span>职称 :</span></p>
            <el-select
              v-model="formData.jobTitle"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in jobTitleList"
                :key="index"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="duty-box">
            <p><span>工作职务 :</span></p>
            <el-select
              v-model="formData.duty"
              class="input"
              placeholder="定时同步"
            >
              <el-option
                v-for="(item, index) in dutyList"
                :key="index"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 角色信息 -->
      <div class="role-form-box">
        <!-- 角色信息标题分割线 -->
        <div class="title">
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
          <div class="text"><p>角色信息</p></div>
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
        </div>
        <!-- 角色添加展示 -->
        <div class="form-box">
          <div class="flex-start">
            <p>人员角色 ：</p>
            <div
              class="role-box role-icon"
              v-for="(item, index) in roleList"
              :key="index"
              @click="deleteRole(index)"
            >
              <!-- 角色名称 -->
              <div class="role-header">
                <p>{{ item.roleName }}</p>
              </div>
              <!-- 机构信息 -->
              <div class="role-body">
                <!-- 机构代码 -->
                <p class="branch-code">{{ item.branchCode }}</p>
                <!-- 机构名称 -->
                <p class="branch-name">{{ item.branchName }}</p>
              </div>
            </div>
            <div class="add-role-box" @click="addRole()">
              <img src="../assets/add.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 单病种上报账户 -->
      <div class="account-form-box">
        <!-- 账户信息标题分割线 -->
        <div class="title">
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
          <div class="text"><p>单病种上报账户</p></div>
          <div class="long-line">
            <img
              src="http://10.1.50.183:8011/images/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86/u12359.png"
              alt=""
            />
          </div>
        </div>
        <!-- 账户信息表单列表 -->
        <div class="form-box">
          <div class="report-account-box">
            <p><span>平台账号 :</span></p>
            <el-input
              v-model="formData.reportAccount"
              class="input"
              placeholder="维护"
            ></el-input>
          </div>
          <div class="report-pwd-box">
            <p><span>平台密码 :</span></p>
            <el-input
              v-model="formData.reportPwd"
              class="input"
              placeholder="维护"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加角色弹窗 -->
    <div class="role-window" v-show="addRoleFlag">
      <div class="role-window-header">
        <span>添加角色</span>
        <i @click="addRoleBack()"></i>
      </div>
      <div class="role-window-body">
        <el-input
          class="search"
          placeholder="可模糊查找"
          prefix-icon="el-icon-search"
          v-model="roleSearch"
        >
        </el-input>
        <el-tree
          :data="addRoleList"
          :check-strictly="true"
          :default-expand-all="true"
          ref="tree"
          class="tree"
          show-checkbox
        >
        </el-tree>
        <div class="btn">
          <el-button @click="addRoleBack()">取消</el-button>
          <el-button @click="addRoleSave()" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: "Content",
  // 接收父组件传过来的人员信息
  props: {
    peopleData: Object,
  },
  data() {
    return {
      password: "",
      isActive: [true, false, false, false],
      sex: "",
      cardType: "",
      state: "在用",
      roleSearch: "",
      addRoleFlag: false,
      formData: this.peopleData,
      branchList: ["集团", "区域", "地方"],
      deptList: ["急诊科", "治疗科", "行政科"],
      sexList: [
        {
          value: "0",
          label: "未知性别",
        },
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      cardTypeList: [{ value: "0", label: "身份证" }],
      stateList: [
        {
          value: "0",
          label: "停用",
        },
        {
          value: "1",
          label: "在用",
        },
        {
          value: "2",
          label: "删除",
        },
      ],
      jobTitleList: ["护士长", "副护士长", "主任", "副主任", "护士"],
      dutyList: ["医师", "药师", "技师", "护师"],
      roleList: [
        {
          roleName: "管理员A",
          branchCode: "GM0681",
          branchName: "宁波金唐第三附属医院",
        },
        {
          roleName: "管理员B",
          branchCode: "GM0680",
          branchName: "宁波金唐第三医院",
        },
        {
          roleName: "管理员C",
          branchCode: "GM0681",
          branchName: "宁波金唐第三附属支医院二",
        },
        {
          roleName: "管理员D",
          branchCode: "GM0681",
          branchName: "宁波金唐医院",
        },
        {
          roleName: "管理员E",
          branchCode: "GM0681",
          branchName: "宁波金唐第三附属支医院三",
        },
        {
          roleName: "管理员F",
          branchCode: "GM0681",
          branchName: "宁波金唐医院",
        },
      ],
      addRoleList: [
        { label: "宁波大学", children: [] },
        { label: "浙江大学" },
        {
          label: "宁波金唐医院",
          children: [
            {
              label: "管理员A",
            },
            {
              label: "管理员B",
            },
            {
              label: "管理员C",
            },
          ],
        },
        {
          label: "鄞州第三医院",
          children: [
            {
              label: "管理员D",
            },
            {
              label: "管理员E",
            },
          ],
        },
      ],
      iconSrc: {
        basicIcon: [
          "http://10.1.51.218:7502/DBZGLPT/assets/%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF-%E6%9C%AC%E8%89%B2@3x.png",
          "http://10.1.51.218:7502/DBZGLPT/assets/%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF-%E9%80%89%E4%B8%AD@3x.png",
        ],
        dutyIcon: [
          "http://10.1.51.218:7502/DBZGLPT/assets/%E8%81%8C%E5%8A%A1%E4%BF%A1%E6%81%AF-%E5%8E%9F%E8%89%B2@3x.png",
          "http://10.1.51.218:7502/DBZGLPT/assets/%E8%81%8C%E5%8A%A1%E4%BF%A1%E6%81%AF-%E9%80%89%E4%B8%AD@3x.png",
        ],
        roleIcon: [
          "http://10.1.51.218:7502/DBZGLPT/assets/%E8%A7%92%E8%89%B2%E4%BF%A1%E6%81%AF-%E5%8E%9F%E8%89%B2@3x.png",
          "http://10.1.51.218:7502/DBZGLPT/assets/%E8%A7%92%E8%89%B2%E4%BF%A1%E6%81%AF-%E9%80%89%E4%B8%AD@3x.png",
        ],
        accountIcon: [
          "http://10.1.51.218:7502/DBZGLPT/assets/%E4%B8%8A%E6%8A%A5%E8%B4%A6%E6%88%B7-%E5%8E%9F%E8%89%B2@3x.png",
          "http://10.1.51.218:7502/DBZGLPT/assets/%E4%B8%8A%E6%8A%A5%E8%B4%A6%E6%88%B7-%E9%80%89%E4%B8%AD@3x.png",
        ],
      },
    };
  },
  methods: {
    // 保存用户信息
    savePeopleInfo() {
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 删除角色
    deleteRole(i) {
      console.log("删除角色");
      this.roleList.splice(i, 1);
      this.$message({
        type: "success",
        message: "删除成功",
      });
    },
    // 重置密码
    resetPwd() {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "重置密码",
        cancelButtonText: "取消",
        inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
        inputErrorMessage: "密码格式不正确",
      })
        .then(({ value }) => {
          this.password = value;
          this.$message({
            type: "success",
            message: "密码重置成功" + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 添加角色
    addRole() {
      console.log("添加角色");
      this.addRoleFlag = true;
    },
    // 取消角色添加
    addRoleBack() {
      this.addRoleFlag = false;
      this.$message({
        type: "info",
        message: "取消添加",
      });
    },
    // 保存添加的角色
    addRoleSave() {
      this.addRoleFlag = false;
      let checkdNodes = this.$refs.tree.getCheckedNodes();
      // 用户只选择了机构或角色
      if (checkdNodes.length !== 2) {
        ElMessage.error({
          message: "选择失败，请重新选择(少选或多选)",
          type: "error",
        });
        return;
      }
      // 判断用户所选角色与机构的所属关系是否正确
      let branch = "";
      let role = "";
      // 正常情况下机构的id会小于角色的id
      if (checkdNodes[0].$treeNodeId < checkdNodes[1].$treeNodeId) {
        branch = checkdNodes[0];
        role = checkdNodes[1];
      }
      // 判断所属关系是否正确
      if (branch.children && !role.children) {
        // 存在children，说明是机构
        let len = branch.$treeNodeId + branch.children.length;
        console.log(
          branch.$treeNodeId,
          branch.children.length,
          role.$treeNodeId
        );
        if (role.$treeNodeId <= len) {
          ElMessage.success({
            message: "角色添加成功",
            type: "success",
          });
        } else {
          ElMessage.error({
            message: "角色添加成功(所属关系错误)",
            type: "error",
          });
        }
      } else {
        ElMessage.error({
          message: "角色添加成功(两者都是机构或角色或所属关系错误)",
          type: "error",
        });
      }
    },
    // 关闭添加角色的弹窗
    closeWindow() {
      this.addRoleFlag = false;
      this.$message({
        type: "info",
        message: "取消添加",
      });
    },
    // 滚动条监听
    scrollGet(e) {
      // 滚动条距离页面顶部的距离（原生兼容）
      let scrollTop = e.srcElement.scrollTop;
      // 距离要改成动态，在自适应的时候才不会出错
      if (scrollTop < 100) {
        // console.log('基础信息', scrollTop)
        if (this.isActive[0] === false) {
          this.isActiveEach(0);
        }
      } else if (scrollTop >= 100 && scrollTop < 150) {
        // console.log('职务信息', scrollTop)
        if (this.isActive[1] === false) {
          this.isActiveEach(1);
        }
      } else if (scrollTop >= 150 && scrollTop < 280) {
        // console.log('角色信息', scrollTop)
        if (this.isActive[2] === false) {
          this.isActiveEach(2);
        }
      } else {
        // console.log("账户信息", scrollTop);
        if (this.isActive[3] === false) {
          this.isActiveEach(3);
        }
      }
    },
    // 遍历isActive数组
    isActiveEach(index) {
      this.isActive = this.isActive.map((item, i) => {
        if (i === index) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(this.isActive);
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  position: relative;
  // height: 100%;
  .toolbox {
    margin-bottom: 30px;
    .toolbtn {
      width: 80px;
      height: 30px;
      border: none;
      background: #4ca9ff;
      border-radius: 3px;
      &.reset-pwd {
        width: 100px;
      }
      &.el-button--small {
        min-height: 0;
        padding: 9px 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.73px;
        text-align: center;
        font-weight: 400;
      }
    }
  }
  .iconbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 35px;
    .icon-box {
      // width: 120px;
      .icon-top,
      .icon-bottom {
        img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
        span {
          margin-left: 10px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 16px;
          color: #666666;
          letter-spacing: 0.53px;
          font-weight: 700;
        }
        &.active {
          span {
            color: #339dff;
          }
        }
      }
      .icon-bottom {
        margin-top: 5px;
        img {
          display: inline-block;
        }
      }
    }
    .short-line {
      // width: 100px;
      text-align: center;
      .space {
        height: 50%;
      }

      img {
        width: 20px;
        height: 1px;
        vertical-align: middle;
      }
    }
  }
  .formbox {
    height: 72%;
    overflow: auto;
    .title {
      display: flex;
      height: 19px;
      margin-bottom: 20px;
      .long-line {
        flex: 1;
        img {
          width: 100%;
          vertical-align: middle;
        }
      }
      .text {
        display: inline-block;
        // padding: 0 3.9px;
        width: 89.79px;
        height: 19px;
        p {
          margin: 0;
          font-family: MicrosoftYaHei-Bold;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0.47px;
          text-align: center;
          font-weight: 700;
        }
      }
    }
    .form-box {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .user-code-box,
      .pwd-box,
      .name-box,
      .sex-box,
      .branch-box,
      .dept-box,
      .card-type-box,
      .card-number-box,
      .mobile-box,
      .state-box,
      .input-code-box,
      .job-title-box,
      .duty-box,
      .report-account-box,
      .report-pwd-box {
        // width: 420px;
        text-align: center;
        margin: 0 21px 20px;
        p {
          margin: 0;
          width: 100px;
          display: inline-block;
          text-align: right;
          span::before {
            content: "*";
            color: #f00;
          }
          span {
            margin-right: 10px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0.47px;
            text-align: right;
            line-height: 19px;
            font-weight: 400;
          }
        }
        .input {
          width: 200px;
          height: 30px;
        }
      }
      .sex-box,
      .job-title-box,
      .duty-box {
        p > span::before {
          content: "";
        }
      }
    }
    .account-form-box {
      .title {
        .text {
          width: 105.79px;
        }
      }
    }
    .role-form-box {
      .form-box {
        .flex-start {
          width: 80%;
          display: flex;
          flex-wrap: wrap;
          p {
            margin: 0 0 0 24px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            letter-spacing: 0.54px;
            font-weight: 400;
          }
          .role-box {
            height: 80px;
            margin: 0 20px 20px 0;
            background: #4ca9ff;
            border: 1px solid #4ca9ff;
            border-radius: 5px;
            text-align: center;
            .role-header,
            .role-body {
              p {
                padding: 5px 0;
                color: #fff;
              }
            }
            .role-body {
              background-color: #fff;
              border-radius: 0 0 5px 5px;
              p {
                margin: 0;
                padding: 6px 10px 2px;
                color: #409dfd;
                &.branch-name {
                  padding: 2px 10px 4px;
                }
              }
            }
          }
          .role-icon {
            position: relative;
            // 取消元素的鼠标事件
            pointer-events: none;
            &:after {
              content: "";
              width: 14px;
              height: 14px;
              position: absolute;
              top: -8px;
              right: -8px;
              background-size: contain;
              background-image: url("../assets/delete.svg");
              cursor: pointer;
              // 给伪类添加鼠标事件
              pointer-events: auto;
            }
          }
          .add-role-box {
            width: 120px;
            height: 80px;
            border: 1px solid #dddee0;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
              width: 50%;
              height: 30%;
            }
          }
        }
      }
    }
  }
  .role-window {
    width: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #aaa;
    border-radius: 5px;
    background-color: #fff;
    .role-window-header {
      height: 40px;
      margin-bottom: 20px;
      position: relative;
      border-bottom: 1px solid #aaa;
      border-radius: 5px 5px 0 0;
      span {
        line-height: 40px;
        margin-left: 10px;
      }
      i {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-100%, -50%);
        background: url(../assets/back.svg);
        background-size: contain;
      }
    }
    .role-window-body {
      text-align: center;
      .search {
        width: 280px;
        margin-bottom: 30px;
      }
      .tree {
        margin-left: 35px;
        min-height: 280px;
      }
      .btn {
        margin-bottom: 20px;
        .el-button {
          width: 80px;
          height: 30px;
          margin: 0 40px;
        }
      }
    }
  }
}
</style>
