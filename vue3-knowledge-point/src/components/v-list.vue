<template>
  <div
    class="scroll-box"
    :style="`height:${viewHeight}px`"
    @scroll="handleScroll"
  >
    <ul>
      <li
        v-for="(item, i) in cList"
        :key="i"
        :style="`transform:translateY(${offsetY}px); height:${itemHeight}px;line-height:${itemHeight}px`"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "VList",
  props: ["list"],
  data() {
    return {
      viewHeight: 300, //可视盒子的高度
      cList: [], // 可视范围的数据列表
      itemHeight: 50, // 每条数据所占的高度
      scrollHeight: "", // 虚拟列表的高度
      showNum: "", //可视化范围内显示的数据量
      offsetY: 0, // 动态偏移量
      lastTime: new Date().getTime(),
    };
  },
  mounted() {
    // 计算虚拟列表的长度
    this.scrollHeight = this.list.length * this.itemHeight;
    // 计算可视区内显示的数据量, 多设置2个防止滚动时直接替换
    this.showNum = Math.floor(this.viewHeight / this.itemHeight) + 2;
    // 计算默认展示列表
    this.cList = this.list.slice(0, this.showNum);
    console.log(this.list.length, this.scrollHeight, this.showNum, this.cList);
  },
  methods: {
    handleScroll(e) {
      // 减少滚动监听触发的次数
      if (new Date().getTime() - this.lastTime > 10) {
        // 记录滚动的高度
        let scrollTop = e.target.scrollTop;
        // console.log(scrollTop);
        // 计算偏移量(偏移单位是) eg: scrollTop=1220  1220 % itemHeight =20  offsetY = 1200
        this.offsetY = scrollTop - (scrollTop % this.itemHeight);
        // console.log("offsetY", this.offsetY);
        // 更新cList数据列表，往上卷多少，就要往下平移多少
        this.cList = this.list.slice(
          Math.floor(scrollTop / this.itemHeight),
          Math.floor(scrollTop / this.itemHeight) + this.showNum
        );
      }
      // 更新时间
      this.lastTime = new Date().getTime();
    }
  },
};
</script>
<style scoped lang="scss">
/* 在css中使用data中的变量，eslint报错 */
* {
  margin: 0;
  padding: 0;
}

.scroll-box {
  border: 1px solid #000;
  text-align: center;
  overflow-y: scroll;
  li {
    list-style: none;
    border: 1px solid #ab4;
    &:nth-child(3n + 3) {
      background-color: #abe;
    }
  }
}
</style>
