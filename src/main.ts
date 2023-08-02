import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElNotification } from 'element-plus';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
// 引入axios
import axios from './plugins/axiosInstance'
// 引入aceEditor编辑器
import ace from 'ace-builds'
// 引入echarts
import * as echarts from 'echarts'
// 引入字节跳动图标库
import {install} from '@icon-park/vue-next/es/all'
// TaulwindCss
import './index.css'
// v-md-editor Markdown组件
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs 核心代码
import hljs from 'highlight.js'

VMdEditor.use(githubTheme,{
    Hljs:hljs
})

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(VMdEditor)
app.use(ace)
install(app)
install(app,'i')
// 挂载全局方法
const showMessage = ( message: string, state: any) => {
    ElNotification({
        title: '消息提醒',
        message: message,
        type: state ? 'success' : 'error',
    })

}

app.provide('showMsg',showMessage);

// 挂载全局变量

app.config.globalProperties.$SUCCESS = 40001
app.config.globalProperties.$FAILURE = 40002

app.mount('#app')
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts
