// 封装webSocket
import {
  WS_ADDRESS
} from "../config"

function useWebSocket(handleMessage) {
  const ws = new WebSocket(WS_ADDRESS)
  const init = () => {
    defineEvents()
  }

  function defineEvents() {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('message', handleMessage, false)
    ws.addEventListener('error', handleError, false)
  }

  function handleOpen(e) {
    console.log('websocket open', e)
  }

  function handleClose(e) {
    console.log('websocket close', e)
  }

  function handleError(e) {
    console.log('websocket error', e)
  }

  init()

  return ws
}
export default useWebSocket