import {defineStore} from 'pinia'

export const userStore = defineStore('main',{
    state:()=>{
        return {
            user:{
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
                url:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                rank:0

            },
            isLogin:false,
            isAdmin:false
        }
    },
    getters:{},
    actions:{
        setUser(data:any){
            this.user = data
            this.isLogin = true
            if(this.user.role == 'admin'){
                this.isAdmin = true
            }
        },
        logout(data:any){
            this.user = data
            this.isAdmin = false
            this.isLogin = false
        }

    },
    persist:{
        enabled:true
    }
})

