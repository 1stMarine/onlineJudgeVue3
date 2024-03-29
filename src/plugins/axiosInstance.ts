import { userStore } from '@/store'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import JSONBIG from 'json-bigint'



const API = axios.create({
    baseURL: '/api',
    timeout: 200000
})



// 请求拦截器
API.interceptors.request.use(config => {
    
    if(userStore().$state.user.token != ""){
        config.headers['token'] = userStore().$state.user.token;
    }

    return config
})


// 响应拦截器
API.interceptors.response.use(
    response => {
        
        if(response.data.state == 40002){
            ElNotification({
                title: "请求被拒绝!",
                message: "未登录!",
                type: 'error',
            })
        }else{
            return response
        }
    },
    error => {
        
    }
)

export default API