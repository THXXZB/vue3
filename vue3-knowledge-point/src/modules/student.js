import { reactive } from "vue";
// 删除student
function useRemoveStu2() {
  let state = reactive({
    students: [
      { num: 1, name: "tt", age: 22 },
      { num: 2, name: "yy", age: 22 },
      { num: 3, name: "jj", age: 22 },
    ],
  });
  let deleteStu = (i) => {
    state.students = state.students.filter((item, index) => index !== i);
  };
  return { state, deleteStu };
}
// 增加student
function useAddStu2(state) {
  let stu = reactive({
    num: "",
    name: "",
    age: "",
  });
  let addStu = () => {
    console.log('-----------')
    let temp = Object.assign({}, stu);
    state.students.push(temp);
    stu.num = "";
    stu.name = "";
    stu.age = "";
  };
  return { stu, addStu };
}
export {useAddStu2, useRemoveStu2}