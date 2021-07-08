let reactive = function(val) {
  if(typeof val === 'object') {
    // 判断是否是一个对象
    if (val instanceof Array) {
      // 判断该对象是否是数组
      val.forEach((item, index) => {
        if (typeof item === 'object') {
          // 判断数组元素是否是对象
          val[index] = reactive(item)
        }
      })
    } else {
      for(let key in val) {
        if (typeof val[key] === 'object') {
          // 判断对象的属性是否是对象
          val[key] = reactive(val[key])
        }
      }
    }
  } else {
    console.warn('val不是一个对象')
  }
  return new Proxy(val, {
    get (val, key) {
      return val[key]
    },
    set (val, key, value) {
      val[key] = value
      console.log(key, '更新ui页面')
      return true
    }
  })
}
let ref = function(val) {
  return reactive({value: val})
}

let obj = {
  a: 'a',
  b: {
    b1: 'b1',
    b2: 'b2',
    b3: {
      b31: 'b31'
    }
  }
}
let arr = [{
  name: 'tt',
  age: 18
},{
  name: 'yy',
  age: 19,
  desc: {
    title: 'yyds'
  }
}]
// reactive
// let state = reactive(obj)
// state.a = '1'
// state.b.b1 = 'b'
// state.b.b3.b31 = 'b3'
// let array = reactive(arr)
// array[0].name = 'jj'
// array[1].desc.title = 'szl'
// ref
let state2 = ref(obj)
state2.value.a = '1'
state2.value .b.b1 = 'b'
state2.value .b.b3.b31 = 'b3'
let array2 = ref(arr)
array2.value[0].name = 'jj'
array2.value[1].desc.title = 'szl'