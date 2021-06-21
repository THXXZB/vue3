import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn' // 中文element
import elelocale from 'element-plus/lib/locale/lang/zh-cn' // 中文element

const app = createApp(App)
	.use(store)
	.use(router)
	.use(ElementPlus, { size: 'small', locale: elelocale })

app.mount('#app')
