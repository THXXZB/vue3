/** 
 * vu3响应式本质：
 * 在vue2.x中通过defineProperty来实现响应式数据
 * 在vue3.x中通过proxy来实现响应式数据
*/
// let obj = {name:'tt', age:'18'}
let obj= [1, 2, 3]
let state = new Proxy(obj, {
  // 监听对象，对象的属性
  get(obj, key) {
    console.log(`get >> obj:${obj}, key:${key}`)
    return obj[key]
  },
  set(obj, key, value) {
    console.log(`set >> obj:${obj}, key:${key}, value:${value}`)
    obj[key] = value
    console.log('更新ui页面 ')
    // 当赋值过程无法一次完成时，如obj.push(9)在添加元素9之外还需要更改length，
    // 因此需要返回true确保可以继续执行下一步，否则报错
    return true
  }
})
// console.log(state.age)
// state.name = 'hh'
console.log(state[1])
state.push(9)