<template>
  <div>
    <h2>集成sass 实现一个完整的todolist（待办事项）</h2>
    <div class="to-do-list">
      <!-- 要求：将输入框中的任务显示在正在进行的列表中，并提供删除选项
      勾选后表示该任务已完成，则显示已完成
       -->
      输入任务：
      <input type="text" v-model="todo" @keyup.enter="addList()" />
      <hr>
      <ul>
        <!-- v-if 不能和 v-for一同使用 -->
        正在进行：
        <li v-for="(item, index) in list" :key="index" v-show="!item.checked">
          <input type="checkbox" v-model="item.checked" @change="updateList()"/>
          {{ item.title }}
          <button @click="deleteList(index)" class="btn">删除</button>
        </li>
      </ul>
      <ul>
        <!-- v-for 结合 v-if -->
        已完成：
        <template v-for="(item, index) in list" :key="index" >
          <li v-if="item.checked">
            <input type="checkbox" v-model="item.checked" @change="updateList()"/>
            {{ item.title }}
            <button @click="deleteList(index)" class="btn">删除</button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import storage from '../modules/storage'
export default {
  data() {
    return {
      todo: "",
      list: [],
    };
  },
  mounted() {
    // let toDoList = JSON.parse(localStorage.getItem('todoList'))
    // console.list(storage.get)
    let toDoList = storage.get('todoList')
    if (toDoList) {
      this.list = toDoList
    }
  },
  methods: {
    addList() {
      this.list.push({
        title: this.todo,
        checked: false,
      });
      this.todo = "";
      storage.set('todoList', this.list)
      // localStorage.setItem('todoList', JSON.stringify(this.list))
    },
    deleteList(index) {
      this.list.splice(index, 1);
      storage.set('todoList', this.list)
      // localStorage.setItem('todoList', JSON.stringify(this.list))
    },
    updateList() {
      storage.set('todoList', this.list)
      // localStorage.setItem('todoList', JSON.stringify(this.list))
    }
  },
};
</script>
<style lang="scss">
.to-do-list {
  border: 5px solid #eee;
  padding: 20px 0;
  input {
    border: 2px solid #abe;
  }
  li {
    list-style: none;
    .btn {
      margin-left: 50px;
    }
  }
}
</style>