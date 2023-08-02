<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="/main">
      <img src="http://www.nextstepcode.club:443/online-image-bed/2023-08-01/1911a8fd-aa76-4ccf-8461-bfa4817f0298.png" width="56" height="56" />
    </el-menu-item>
    <el-menu-item index="/main">首页</el-menu-item>
    <el-menu-item index="/problem">题库</el-menu-item>

    <el-menu-item index="/match">竞赛</el-menu-item>
    <el-menu-item index="/blog/all">交流</el-menu-item>
    <el-menu-item index="/user" v-if="loginReady"> 个人中心</el-menu-item>
    <el-menu-item v-if="isAdmin" index="/admin/setting">管理</el-menu-item>






    <div class="flex-grow" />
    <!-- 公告栏（弃用） -->
    <!-- <div class='ad' style="margin-right: 9%;">
      <i class="iconfont">&#xe633;</i>
      <p class='content'>
        <span>重要通知：CodeSky个人中心上线，速度过来体验一下吧！ </span>
      </p>
    </div> -->
    <!-- 头像，名字 -->
    <el-dropdown>
      <div class="relative h-10 w-10" style="margin: 5px 10px 0px 10px;">
        <img class="h-full w-full rounded-full object-cover object-center" :src="user.url" alt="" />
        <!-- 在线提示绿点 -->
        <span v-show="loginReady"
          class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
      </div>
      <template #dropdown>
        <div style="width: 400px;">
          <el-card shadow="always" style="background-color: #c8c9cc;">
            {{ user.nickName }}
          </el-card>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginDrawer = true" v-if="!loginReady" :icon="Promotion">登录/注册</el-dropdown-item>
            <el-dropdown-item v-if="loginReady" @click="changeRoute('/user')" :icon="Avatar">个人中心</el-dropdown-item>
            <el-dropdown-item v-if="loginReady" @click="logout" :icon="Close">退出</el-dropdown-item>
          </el-dropdown-menu>
        </div>

      </template>
    </el-dropdown>
  </el-menu>

  <!-- 登录注册窗口 -->
  <el-drawer :destroy-on-close="true" v-model="loginDrawer">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">欢迎登录CodeSky!</h4>

    </template>
    <noticeBoard ></noticeBoard>

    <Transition name="slide-up" mode="out-in">
      <!-- 登录 -->
      <div v-if="isLogin">
        <el-form ref="loginFormRef" :model="loginForm" status-icon label-width="120px" class="demo-ruleForm">

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitLoginShake" :loading="loginLoading">登录</el-button>
            <el-button link type="primary" @click="isLogin = !isLogin">没账号？来注册吧！</el-button>
          </el-form-item>

        </el-form>
      </div>
      <!-- 注册 -->
      <div v-else-if="!isLogin">
        <el-form ref="ruleFormRef" :model="registerForm" status-icon :rules="rules" label-width="120px"
          class="demo-ruleForm">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="registerForm.nickName" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="验证码" prop="verCode">
            <el-input v-model="registerForm.verCode" style="width: 50%;" />
            <el-button type="primary" plain style="width: 49%;margin-left: 2px;" @click="sendVerCode"
              :disabled="sendVerCodeLock">
              <div v-show="sendVerCodeLock">{{ cooldownTime }}</div> 发送验证码
            </el-button>

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

    <!-- <el-carousel indicator-position="outside" style="position: absolute;bottom: 0;right: 0;left: 0;">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
  </el-drawer>
</template>
  
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import router from '@/router';
import API from '@/plugins/axiosInstance';
import { ElNotification, ElMessage } from 'element-plus'
import * as _ from 'lodash'
import { userStore } from '../../store'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import {
  Avatar,
  Close,
  Promotion
} from '@element-plus/icons-vue'
import noticeBoard from '@/components/front/noticeBoard.vue';

const user = ref(userStore().$state.user)


const loginLoading = ref(false)
const registerLoading = ref(false)
const activeIndex = ref("")


const sendVerCodeLock = ref(false)
// 创建一个 ref 来跟踪验证码冷却时间
const cooldownTime = ref(60);

/**
 * 发送验证码
 */
