
<template>
  <h1>test</h1>
  <div class="flexbox">
    <div class="slide">
      <button @click="change">isActive</button>
    </div>
    <div class="content">
      <div class="div1"></div>
      <div class="div2"></div>
      <div class="div3"></div>
      <div class="div4"></div>
      <div class="div5"></div>
      <div class="div6"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      isActive: [true, false, false, false],
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
              label: "治疗科室2",
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
            {
              label: "急诊科室2",
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
    change() {
      this.isActive = this.isActive.map((item, i) => {
        if (i === 1) {
          return true;
        } else {
          return false;
        }
      });
      console.log(this.isActive);
    },
  },
};
</script>

<style scope>
.flexbox {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.slide {
  width: 200px;
  background-color: #abe;
}
.content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  background-color: #ff9;
}
.div1,
.div2,
.div3,
.div4,
.div5,
.div6 {
  width: 300px;
  height: 100px;
}
.div1 {
  border: 1px solid #000;
}
.div2 {
  border: 1px solid #f40;
}
.div3 {
  border: 1px solid #a40;
}
.div4 {
  border: 1px solid #000;
}
.div5 {
  border: 1px solid #f40;
}
.div6 {
  border: 1px solid #a40;
}
</style>
