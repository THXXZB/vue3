<template>
  <div class="login">
    <h1>This is an login page</h1>
    <input type="text" v-model="userName"/>
    <button @click="enterChatRoom">进入聊天室</button>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import {useRouter} from 'vue-router';
export default {
  setup() {
    const userName = ref('')
    const router = new useRouter()

    onMounted(() => {
      userName.value = localStorage.getItem('username')
      if (userName.value) {
        router.push('/')
      }
    })

    const enterChatRoom = () => {
      const _userName = userName.value.trim()

      if (_userName.length < 6) {
        alert('用户名不小于6位')
        return
      }

      localStorage.setItem('username', _userName)
      router.push('/')

    }
    return {
      userName,
      enterChatRoom
    }
  }
}
</script>
