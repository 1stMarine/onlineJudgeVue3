import { createApp } from 'vue'
import { createPinia } from 'pinia'


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

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.use(ace)
console.log("ehcharts",echarts);


app.mount('#app')
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts
