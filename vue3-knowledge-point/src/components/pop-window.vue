<template>
<!-- 将弹窗挂载到body上 -->
  <teleport to='body'>
  <div class="win-bg" v-if="visiable">
    <div class="win-box">
      <div class="win-close" @click="$emit('close-win')">X</div>
      <div class="win-header">{{title}}</div>
      <div class="win-body">模块对话框:将窗口挂载到news组件下，由于弹窗设置了position：absolute，当
      news组件设置定位时会影响弹窗的定位，此时可以使用Teleport将弹窗挂载到body上
      pop-window组件模板属于news组件，但模板内容移动到了news组件之外的dom中
      </div>
    </div>
  </div>
  </teleport>
</template>
<script>
export default {
  props: ["visiable", "title"]
};
</script>
<style lang="scss">
.win-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  .win-box {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:#fff;
    .win-header {
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    .win-body {
      
    }
    .win-close{
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
}
</style>