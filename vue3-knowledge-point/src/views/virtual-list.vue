<template>
  <div>
    <h1>虚拟滚动</h1>
    <p>
      作用：解决无法使用分页功能的长列表首屏加载速度慢的问题，dom加载过多“无用”元素（可视范围外）
    </p>
    <p>
      原理：只渲染可视范围内的dom，通过复用超出可视范围的dom达到提高性能的目的
    </p>
    <p>
      核心：监听盒子(div.scroll-box)的滚动事件; <br />
      计算出可视化高度一次能装几条数据，然后从list列表中截取；<br />
      每次滚动后根据scrollTop值获取一个可以整除itemHeight的结果进行偏移
    </p>
    <p>
      效果：div.scroll-box不断向下滚动的过程中，li也在不断向下平移(transfrom)，同时li也不断更新数据
    </p>
    <br />
    <v-list :list="list"></v-list>
  </div>
</template>
<script>
import VList from '@/components/v-list.vue'
export default {
  data() {
    return {
      list: [], //总数据列表
    };
  },
  created() {
    this.getList();
  },
  components: {
    "v-list": VList
  },
  methods: {
    getList() {
      // lsit赋值
      for (let i = 0; i < 100; i++) {
        this.list.push(i);
      }
    },
  },
};
</script>
<style scoped lang="scss">
/* 在css中使用data中的变量，eslint报错 */
p:nth-child(2n + 2) {
  color: #6be;
}
</style>
