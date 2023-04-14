<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="/problem">
      <img src="\public\logo.png" width="56" height="56"/>
    </el-menu-item>

    <el-menu-item index="/problem">题库</el-menu-item>

    <el-menu-item index="/match">竞赛</el-menu-item>
    <el-menu-item index="/user" v-if="loginReady"> 个人中心</el-menu-item>
    <el-menu-item v-if="isAdmin" index="/admin/setting">管理</el-menu-item>

    
    <div class="flex-grow" />
    <!-- 头像，名字 -->
    <p id="userName">{{ user.nickName }}</p>
    <el-dropdown>
      <el-avatar :size="50" :src="user.url" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="loginDrawer = true" v-if="!loginReady">登录/注册</el-dropdown-item>
          <el-badge is-dot class="item" v-if="loginReady">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-badge>
          <el-dropdown-item v-if="loginReady" @click="changeRoute('/user')">个人中心</el-dropdown-item>
          <el-dropdown-item v-if="loginReady" @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-menu>

  <!-- 登录注册窗口 -->
  <el-drawer :destroy-on-close="true" v-model="loginDrawer">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">欢迎登录CodeSky!</h4>

    </template>
    <Transition name="slide-up" mode="out-in">
       <!-- 登录 -->
    <div v-if="isLogin">
      <el-form ref="loginFormRef" :model="loginForm" status-icon  label-width="120px" class="demo-ruleForm">

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitLoginShake">登录</el-button>
          <el-button link type="primary" @click="isLogin = !isLogin">没账号？来注册吧！</el-button>
        </el-form-item>
        
      </el-form>
    </div>
    <!-- 注册 -->
    <div v-else-if="!isLogin">
      <el-form ref="ruleFormRef" :model="registerForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="registerForm.nickName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerForm.password2" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button link type="primary" @click="isLogin = !isLogin">有账号？来登陆吧！</el-button>
        </el-form-item>
      </el-form>
      <!-- 注册 -->
    </div>
    </Transition>
  </el-drawer>
  
</template>
  
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ref ,reactive,onMounted,onUnmounted} from 'vue'
import router from '@/router';
import API from '@/plugins/axiosInstance';
import { ElNotification } from 'element-plus'
import * as _ from 'lodash'
import {userStore} from '../../store'
import emitter from "@/lib/bus";
import  { MittRouterNameSpace } from "@/lib/type";


const user = ref(userStore().$state.user)


const activeIndex = ref("")



onMounted(()=>{
  emitter.on(MittRouterNameSpace.ChangeRouter,(e:any) => {

    activeIndex.value=e
  });
})

onUnmounted(()=>{
  emitter.off("*")
})


let loginDrawer = ref(false)
let isLogin = ref(true)
let loginReady = ref(userStore().$state.isLogin)
let isAdmin = ref(userStore().$state.isAdmin)
const registerForm = reactive({
  nickName:'',
  email:'',
  password:'',
  password2:''
})

const changeRoute = (path:string)=>{
  router.push(path)
}

const loginForm = reactive({
  email:'',
  password:'',
})

const submitLoginShake = _.debounce(submitLogin,3000,{
  leading:true,
  trailing:false
})

function submitLogin(){
  API({
    url:'/login',
    data:loginForm,
    method:'post'
  }).then((res)=>{
    if(res.data.state == 40000){
      // 登陆失败
      ElNotification({
        title: res.data.message,
        message: '请检查账号密码是否正确',
        type: 'error',
      })
    }else{
      // 登陆成功
      userStore().setUser(res.data.data)
      ElNotification({
        title: res.data.message,
        message: '一秒后即将关闭页面',
        type: 'success',
      })
      setTimeout(()=>{
        router.go(0)
        loginDrawer.value = false
      },1000)

    }

  })
}

const handleSelect = (key: string, keyPath: string[]) => {
  router.push(keyPath[0])
}


const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入昵称'))
  }
  setTimeout(() => {
    
    if (value.length > 10 || value.length < 3) {
      callback(new Error('昵称应该在3到10个字符之间'))
    } else {
      callback()
    }
    
  }, 1000)
}

const isEmail = (s:string)=>{
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

const checkEmail = (rule: any, value: any, callback: any) => {
  if(!isEmail(value)){
    callback(new Error('邮箱格式不正确'))
  }else{
    if(value.length > 100){
      callback(new Error('这么长的邮箱?'))
    }
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerForm.password !== '') {
      if(registerForm.password.length < 8 || registerForm.password.length > 18){
        callback(new Error('密码至少为8位大小,并且小于18位'))
      }
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password2', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}


const rules = reactive<FormRules>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  password2: [{ validator: validatePass2, trigger: 'blur' }],
  nickName: [{ validator: checkAge, trigger: 'blur' }],
  email:[{validator:checkEmail,trigger:'blur'}]
})

const logout = () => {
  userStore().logout({
    nickName:'未登录',
    email:"",
    experience:0,
    gender:"",
    hardResolve:0,
    id:0,
    level:0,
    location:"",
    meddleResolve:0,
    nightmareResolve:0,
    password:"",
    role:"",
    school:"",
    tag:"",
    token:"",
    url:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
  })
  router.go(0)
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  formEl.validate((valid) => {
    if (valid) {
      // 注册
      API({
        url:'/registerUser',
        data:registerForm,
        method:'post'
      }).then((res)=>{
        ElNotification({
            title: "操作成功",
            message: res.data.message,
            type: res.data.state == 40001 ? 'success' : 'error',
        })
        loginDrawer = ref(false)

      })
    } else {
      return false
    }
  })
}


</script>
  
<style>
.flex-grow {
  flex-grow: 1;
}

#userName {
  font-family: Arial, Helvetica, sans-serif;
  margin-right: 20px;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
  