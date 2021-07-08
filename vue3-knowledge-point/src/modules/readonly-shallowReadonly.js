let readonly = function (val) {
  if (typeof val === 'object') {
    if (val instanceof Array) {
      val.forEach((item, index) => {
        if (typeof item === 'object') {
          val[index] = readonly(item)
        }
      })
    } else {
      for (let key in val) {
        if (typeof val[key] === 'object') {
          val[key] = readonly(val[key])
        }
      }
    }
  } else {
    console.warn(`${val}不是一个对象`)
  }
  return new Proxy(val, {
    get(val, key) {
      return val[key]
    },
    set(val, key) {
      console.log(`${key}只读，不能修改`)
    }
  })
}
let shallowReadonly = function (val) {
  return new Proxy(val, {
    get(val, key) {
      return val[key]
    },
    set(val, key) {
      console.warn(`${key}只读，不能修改`)
    }
  })
}
let state = readonly({
  a: 'a',
  b: {
    b1: 'b1',
    b2: {
      b21: 'b21',
    }
  }
})
let state2 = shallowReadonly({
  a: 'a',
  b: {
    b1: 'b1',
    b2: {
      b21: 'b21',
    }
  }
})
state.a = '1', // 修改失败
state.b.b1 = 'b' // 修改失败
console.log(state)
state2.a = '2' // 修改失败
state2.b.b1 = 'b' // 修改成功
state2.b.b2.b21 = 'b2' // 修改成功
console.log(state2)