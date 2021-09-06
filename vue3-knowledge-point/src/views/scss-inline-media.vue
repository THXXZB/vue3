<template>
  <div class="table">
    <h1>test sass @media</h1>
    <p>需求：整体居中，内部元素左对齐，自适应窗口</p>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
    <div class="person">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/darth-vader.jpg"
      />
      <h3>Darth</h3>
    </div>
  </div>
</template>
<script>
export default {
  name:'testTodo',
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
// :nth-child(n)选择器匹配属于其父元素的第N个子元素，不论元素的类型。
// p:nth-child(n) => 选择p元素的父元素的第n个子元素
.table{
  width: 80%;
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #000;
}
@mixin rowMachine($numPerRow, $margin) {
  width: ((100% - (($numPerRow - 1) * $margin)) / $numPerRow);
  &:nth-child(n) {
    margin-bottom: $margin;
    margin-right: $margin;
  }
  &:nth-child(#{$numPerRow}n) {
    margin-right: 0;
    margin-bottom: 0;
    background-color: #abe;
  }
}

.person {
  // border: 1px solid #000;
  @include rowMachine(5, 3%);
  background: white;
  padding: 10px;
  float: left;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    @include rowMachine(4, 3%);
  }

  @media (max-width: 900px) {
    @include rowMachine(3, 5%);
  }

  img {
    max-width: 100%;
  }
  h3{
    max-width: 100%;
  }
}
</style>
