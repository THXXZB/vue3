<template>
  <div class="form">
    <ul>
      <li>姓名：<input type="text" id="username" ref="username"/></li>
      <li>年龄：<input type="text" v-model="age"></li>
      {{age}}<br/>
    </ul>
    <button @click="doSubmit()" class="submit">获取表单内容</button>
  </div>
  <!-- 双向数据绑定 -->
  <div class="form">
    <ul>
      <li><input type="text" v-model="userInfo.name"/></li>
      <li><input type="text" v-model="userInfo.age"/></li>
      <li>
        <!-- 当input（radio）中的值改变时，将value中的值赋值给userInfo.sex -->
        <input type="radio" name="sex" id="boy" value="boy" v-model="userInfo.sex"><label for="boy">男</label><br/>
        <input type="radio" name="sex" id="girl" value="girl" v-model="userInfo.sex"><label for="girl">女</label>
      </li>
      <li>
        <!-- 初始渲染时显示userInfo.city的值,value等于与userInfo.city相同的值
        当input中的值改变时，将value中的值赋值到userInfo.city
         -->
        <select name="city" v-model="userInfo.city">
          <option v-for="(item, index) in userInfo.cityList" :key="index" :value="item">{{item}}</option>
        </select>
      </li>
      <li>
        <span v-for="(item, index) in userInfo.hobby" :key="index">
          <input type="checkbox" :id="'ch'+index" v-model="item.checked"/>
          <label :for="'ch'+index">{{item.title}}</label>
        </span>
      </li>
      <li>备注：
        <textarea cols="30" rows="4" v-model="userInfo.mark"></textarea>
      </li>
    </ul>
  </div>
  <!-- pre标签中的文本通常会保留空格和换行符，文本也会呈现为等宽字体 -->
  <!-- pre标签最常见的应用就是用来表示计算机的源代码 -->
  <pre>{{userInfo}}</pre>
  <hr>
</template>
<script>
export default {
  data() {
    return {
      username: 'tt',
      age: 18,
      userInfo: {
        name: 'yy',
        age: '19',
        sex: 'boy',
        cityList: ['北京', '上海', '广州'],
        city: '上海',
        hobby: [
          {
            title: '吃饭',
            checked: true
          },
          {
            title: '打代码',
            checked: false
          }
        ],
        mark: '双向数据绑定'
      }
    }
  },
  methods: {
    doSubmit() {
      // 尽量少操作dom节点, 耗费性能
      // let userDom = document.getElementById('username')
      // console.log('dom', userDom.value)
      console.log('ref', this.$refs.username.value)
      console.log(this.age)
      console.log(this.userInfo)
    }
  },

}
</script>
<style lang="scss" scope>
.form{
  border: 2px solid #000;
}
</style>