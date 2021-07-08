let obj = {
  a: 'a',
  b: {
    b1: 'b1',
    b2: 'b2'
  }
}
let shallowReactive = function (val) {
  return new Proxy(val, {
    get(val, key) {
      return val[key]
    },
    set(val, key, value) {
      val[key] = value
      console.log(key, '更新ui页面')
      return true
    }
  })
}
let shallowRef = function (val) {
  return shallowReactive({
    value: val
  })
}
let state = shallowReactive(obj)
console.log('state=', state)
state.a = '1' // 值改变，set成功，页面更新（响应式）
state.b.b1 = 'b' // 值改变， 没有set，页面无法更新（非响应式）
console.log('state=', state)
console.log('---------------------------------------------')
let state2 = shallowRef(obj)
console.log('state2=', state2)
state2.value = {
  a: 'a',
  c: {
    c1: 'c1',
    c2: 'c2'
  }
}
console.log('state2=', state2)
state2.value.a = '2'
console.log('state2=', state2)
