<template>
  <div
    class="test_wrapper"
    style="width: 60%;margin: 20px auto;border: 2px solid #abe"
  >
    <transition-group class="transition-wrapper" name="sort">
      <div
        v-for="item in dataList"
        :key="item.id"
        class="sort-item"
        :draggable="true"
        @dragstart="dragstart(item)"
        @dragenter="dragenter(item, $event)"
        @dragend="dragend(item, $event)"
        @dragover="dragover($event)"
        style="border: 1px solid #aaa; margin-bottom:20px; height: 32px; line-height:32px"
      >
        {{ item.label }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldData: null, // 开始排序时按住的旧数据
      newData: null, // 拖拽过程的数据
      // 列表数据
      dataList: [
        { id: 1, label: "测试一号" },
        { id: 2, label: "测试二号" },
        { id: 3, label: "测试三号" },
        { id: 4, label: "测试四号" },
      ],
    };
  },

  methods: {
    // 开始移动
    dragstart(value) {
      this.oldData = value;
      console.log('dragstart oldData', this.oldData)
    },

    // 记录移动过程中信息
    dragenter(value, e) {
      this.newData = value;
      console.log(value)
      e.preventDefault();
      console.log('dragenter newData', this.newData)
    },

    // 拖拽最终操作
    dragend() {
      if (this.oldData !== this.newData) {
        let oldIndex = this.dataList.indexOf(this.oldData);
        let newIndex = this.dataList.indexOf(this.newData);
        let newItems = [...this.dataList];
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldData);
        this.dataList = [...newItems];
      }
      console.log('dragend dataList', this.dataList)
    },

    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover(e) {
      e.preventDefault();
    },
  },
};
</script>