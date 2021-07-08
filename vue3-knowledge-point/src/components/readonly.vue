<template>
  <div>
    <h3>readOnly --- ShallowReadOnly</h3>
    {{state}} <br>
    {{state2}} <br>
    <button @click="update">update</button>
  </div>
</template>
<script>
import { readonly, shallowReadonly } from 'vue'
export default {
  setup(){
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
    
    let update = () => {
      state.a = '1',   // 修改失败
      state.b.b1 = 'b'  // 修改失败
      console.log(state)
      state2.a = '2'    // 修改失败
      state2.b.b1 = 'b'   // 修改成功
      state2.b.b2.b21 = 'b2' // 修改成功
      console.log(state2)
    }
    return {
      state,
      state2,
      update
    }
  }
}
</script>