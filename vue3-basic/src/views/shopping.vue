<template>
  <v-header></v-header>
  <cart></cart>
  <div>
    
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Cart from '../components/cart.vue'
export default {
  data() {
    return {

    }
  },
  components:{
    "v-header": Header,
    Cart
  }
}
</script>