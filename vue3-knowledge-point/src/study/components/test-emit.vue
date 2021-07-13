<template>
  <div>
    <button @click="btn">emit home data</button>
  </div>
</template>
<script>
export default {
  methods: {
    btn() {
      console.log("console home data");
      this.$emit("homeEmit");
    },
  },
};
</script>