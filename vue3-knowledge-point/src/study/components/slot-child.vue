<template>
  <div style="width: 60%; margin: 0 auto; border: 2px solid #abe">
    <div style="border: 2px solid #66f">
      <div style="background-color: #abf">
        <slot name="header"></slot>
      </div>
      <div style="background-color: #eef">
        <!-- 默认插槽 -->
        <slot></slot>
      </div>
      <div style="background-color: #f9f">
        <slot name="footer"></slot>
      </div>
      <span>注意：v-slot只能添加在template标签上</span>
      <br />
      <br />
    </div>
    <br>
    <slot-child-child>
      <template #default="props">
        <p>默认作用域插槽v-slot:default="参数"</p>
        <p>{{ props.msg }}</p>
        <p>描述：作用域插槽其实就是带数据的插槽，即带参数的插槽，简单的来说就是子组件提供给父组件的参数，
          该参数仅限于插槽中使用，父组件可根据子组件传过来的插槽数据来进行不同的方式展现和填充插槽内容。</p>
           注意：插槽只能放在自定义组件的标签中
      </template>
      <!-- <template #massage="props">
        <p>具名作用域插槽v-slot:插槽名="参数"----msg为子组件传过来的数据</p>
        <p>{{ props.msg }}</p>
        <br>
      </template> -->
    </slot-child-child>
  </div>
  <br />
  <br />
</template>
<script>
import SlotChildChild from "./slot-child-child.vue";
export default {
  components: {
    "slot-child-child": SlotChildChild,
  },
  data() {
    return {
      msg: "父组件----使用v-slot处理作用域",
    };
  },
};
</script>