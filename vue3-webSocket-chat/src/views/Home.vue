<template>
  <div class="home">
    <h1>聊天室</h1>
    <ul>
      <li v-for="(item, i) in msgList" :key="i">
        <p>
          <span>{{ item.username }}</span
          ><span style="font-size: 14px; color: #aaa"
            >"{{ item.sendTime }}"</span
          >
        </p>
        <p>{{ item.msg }}</p>
      </li>
    </ul>
    <input type="text" v-model="msg" /><button @click="sendMessage">
      发消息
    </button>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket } from "../hooks";
export default {
  name: "Home",
  setup() {
    const state = reactive({
      msg: "",
      msgList: [],
    });
    const router = new useRouter();
    const ws = useWebSocket(handleMessage);

    // username不是响应式数据，无需ref
    let _username = "";
    onMounted(() => {
      _username = localStorage.getItem("username");
      if (!_username) {
        router.push("/login");
      }
    });

    const sendMessage = () => {
      const _msg = state.msg;
      if (!_msg.trim().length) return;

      // state.msgList.push({
      //   id: new Date().getTime(),
      //   username: _username,
      //   sendTime: new Date(),
      //   msg: state.msg,
      // });

      ws.send(JSON.stringify({
        id: new Date().getTime(),
        username: _username,
        sendTime: new Date(),
        msg: state.msg,
      }))

      state.msg = "";
    };

    function handleMessage (e) {
      // 获取服务端广播的消息
      console.log('服务器广播的消息', e)
      const _msgData = JSON.parse(e.data)
      state.msgList.push(_msgData)
    };

    return {
      ...toRefs(state),
      sendMessage,
    };
  },
};
</script>
