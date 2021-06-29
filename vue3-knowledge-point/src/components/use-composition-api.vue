<template>
  <div>
    <h2>组合api的应用</h2>
    add student <br />
    num:<input type="text" v-model="num" /> name:<input
      type="text"
      v-model="name"
    />
    age:<input type="text" v-model="age" />
    <button @click="addStu()">提交</button>
    <ul>
      <li v-for="(item, i) in state.students" :key="i" @click="deleteStu(i)">
        {{ item.num }} | {{ item.name }} | {{ item.age }}
      </li>
    </ul>
  </div>
  <div>
    <!-- option api: data、method等等 -->
    <p>composition api 的本质：将setup抛出的数据方法注入到option api中，
      因此composition api和option api是可以混用的
    </p>
    {{data}}
  </div>
</template>
<script>
import { toRefs } from "vue";
import {useRemoveStu2, useAddStu2} from '../modules/student'
export default {
  data() {
    return{
      data: 'option api 中的 data'
    }
  },
  setup() {
    // 将同一个逻辑的数据定义和方法定义放在一起，方便代码管理和维护
    // let { state, deleteStu } = useRemoveStu();
    // let { stu, addStu } = useAddStu(state);

    // 还可以单独为一个模块
    let { state, deleteStu } = useRemoveStu2();
    let { stu, addStu } = useAddStu2(state);

    return {
      state,
      ...toRefs(stu),
      addStu,
      deleteStu,
    };
  },
};
// 删除student
// function useRemoveStu() {
//   let state = reactive({
//     students: [
//       { num: 1, name: "tt", age: 22 },
//       { num: 2, name: "yy", age: 22 },
//       { num: 3, name: "jj", age: 22 },
//     ],
//   });
//   let deleteStu = (i) => {
//     state.students = state.students.filter((item, index) => index !== i);
//   };
//   return { state, deleteStu };
// }
// // 增加student
// function useAddStu(state) {
//   let stu = reactive({
//     num: "",
//     name: "",
//     age: "",
//   });
//   let addStu = () => {
//     console.log('-----------')
//     let temp = Object.assign({}, stu);
//     state.students.push(temp);
//     stu.num = "";
//     stu.name = "";
//     stu.age = "";
//   };
//   return { stu, addStu };
// }
</script>