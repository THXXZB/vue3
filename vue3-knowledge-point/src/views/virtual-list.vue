<template>
  <div>
    <h1>虚拟滚动</h1>
    <p>
      作用：解决无法使用分页功能的长列表首屏加载速度慢的问题，dom加载过多“无用”元素（可视范围外）
    </p>
    <p>
      原理：只渲染可视范围内的dom，通过复用超出可视范围的dom达到提高性能的目的
    </p>
    <div class="scroll-box" :style="`height:${viewHeight}px`" @click="handleScroll($event)">
      <ul>
        <li v-for="(item, i) in cList" :key="i" :style="`height:${itemHeight}px`">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewHeight: 500,  //可视盒子的高度
      list: [],  //总数据列表
      cList: [],  // 可视范围的数据列表
      itemHight: 50, // 每条数据所占的高度
      scrollHeight: '',  // 虚拟列表的高度
      showNum: '', //可视化范围内显示的数据量
      offsetY: 0, // 动态偏移量
      lastTime: new Date().getTime()  // 最新时间
    };
  },
  mounted() {
    this.getList()
    // 计算虚拟列表的长度
    this.scrollHeight = this.list.length * this.itemHeight
    // 计算可视区内显示的数据量, 多设置4个防止滚动时直接替换
    this.showNum = Math.floor(this.viewHeight / this.itemHeight) + 4
    // 计算默认展示列表
    this.cList = this.list.slice(0, this.showNum)
    console.log(this.scrollHeight, this.showNum, this.cList)
  },
  methods: {
    handleScroll(e) {
      // 减少滚动监听触发的次数
      if (new Date().getTime() - this.lastTime > 10) {
        // 记录滚动的高度
        let scrollTop = e.target.scrollTop;
        console.log(scrollTop)
      }

    },
    getList() {
      // lsit赋值
      for (let i = 0; i < 1000; i++) {
        this.list.push(i)
      }
    }
  },
};
</script>
<style scoped>
/* 在css中使用data中的变量，eslint报错 */
ul>li{

}
</style>
