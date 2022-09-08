

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/utils' // 工具函数
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import plugin from '@/plugins'
import VConsole from 'vconsole'
import '@/assets/styles/index.less'
if (import.meta.env.MODE !== 'production') {
    new VConsole()
}

console.warn('环境信息>>>>', T.tools.getUserAgent())

const app = createApp(App)
app.use(ElementPlus)
app.use(router).use(store).use(plugin)

app.mount('#app')
