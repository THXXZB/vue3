<template>
  <div>
    <!-- 在更新数据后，未使用keep-alive的话，卸载再挂载组件，msg的值会被还原为‘原始值’
    使用keep-alive会保存组件卸载前的状态，再次挂载状态不变，即msg仍为‘更新后的值’ -->
    <h4>保存life-cycle组件的状态</h4>
    {{msg}}
    <button @click="updateMsg()">更新数据</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '原始值'
    }
  },
  methods: {
    updateMsg() {
      this.msg = '更新后的值'
    }
  },
  beforeCreate() {
    console.log('vue实例创建之前')
  },
  created() {
    console.log('vue实例创建完毕')
  },
  beforeMount() {
    console.log('模板编译渲染之前')
  },
  mounted() {
    console.log('模板编译渲染完成')
  },
  beforeUpdate() {
    console.log('数据更新之前')
  },
  updated() {
    console.log('数据更新完毕')
  },
  activated() {
    console.log('keep-alive 缓存组件激活')
  },
  deactivated() {
    console.log('keep-alive 缓存组件停用')
  },
  beforeUnmount() {
    console.log('组件卸载之前')
  },
  unmounted() {
    console.log('组件卸载完毕')
  },
}
</script>