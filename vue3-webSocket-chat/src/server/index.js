const WebSocket = require('ws');

// 立即执行函数，模拟后端服务器
((Ws) => {
  const server = new Ws.Server({
    port: 8080
  })
  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen() {
    console.log('webSocket open')
  }

  function handleClose() {
    console.log('webSocket close')
  }

  function handleError() {
    console.log('webSocket error')
  }

  function handleConnection(ws) {
    console.log('webSocket connection')
    ws.on('message', handleMessage)
  }

  function handleMessage(msg) {
    // 接收前端发送的msg
    console.log('客户端发送的消息', msg.toString())
    // 遍历连接到当前服务器的所有客户端, 广播消息,Buffer->js
    server.clients.forEach(c => {
      c.send(msg.toString())
    })
  }
  init()
})(WebSocket)