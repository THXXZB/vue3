<template>
  <div>
    {{msg}} <button @click="update">update</button>
  </div>
</template>
<script>
export default {
  data() {
    return{
      msg:'我是组件A'
    }
  },
  methods: {
    update() {
      this.msg = 'I am componentA'
    }
  }
}
</script>