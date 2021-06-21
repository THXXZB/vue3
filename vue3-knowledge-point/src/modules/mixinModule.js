const basicMixin = {
  data() {
    return {
      data: 'mixinModule中的数据'
    }
  },
  methods: {
    fail() {
      console.log('fail o(╥﹏╥)o ')
    }
  },
}
export default basicMixin