const sendVerCode = async () => {
  if (isEmail(registerForm.email) == true) {
    let from = new FormData()
    from.append("email", registerForm.email)
    sendVerCodeLock.value = true
    API({
      url: '/sendVerCode',
      method: 'post',
      data: from
    }).then((res) => {
      ElMessage({
        message: '验证码已发送，请查收',
        type: 'success'
      })
      userStore().setSendVerCodeTime(new Date().getTime())

    })
    // 等待60秒，计算冷却时间
    for (let seconds = 60; seconds >= 1; seconds--) {
      cooldownTime.value = seconds;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    sendVerCodeLock.value = false
  } else {
    ElMessage.error("邮箱不正确!")
  }

}


watch(cooldownTime, (val) => {
  if (val === 0) {
    sendVerCodeLock.value = false
  }
})

onMounted(() => {
  emitter.on(MittRouterNameSpace.ChangeRouter, (e: any) => {

    activeIndex.value = e
  });
})

onUnmounted(() => {
  emitter.off("*")
})


let loginDrawer = ref(false)
let isLogin = ref(true)
let loginReady = ref(userStore().$state.isLogin)
let isAdmin = ref(userStore().$state.isAdmin)
const registerForm = reactive({
  nickName: '',
  email: '',
  password: '',
  password2: '',
  verCode: ''
})



const changeRoute = (path: string) => {
  router.push(path)
}

const loginForm = reactive({
  email: '',
  password: '',
})

const submitLoginShake = _.debounce(submitLogin, 3000, {
  leading: true,
  trailing: false
})
/**
 * 登录
 */
function submitLogin() {
  loginLoading.value = true
  API({
    url: '/login',
    data: loginForm,
    method: 'post'
  }).then((res) => {
    if (res.data.state == 40001) {
      userStore().setUser(res.data.data)
      setTimeout(() => {
        router.go(0)
        loginDrawer.value = false
      }, 1000)
    } 
    showMsg(res.data.state,res.data.message)
    loginLoading.value = false
  })
}

const showMsg = (state:number,message:string) => {
  if(state === 40001){
    ElMessage({
      message:message,
      type:'success'
    })
  }else{
    ElMessage.error(message)
  }
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

const isEmail = (s: string) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

const checkEmail = (rule: any, value: any, callback: any) => {
  if (!isEmail(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    if (value.length > 100) {
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
      if (registerForm.password.length < 8 || registerForm.password.length > 18) {
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
  email: [{ validator: checkEmail, trigger: 'blur' }]
})

const logout = () => {
  userStore().logout({
    nickName: '未登录',
    email: "",
    experience: 0,
    gender: "",
    hardResolve: 0,
    id: 0,
    level: 0,
    location: "",
    meddleResolve: 0,
    nightmareResolve: 0,
    password: "",
    role: "",
    school: "",
    tag: "",
    token: "",
    url: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
  })
  router.go(0)
}
/**
 * 
 * @param formEl 注册
 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  registerLoading.value = true
  formEl.validate((valid) => {
    if (valid) {
      // 注册
      API({
        url: '/registerUser',
        data: registerForm,
        method: 'post'
      }).then((res) => {
        if (res.data.state == 40001) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          loginDrawer = ref(false)
          registerLoading.value = false
        } else {
          ElMessage.error(res.data.message)
        }

      })
    } else {
      return false
    }
  })
}


</script>
  
<style scoped lang="scss">


.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
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

@font-face {
  font-family: "iconfont";
  /* Project id 2516453 */
  src: url("//at.alicdn.com/t/font_2516453_g6qjhhqblt9.woff2?t=1620545333370") format("woff2"),
    url("//at.alicdn.com/t/font_2516453_g6qjhhqblt9.woff?t=1620545333370") format("woff"),
    url("//at.alicdn.com/t/font_2516453_g6qjhhqblt9.ttf?t=1620545333370") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.ad {
  width: 400px;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  color: #353535;
  box-shadow: 2px 1px 8px 1px rgb(228, 232, 235);

  i {
    color: #ff6146;
    font-size: 20px;
    margin-right: 10px;
  }

  .dropdown-trigger:hover {
    color: red;
  }

  .content {
    flex: 1;
    overflow: hidden;

    span {
      display: block;
      width: auto;
      white-space: nowrap;
    }
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

.content {
  span {
    animation: marquee 30s linear infinite;
  }
}
</style>
  