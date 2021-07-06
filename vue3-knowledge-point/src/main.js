import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'
import fetchJsonp from 'fetch-jsonp'
import storage from './modules/storage'
import basicMixin from './modules/mixinModule'

// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
// 全局绑定axios
app.config.globalProperties.Axios = axios
// axios无法不支持jsonp请求，安装第三方库fetch-jsonp
app.config.globalProperties.FetchJsonp = fetchJsonp
// 绑定自定义的模块storage
app.config.globalProperties.Storage = storage
// 全局配置mixins
app.mixin(basicMixin)
app.use(store).use(router).use(ElementPlus).mount('#app')

